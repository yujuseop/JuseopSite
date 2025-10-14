---
title: "여행 리뷰 사이트 개발 중 마주친 문제와 해결 과정"
date: "2025-10-14"
description: "개발 도중 생긴 supabase와의 연동 오류 해결"
---

## 1. Hydration Mismatch: 'October 2025' vs '2025년 10월'

### 문제

- SSR 환경에서 `react-calendar`의 로캘이 서버(`en-US`)와 클라이언트(`ko-KR`)에서 다르게 적용되어  
  **"Hydration failed"** 오류가 발생했습니다.

### 원인

- 서버 렌더링 시점에서는 한국어 로캘이 적용되지 않아  
  `"October 2025"`로 렌더링되고, 클라이언트에서는 `"2025년 10월"`로 바뀌는 현상.

### 해결

- `locale="ko-KR"`을 명시적으로 전달
- `dynamic import`로 `react-calendar`를 클라이언트 전용으로 렌더링하도록 변경

```tsx
"use client";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });
```

## 여행 추가 시 user_id 누락 문제

### 문제

- trip 테이블에서 여행을 추가할 때 user_id가 NULL로 들어가 새로고침 후 목록에서 사라지는 문제가 발생.

### 원인

- TravelModal에서 insert 시 user_id를 명시하지 않았고, auth.uid() 트리거가 작동하지 않음 (Supabase Auth 컨텍스트 미전달).

### 해결

1. 트리거 수정
   auth.uid() 트리거가 제대로 작동하도록 함수와 정책 재정의

```sql
CREATE OR REPLACE FUNCTION public.set_trip_user_id()
RETURNS trigger AS $$
BEGIN
IF NEW.user_id IS NULL THEN
NEW.user_id := auth.uid();
END IF;
RETURN NEW;
END;

$$
LANGUAGE plpgsql;
```

2. 클라이언트에서 명시적으로 user_id 전달 (fallback)

```tsx
const { data: user } = await supabase.auth.getUser();

await supabase.from("trip").insert({
  title,
  start_date,
  end_date,
  description,
  user_id: user?.id, // fallback
});
```

3. Supabase SSR 클라이언트 인증 불일치

### 문제

- DashboardPage에서 SSR로 유저를 불러올 때 클라이언트 세션이 유지되지 않아 auth.getUser()가 null 반환.

### 해결

- createServerClient(cookies)를 통해 서버-클라이언트 인증 동기화
- App Router 환경에서는 cookies()를 반드시 전달해야 함.

```tsx
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const supabase = createServerClient({
  cookies,
});
```

4. 여행 모달 상태 동기화 문제

### 문제

- 새 여행을 추가한 후 달력에 즉시 반영되지 않음.

### 원인

- SSR 초기 데이터(initialTravels)는 고정되어 있으며, 새 데이터는 클라이언트 state에만 반영되어야 함.

### 해결

- handleTravelAdded 함수로 클라이언트 상태를 갱신하도록 수정.

```tsx
const handleTravelAdded = (newTrip) => {
  setTravels((prev) => [...prev, newTrip]);
};
```

## 배운 점

- Supabase의 RLS 정책과 트리거는 강력하지만 Auth 컨텍스트 의존성이 명확해야 함
- SSR 환경에서는 인증 및 locale 차이로 인한 Hydration 오류가 자주 발생
- 서버에서 가져온 초기 데이터를 클라이언트에서 안전하게 동기화하는 전략이 중요
