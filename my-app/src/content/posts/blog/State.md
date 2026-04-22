---
title: "React 상태 관리 기초: useState/useReducer/Context와 서버 상태 구분"
date: "2025-05-01"
description: "클라이언트/서버 상태 구분, useState·useReducer·Context 활용과 성능 팁"
---

### 상태는 왜/어떻게 나눌까

- **클라이언트(UI) 상태**: 입력값, 모달 토글, 탭 선택 등 앱 내부에서만 의미가 있는 값
- **서버 상태**: API에서 가져온 원격 데이터(공유·캐시·동기화 필요)
- 권장: UI는 React 훅과(필요 시 경량 전역 상태), 서버 데이터는 React Query/SWR 같은 도구 사용

### useState: 가장 단순하고 빠른 로컬 상태

- 동기 렌더처럼 보여도 업데이트는 **배칭**됨. 동일 이벤트 루프 내 다중 `setState`는 한 번의 렌더로 합쳐짐
- 이전 값 의존 시 함수형 업데이트 권장: `setCount(c => c + 1)`

```tsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const inc = () => setCount((c) => c + 1);
  return <button onClick={inc}>count: {count}</button>;
}
```

### useReducer: 전이(transition)가 많은 상태에 적합

- 액션 기반으로 상태 전이를 명시화. 로직을 컴포넌트 밖으로 분리해 테스트/가독성 향상

```tsx
type Action = { type: "inc" } | { type: "dec" } | { type: "reset" };
function reducer(state: number, action: Action) {
  switch (action.type) {
    case "inc":
      return state + 1;
    case "dec":
      return state - 1;
    case "reset":
      return 0;
  }
}
```

### Context: 트리 전반으로 값 전달(남용 주의)

- 테마, 인증 사용자 같은 **빈도 낮은 변경**에 적합
- 자주 변하는 값은 컨텍스트를 쪼개거나 셀렉터 패턴, 전역 상태 라이브러리를 고려

### 전역 상태 라이브러리 선택 기준

- **Redux Toolkit**: 명확한 패턴/미들웨어·툴링 강함, 팀 협업에 유리
- **Zustand/Jotai**: 가볍고 보일러플레이트 적음, 작은/중형 앱에 효율적
- **Recoil**: 의존 그래프/파생 상태 관리 용이

### useEffect는 언제 쓰나

- "렌더 결과를 외부 세계와 동기화"할 때: 구독/타이머/DOM API/포커스 등
- 데이터 패칭은 서버 상태 도구(React Query 등)로 대체 고려
- 의존성 배열 정확히 관리하고 불필요한 이펙트 제거

### Ref vs State

- `useRef`는 값이 바뀌어도 리렌더를 일으키지 않음(임시 값, DOM 참조)
- `useState`는 UI에 반영되어야 하는 값

### 성능/경험 팁

- 불변성 유지로 참조 동일성 관리 → 불필요 리렌더 감소
- `memo/useMemo/useCallback`은 **측정 후** 필요한 곳에만 적용
- 입력 지연/우선순위 조절: `useDeferredValue`, `useTransition`
- 리스트 렌더는 **안정적인 key** 사용(인덱스 지양)

### 체크리스트(요약)

- 이 값은 서버에서 오나? → 서버 상태 도구로 관리
- 전이 복잡/액션 다수? → `useReducer`
- 트리 전반 공유? → Context(빈도 낮음) 또는 전역 상태 라이브러리
- 빈번한 렌더? → 파생 값 메모, 컴포넌트 분리, key 안정성 점검
