---
title: "TanStack React Query 핵심 가이드"
date: "2025-09-28"
description: "useQuery/useMutation, 키 설계, staleTime/gcTime, 무효화, SSR Hydration"
---

### 왜 React Query인가

- 서버 상태는 클라이언트 상태와 달리 "원격·유한하지 않음·공유됨·캐시 가능" 특성을 가진다. React Query는 이를 위한 표준화된 패턴(패칭·캐싱·동기화·무효화)을 제공해 중복 요청, 로딩/에러 처리, 재시도, 백그라운드 갱신을 자동화한다.

### 핵심 개념 한눈에

- **Query(useQuery)**: 읽기. 자동 캐싱, 중복 요청 병합, 백그라운드 리패치
- **Mutation(useMutation)**: 쓰기. 낙관적 업데이트, 실패 롤백, 성공 시 무효화
- **키(queryKey)**: 서버 데이터의 식별자(배열 형태). 안정적이고 결정적이어야 함
- **신선도/수명**: `staleTime`(신선한 기간), `gcTime`(메모리에 남아있는 기간, v5)
- **무효화**: `queryClient.invalidateQueries({ queryKey })`로 관련 쿼리 재조회

### 설치/초기 설정

```bash
npm i @tanstack/react-query
```

```tsx
// app/providers.tsx 또는 _app.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

### 조회: useQuery 기본

```tsx
import { useQuery } from "@tanstack/react-query";

function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/api/todos").then((r) => r.json()),
    staleTime: 60_000, // 1분간 신선 → 포커스 시 재패치 안 함
    retry: 2, // 실패 시 2회 재시도
    refetchOnWindowFocus: true,
    select: (data) => data.items, // 서버 응답 후 선택 변환
  });
}
```

### 변경: useMutation + 무효화/낙관적 업데이트

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useAddTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (title: string) =>
      fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      }).then((r) => r.json()),
    onMutate: async (title) => {
      await qc.cancelQueries({ queryKey: ["todos"] });
      const prev = qc.getQueryData<any>(["todos"]);
      qc.setQueryData<any>(["todos"], (old) => ({
        ...old,
        items: [...(old?.items ?? []), { id: "temp", title }],
      }));
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(["todos"], ctx.prev); // 롤백
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
}
```

### 키 설계 베스트 프랙티스

- 배열 기반(예: `['post', postId]`), 순서·타입 일관성 유지
- 조건부 파라미터는 명시적으로 포함(페이지네이션, 필터)
- 불안정한 객체 생성 지양(메모이제이션 또는 안정적 직렬화)

### 신선도 모델(staleTime vs gcTime)

- `staleTime`: 신선한 동안 재패치 트리거(포커스/네트워크 복구)가 무시됨
- `gcTime`(v5): 사용되지 않는 캐시가 메모리에서 제거되기까지의 시간(이전 v4의 cacheTime)

### 자주 쓰는 옵션 요령

- `placeholderData`: 최초 로딩 시 즉시 표시할 임시 데이터
- `keepPreviousData`: 페이지네이션 전환 시 이전 데이터 유지로 깜빡임 감소
- `enabled`: 조건 충족 시에만 실행(의존 데이터 로드 후 등)

### 의존/병렬/무한 쿼리

```tsx
// 의존 쿼리: userId가 있을 때만
useQuery({ queryKey: ["user", id], queryFn: fetchUser, enabled: !!id });

// 무한 스크롤
import { useInfiniteQuery } from "@tanstack/react-query";
useInfiniteQuery({
  queryKey: ["feed"],
  queryFn: ({ pageParam = 0 }) =>
    fetch(`/api/feed?page=${pageParam}`).then((r) => r.json()),
  getNextPageParam: (last) => last.nextPage ?? undefined,
});
```

### 오류·로딩 UX

- 글로벌: Suspense/에러 바운더리, 토스트/스낵바로 피드백
- 로컬: `isLoading`, `isFetching`, `isError`, `error`로 상태 세분화
- 재시도/백오프: 네트워크 에러만 재시도하고 비즈니스 에러는 즉시 노출

### SSR/ISR Hydration(Next.js)

```tsx
// 서버: 프리페치 후 탈수(dehydrate)
import { QueryClient, dehydrate } from "@tanstack/react-query";
export async function generateMetadata() {
  /* ... */
}
export default async function Page() {
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("https://api/todos").then((r) => r.json()),
  });
  const state = dehydrate(qc);
  return <Hydrated state={state} />;
}

// 클라이언트: Hydrate로 복수 요청 방지
("use client");
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
export function Hydrated({ state }: { state: unknown }) {
  const qc = new QueryClient();
  return (
    <QueryClientProvider client={qc}>
      <HydrationBoundary state={state}>{/* children */}</HydrationBoundary>
    </QueryClientProvider>
  );
}
```

### 흔한 실수 체크리스트

- 불안정한 `queryKey`로 매 렌더 재요청 발생
- `staleTime`과 `gcTime` 혼동(신선도 vs 메모리 잔존)
- Mutation 후 관련 키 무효화 누락
- 낙관적 업데이트 시 롤백 컨텍스트 미구현

### SWR과의 간단 비교

- 둘 다 캐싱/리밸리데이션 제공. 대규모 앱에서 React Query는 쿼리/뮤테이션, 무한 쿼리, DevTools, SSR 탈수/수화 등 관리 기능이 더 풍부하다. SWR은 API가 단순하고 가벼워 빠른 도입에 유리.

### 결론

- React Query는 서버 상태 관리의 보일러플레이트를 제거하고 예측 가능한 UX를 만든다. 키 설계, 신선도/무효화 전략, 낙관적 업데이트만 잘 설계하면 대다수 데이터 흐름이 단순해진다.
