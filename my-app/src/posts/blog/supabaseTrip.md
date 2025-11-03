---
title: "여행 리뷰 사이트 개발기 (Next.js + Supabase)"
date: "2025-10-13"
description: "내가 갔다온 여행을 기록하고 싶은 자들의 사이트 제작"
---

## 프로젝트 개요

이 프로젝트는 **여행 일정과 리뷰를 기록할 수 있는 개인 여행 대시보드**를 만드는 것을 목표로 시작했습니다.  
사용자는 여행 일정을 달력 기반으로 관리하고, 각 여행지에 대한 후기나 장소 정보를 기록할 수 있습니다.

## 기술 스택

- **Frontend**: Next.js 15 (App Router)
- **Database & Auth**: Supabase
- **State Management**: React Query
- **Styling**: Tailwind CSS
- **Date Handling**: react-calendar (로캘 `ko-KR`)
- **Auth Provider**: SupabaseAuthProvider (커스텀 Provider)
- **React Query Provider**: ReactQueryProvider

## 주요 기능

- 로그인한 사용자별 여행 데이터 관리 (SSR 기반)
- 달력에서 날짜 선택 → 여행 일정 조회 및 추가
- 여행 모달(TravelModal)을 통해 새 여행 생성
- 여행지, 후기 등 하위 데이터(Review, Destination) 연결
- 공개/비공개 설정 (is_public)

## 주요 구조

```tsx
app/
 ├── layout.tsx                # 전역 Provider (Auth + React Query)
 ├── dashboard/
 │   ├── page.tsx              # 서버 컴포넌트 (SSR)
 │   ├── DashboardClient.tsx   # 클라이언트 컴포넌트
 │   └── TravelModal.tsx       # 여행 추가 모달
 └── providers/
     ├── query_provider.tsx
     └── supabase_auth_provider.tsx
```

## 데이터베이스 스키마

### Trip 테이블

```sql
CREATE TABLE IF NOT EXISTS public.trip (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Reviews 테이블

```sql
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trip(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Destinations 테이블

```sql
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

### Profiles 테이블

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

## 자동화 함수 및 트리거

### user_id 자동 설정 트리거

여행 추가 시 자동으로 현재 로그인한 사용자의 ID를 설정하는 트리거:

```sql
-- Trip 테이블용
CREATE OR REPLACE FUNCTION public.set_trip_user_id()
RETURNS trigger AS $$
BEGIN
  IF NEW.user_id IS NULL AND auth.uid() IS NOT NULL THEN
    NEW.user_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_trip_set_user_id
  BEFORE INSERT ON public.trip
  FOR EACH ROW
  EXECUTE FUNCTION public.set_trip_user_id();

-- Profile 테이블용
CREATE OR REPLACE FUNCTION public.set_profiles_user_id()
RETURNS trigger AS $$
BEGIN
  IF auth.uid() IS NOT NULL THEN
    NEW.user_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_profiles_set_user_id
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_profiles_user_id();
```

## RLS 정책

### Trip 테이블 RLS

```sql
-- 사용자는 자신의 여행만 조회
CREATE POLICY "Trips: user can view own"
  ON public.trip
  FOR SELECT
  USING (user_id = auth.uid() OR is_public = true);

-- 사용자는 자신의 여행만 수정
CREATE POLICY "Trips: user can update own"
  ON public.trip
  FOR UPDATE
  USING (user_id = auth.uid());

-- 사용자는 자신의 여행만 삭제
CREATE POLICY "Trips: user can delete own"
  ON public.trip
  FOR DELETE
  USING (user_id = auth.uid());

-- 관리자는 모든 작업 가능
CREATE POLICY "Trips: admin full access"
  ON public.trip
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );
```

### Reviews 테이블 RLS

```sql
-- 사용자는 자신의 리뷰만 조회
CREATE POLICY "Reviews: user can view"
  ON public.reviews
  FOR SELECT
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.trip t
      WHERE t.id = trip_id AND t.is_public = true
    )
  );

-- 사용자는 자신의 리뷰만 작성
CREATE POLICY "Reviews: user can insert"
  ON public.reviews
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- 관리자는 모든 작업 가능
CREATE POLICY "Reviews: admin can do anything"
  ON public.reviews
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );
```

### Profiles 테이블 RLS

```sql
-- 사용자는 자신의 프로필만 조회
CREATE POLICY "Profiles: user can view own"
  ON public.profiles
  FOR SELECT
  USING (user_id = auth.uid());

-- 사용자는 자신의 프로필만 작성
CREATE POLICY "Profiles: user can insert"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- 사용자는 자신의 프로필만 수정
CREATE POLICY "Profiles: user can update own"
  ON public.profiles
  FOR UPDATE
  USING (user_id = auth.uid());
```

## 핵심 구현 포인트

### SSR과 클라이언트 데이터의 일관성 보장

```tsx
// app/dashboard/page.tsx (서버 컴포넌트)
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabase = createServerClient(/* ... */);

  const { data: travels } = await supabase
    .from("trip")
    .select("*")
    .order("start_date", { ascending: false });

  return <DashboardClient initialTravels={travels} />;
}
```

### 자동 인증 처리

트리거를 통해 클라이언트에서 `user_id`를 명시하지 않아도 자동으로 현재 로그인한 사용자 ID가 설정됩니다:

```tsx
// 클라이언트에서 간단하게 추가
await supabase.from("trip").insert({
  title: "제주도 여행",
  start_date: "2025-01-01",
  end_date: "2025-01-05",
  description: "신혼여행",
  // user_id는 자동으로 설정됨!
});
```

### 보안 강화

- RLS 정책으로 인한 데이터 격리
- 관리자 권한으로 전체 접근 허용
- 외래키 제약조건으로 데이터 무결성 보장
