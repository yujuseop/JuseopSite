---
title: "CSR vs SSR: 언제, 왜 선택할까?"
date: "2025-04-05"
description: "CSR/SSR의 원리와 장단점, Next.js에서의 실전 선택 가이드"
---

### 개념 요약

- **CSR (Client-Side Rendering)**: 브라우저가 JS로 앱을 초기화하고 렌더링.
- **SSR (Server-Side Rendering)**: 서버가 HTML을 만들어 전달하고, 클라이언트에서 하이드레이션.

### 동작 흐름 간단 비교

- **CSR**: HTML 골격 → JS 번들 로드 → 데이터 페칭 → 클라이언트 렌더.
- **SSR**: 요청 시 서버에서 데이터 페칭/렌더 → 완성된 HTML 응답 → 하이드레이션.

### 장단점 정리

- **CSR 장점**
  - 라우팅 전환이 빠르고 풍부한 인터랙션에 유리.
  - CDN 배포가 쉽고 서버 부담이 적음.
  - 복잡한 클라이언트 상태 관리와 궁합이 좋음.
- **CSR 단점**
  - 초기 로드가 느릴 수 있고 JS 의존도가 큼.
  - 기본 SEO에 불리(사전 렌더가 없음).
- **SSR 장점**
  - 초기 표시(First Paint/TTFB 이후)가 빠르고 SEO에 유리.
  - 저사양/저성능 기기에서도 최초 체감이 좋음.
- **SSR 단점**
  - 서버 부하 증가, 캐싱/스케일 전략 필요.
  - 요청마다 렌더 → TTFB 증가 가능.

### Next.js 관점에서의 선택

- **SSG/ISR**: 빌드 타임(SSG) 혹은 주기적 재생성(ISR)으로 성능과 SEO를 모두 확보.
- **App Router(Server/Client Components)**
  - 서버 컴포넌트가 기본(SSR로 데이터 가까이). 클라이언트 상태/이벤트가 필요한 부분만 `use client`로 분리.
- **데이터 패칭**
  - 서버 컴포넌트: `fetch()` 기본 캐시/재검증 옵션으로 ISR 유사 효과.
  - 클라이언트 컴포넌트: `useEffect`/SWR/React Query 등으로 CSR 패턴.

### 코드 예시

- SSR(서버 컴포넌트, Next.js App Router)

```tsx
// app/articles/page.tsx (Server Component)
export default async function Page() {
  const res = await fetch("https://api.example.com/articles", {
    cache: "no-store",
  });
  const articles = await res.json();
  return (
    <main>
      <h1>Articles</h1>
      <ul>
        {articles.map((a: any) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </main>
  );
}
```

- CSR(클라이언트 컴포넌트)

```tsx
"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/items")
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <ul>
      {data?.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### 어떤 걸 선택할까? (체크리스트)

- **SEO가 중요한가?** → SSR/SSG/ISR 우선 고려.
- **실시간 개인화, 사용자별 데이터**가 많나? → SSR+클라이언트 상태 혼합 또는 순수 CSR.
- **초기 로드 시간**이 중요한 랜딩/마케팅 페이지인가? → SSG/ISR.
- **복잡한 인터랙션/오프라인 기능** 중심인가? → CSR 또는 하이브리드.

### 결론

- 단일 해법은 없다. 공개 페이지는 SSR/SSG로, 앱 내부는 CSR로 구성하는 **하이브리드**가 현실적인 최적해다.
- Next.js App Router에서는 서버/클라이언트 컴포넌트를 섞어 사용하며, 캐시/재검증 전략으로 성능·SEO·개발 생산성을 함께 가져갈 수 있다.
