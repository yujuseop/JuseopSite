---
title: "여행 리뷰 사이트 Supabase 연동 트러블슈팅"
date: "2025-10-14"
description: "SSR 하이드레이션, RLS 정책, 인증 컨텍스트, 외래키 관계 문제 해결 과정"
---

### 문제 상황

여행 리뷰 사이트 개발 중 다음과 같은 문제들이 발생했습니다:

1. **Hydration Mismatch**: SSR 환경에서 달력 로캘 불일치
2. **여행 추가 시 user_id 누락**: 새로고침 후 데이터 사라짐
3. **리뷰 저장 실패**: RLS 정책 위반 오류
4. **프로필 생성 실패**: user_id NULL 제약 조건 위반

### 환경

- **프로젝트**: 여행 리뷰 사이트
- **스택**: Next.js 14, TypeScript, Supabase
- **주요 라이브러리**: react-calendar, @supabase/ssr

### 문제 1: Hydration Mismatch (달력 로캘)

#### 증상

```text
Hydration failed because the server rendered HTML didn't match the client.
Server: "October 2025", Client: "2025년 10월"
```

#### 원인

- SSR 환경에서 서버(`en-US`)와 클라이언트(`ko-KR`) 로캘 불일치
- `react-calendar`가 서버/클라이언트에서 다르게 렌더링

#### 해결

```tsx
"use client";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
  loading: () => <div>달력 로딩 중...</div>,
});
```

### 문제 2: 여행 추가 시 user_id 누락

#### 증상

- 여행 추가 후 새로고침 시 목록에서 사라짐
- `trip` 테이블에 `user_id`가 NULL로 저장됨

#### 원인

- 클라이언트에서 `user_id` 미지정
- `auth.uid()` 트리거가 SSR 환경에서 작동하지 않음

#### 해결

1. **트리거 함수 수정**

```sql
CREATE OR REPLACE FUNCTION public.set_trip_user_id()
RETURNS trigger AS $$
BEGIN
  IF NEW.user_id IS NULL AND auth.uid() IS NOT NULL THEN
    NEW.user_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

2. **클라이언트에서 명시적 user_id 전달**

```tsx
const { data: user } = await supabase.auth.getUser();

await supabase.from("trip").insert({
  title,
  start_date,
  end_date,
  description,
  user_id: user?.data?.user?.id, // fallback
});
```

### 문제 3: SSR 인증 컨텍스트 불일치

#### 증상

- 서버에서 `auth.getUser()`가 null 반환
- 클라이언트 세션이 서버로 전달되지 않음

#### 해결

```tsx
// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export default async function DashboardPage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: user } = await supabase.auth.getUser();
  // ...
}
```

### 문제 4: 리뷰 저장 실패 (RLS 정책)

#### 증상

```javascript
{
  code: '42501',
  message: 'new row violates row-level security policy for table "reviews"'
}
```

#### 원인

- `reviews` 테이블의 INSERT 정책이 제대로 설정되지 않음
- `user_id` 값이 정책 조건과 일치하지 않음

#### 해결

```sql
-- 기존 정책 삭제 후 재생성
DROP POLICY IF EXISTS "Reviews: user can insert" ON public.reviews;

CREATE POLICY "Reviews: user can insert"
ON public.reviews
FOR INSERT
WITH CHECK (user_id = auth.uid());
```

### 문제 5: 프로필 생성 실패

#### 증상

```sql
ERROR: 23502: null value in column "user_id" violates not-null constraint
```

#### 원인

- `profiles` 테이블의 트리거가 작동하지 않음
- RLS 정책과 트리거 간 타이밍 문제

#### 해결

```sql
-- 1. 트리거 함수 재생성
CREATE OR REPLACE FUNCTION public.set_profiles_user_id()
RETURNS trigger AS $$
BEGIN
  IF auth.uid() IS NOT NULL THEN
    NEW.user_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. 트리거 재생성
DROP TRIGGER IF EXISTS trg_profiles_set_user_id ON public.profiles;
CREATE TRIGGER trg_profiles_set_user_id
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_profiles_user_id();

-- 3. RLS 정책 수정
CREATE POLICY "Profiles: user can insert"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
```

### 문제 6: 외래키 관계 오류

#### 증상

```javascript
{
  code: 'PGRST200',
  message: "Could not find a relationship between 'trip' and 'destinations'"
}
```

#### 원인

- `destinations` 테이블의 외래키 관계가 깨짐
- Supabase 스키마 캐시 문제

#### 해결

```sql
-- destinations 테이블 재생성
DROP TABLE IF EXISTS public.destinations CASCADE;

CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trip(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  day INT CHECK (day > 0),
  order_num INT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 문제 7: 상태 동기화 문제

#### 증상

- 새 여행 추가 후 달력에 즉시 반영되지 않음

#### 해결

```tsx
const handleTravelAdded = (newTrip: Trip) => {
  setTravels((prev) => [...prev, newTrip]);
  // 클라이언트 상태 즉시 갱신
};
```

### 검증

- SSR 환경에서 달력 로캘 일치 확인
- 여행/리뷰 추가 후 새로고침해도 데이터 유지 확인
- RLS 정책으로 인한 권한 오류 해결 확인
- 프로필 자동 생성 정상 작동 확인

### 배운 점

- **SSR 환경 주의사항**: 로캘, 인증 컨텍스트, 하이드레이션 불일치 문제가 빈번
- **RLS 정책과 트리거**: 타이밍 문제와 의존성 관리가 중요
- **Supabase 인증**: 서버-클라이언트 간 세션 동기화 필요
- **외래키 관계**: 스키마 캐시 문제 시 테이블 재생성 고려
- **상태 관리**: SSR 초기 데이터와 클라이언트 상호작용 분리 필요

### 참고

- [Supabase SSR 가이드](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Next.js App Router 문서](https://nextjs.org/docs/app)
