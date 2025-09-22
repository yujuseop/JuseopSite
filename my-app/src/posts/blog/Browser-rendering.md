---
title: "브라우저 렌더링 딥다이브: DOM부터 프레임까지"
date: "2025-04-25"
description: "렌더링 파이프라인, CRP, 레이아웃/페인트/합성, React 하이드레이션, Web Vitals, 최적화 전략"
---

### 왜 중요한가

- 사용자는 빠르고 매끄러운 화면을 기대한다. 렌더링 파이프라인을 이해하면 LCP/CLS/INP 같은 핵심 지표를 개선하고, 코드·스타일·이미지 전략을 구조적으로 최적화할 수 있다.

### 렌더링 파이프라인 개요

1. HTML 파싱 → DOM 구성
2. CSS 파싱 → CSSOM 구성
3. Render Tree 생성(DOM + CSSOM 결합)
4. Layout(Reflow): 각 노드의 크기·위치 계산
5. Paint: 픽셀 그리기(배경, 텍스트, 보더 등)
6. Composite: 레이어(타일)를 GPU로 합성해 화면 표시

Tip: transform/opacity 변경은 보통 레이아웃 없이 합성만 발생. width/height/top/left 등은 레이아웃을 유발해 비용이 크다.

### Critical Rendering Path(CRP)

- 렌더에 꼭 필요한 리소스가 화면 표시를 지연시키는 경로
- 원칙
  - CSS는 렌더 차단. 크리티컬 CSS(Above-the-fold) 최소화, 나머지는 지연 로드
  - JS는 `defer`/`async`로 파서 차단을 줄이고, 모듈 분할로 초기 번들 축소
  - `preload`(즉시 필요), `prefetch`(추가 탐색 대비)로 우선순위 힌트 제공
  - HTTP 캐시/압축/HTTP2/3 병렬성으로 네트워크 레이턴시 완화

### Layout / Paint / Composite 심화

- Layout(Reflow)
  - 발생 조건: 레이아웃 영향 속성 변경, DOM 추가/삭제, 폰트 로드, 뷰포트 변화 등
  - 안티패턴: 레이아웃 스래싱(읽기/쓰기 교차 반복)
  - 개선: 읽기→계산→쓰기 순서로 배치, 스타일 변경은 클래스 토글로 묶기
- Paint
  - 박스 그림자, 그라데이션, 큰 이미지 스케일링 등은 페인트 비용 증가
  - 개선: 과도한 시각 효과 최소화, 적절한 이미지 크기 사용
- Composite(합성)
  - 레이어 분리로 스크롤/애니메이션 부드럽게. `will-change`, `transform: translateZ(0)` 등으로 레이어 승격
  - 남용 주의: 레이어 증가→메모리/업로드 비용 상승. 일시적 애니메이션 구간에만 사용

### 메인 스레드, 이벤트 루프, 프레임 버짓

- 60fps 기준 프레임당 약 16.7ms. 이 내에 JS 실행, 스타일/레이아웃, 페인트/합성이 완료되어야 한다.
- Long Task(>50ms) 탐지 및 분할. Web Worker로 CPU 바운드 작업을 분리.
- 스케줄링
  - `requestAnimationFrame(rAF)`: 페인트 직전 콜백, 레이아웃 안전한 타이밍
  - `requestIdleCallback`: 유휴 시간 작업 처리(필수 작업은 금지)
  - 마이크로태스크(Promise) vs 매크로태스크(setTimeout) 순서 이해로 지연/정체 방지

### 이미지·폰트 로딩 전략

- 이미지
  - 적절한 사이즈와 포맷(WebP/AVIF) 사용, `loading="lazy"`, `srcset/sizes`로 반응형 제공
  - LCP 대상 이미지에 `priority`(프레임워크 옵션) 또는 `preload` 적용
- 폰트
  - `font-display: swap|optional`로 FOIT 방지, 서브셋 폰트로 파일 크기 축소
  - 중요한 텍스트는 시스템 폰트 폴백 고려, 가변 폰트로 스타일 통합

### React 관점: 가상 DOM, CSR/SSR/SSG/ISR, 하이드레이션

- 가상 DOM과 Reconciliation: key 안정성으로 최소 변경 보장. 불안정한 key는 불필요 재마운트/레이아웃 변동 유발
- 렌더링 방식
  - CSR: 풍부한 인터랙션에 유리하나 초기 로드 비용↑
  - SSR/SSG/ISR: 초기 표시/SEO 우수. 이후 하이드레이션으로 상호작용 활성화
- Next.js App Router
  - 서버 컴포넌트(데이터 근접, 기본 SSR) + 클라이언트 컴포넌트(상태/이벤트)
  - 스트리밍/부분 하이드레이션으로 TTFB·LCP 균형

### Web Vitals로 측정하고 개선하기

- LCP: 최대 콘텐츠 표시 시점. 이미지/폰트 최적화, SSR/SSG로 개선
- CLS: 레이아웃 이동. 이미지 크기 예약, 광고/임베드에 고정 박스, 폰트 스왑
- INP(신규): 전체 상호작용 지연의 대표 지표. 메인 스레드 점유 감소, 이벤트 핸들러 경량화
- TTFB/TBT: 서버/JS 점유 시간. 캐싱·코드 분할·지연 로드
- 도구: Lighthouse, WebPageTest, Chrome DevTools, web-vitals 라이브러리(실사용 측정)

### 체크리스트(요약)

- 중요한 자산 먼저: 크리티컬 CSS 최소화, 핵심 이미지 Preload
- 애니메이션은 transform/opacity 중심, rAF 사용
- 읽기/쓰기 분리로 레이아웃 스래싱 방지, 배치 업데이트
- 코드 분할과 지연 로드로 초기 번들 축소
- 안정적인 key로 가상 DOM 변경 최소화
- 폰트/이미지 전략으로 LCP·CLS 개선

### 코드 스니펫

- 레이아웃 스래싱 방지(읽기→쓰기 배치)

```ts
function batchDomUpdates(callback: () => void) {
  // 읽기 단계
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  // 계산 단계
  const nextScale = Math.min(2, (width + height) / 500);

  // 쓰기 단계(rAF로 페인트 직전 보장)
  requestAnimationFrame(() => {
    element.style.transform = `scale(${nextScale})`;
  });
}
```

- transform/opacity 기반 애니메이션

```css
.card {
  will-change: transform, opacity; /* 장시간 상시 사용은 지양 */
  transition: transform 200ms ease, opacity 200ms ease;
}
.card--enter {
  transform: translateY(8px);
  opacity: 0.8;
}
.card--enterActive {
  transform: translateY(0);
  opacity: 1;
}
```

- Next.js(SSR + 스트리밍 예시 느낌)

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

### 마무리

- 렌더링은 네트워크→파서→스타일/레이아웃→페인트→합성으로 이어지는 체인의 문제다. 각 단계의 병목을 정량 측정하고(웹 바이탈/프로파일러), 원인을 단계별로 제거하는 것이 가장 확실한 최적화다. 프레임워크의 기능(스트리밍, 서버 컴포넌트, 코드 분할)과 브라우저의 힌트(preload/prefetch)를 함께 활용하자.
