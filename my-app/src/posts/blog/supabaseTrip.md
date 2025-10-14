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

## Trip 테이블 구조

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

- 자동으로 auth.uid()를 user_id로 채우는 트리거를 사용
- RLS 정책으로 공개글은 누구나 열람 가능, 비공개글은 본인만 접근 가능
- 관리자(admin)는 전체 접근 허용

### 핵심 구현 포인트

- SSR과 클라이언트 데이터의 일관성 보장
- Supabase의 Row Level Security(RLS) 활용으로 사용자 데이터 보호
- 모달을 통한 UX 최적화 (여행 추가 및 갱신 기능)
