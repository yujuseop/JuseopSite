---
title: "React의 DOM에 대해서"
date: "2025-03-19"
description: "React의 VirtualDOM에 대해서 알아보자."
---

# React의 Virtual DOM에 대하여

## Virtual DOM이란?

Virtual DOM은 실제 DOM의 가벼운 복사본으로, 메모리에 존재하는 JavaScript 객체이다. React가 UI 업데이트를 효율적으로 처리하기 위해 사용하는 핵심 개념이다.

## Virtual DOM의 작동 방식

1. **State 변경 감지**

   - 컴포넌트의 state나 props가 변경되면 React는 새로운 Virtual DOM 트리를 생성한다.

2. **Diffing 알고리즘**

   - 이전 Virtual DOM과 새로운 Virtual DOM을 비교한다.
   - 변경된 부분만을 찾아내는 과정을 "재조정(Reconciliation)"이라고 한다.

3. **배치 업데이트**
   - 찾아낸 차이점들을 모아서 실제 DOM에 한 번에 적용한다.
   - 이를 통해 불필요한 DOM 조작을 최소화한다.

## Virtual DOM의 장점

1. **성능 최적화**

   ```jsx
   // 예시: 여러 상태 업데이트를 효율적으로 처리
   function Counter() {
     const [count, setCount] = useState(0);
     return (
       <div>
         <h1>{count}</h1>
         <button onClick={() => setCount(count + 1)}>증가</button>
       </div>
     );
   }
   ```

2. **크로스 플랫폼 지원**

   - DOM이 없는 환경(예: React Native)에서도 동일한 개념 적용 가능
   - 서버 사이드 렌더링 지원

3. **개발 경험 향상**
   - 선언적 UI 프로그래밍 가능
   - 상태 관리 단순화

## 최적화 기법

1. **컴포넌트 메모이제이션**

   ```jsx
   // React.memo로 불필요한 리렌더링 방지
   const MemoizedComponent = React.memo(function MyComponent(props) {
     return <div>{props.value}</div>;
   });
   ```

2. **Hook을 활용한 최적화**

   ```jsx
   // useMemo로 계산 비용이 큰 값 메모이제이션
   const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

   // useCallback으로 함수 메모이제이션
   const memoizedCallback = useCallback(() => {
     doSomething(a, b);
   }, [a, b]);
   ```

## 주의사항 및 모범 사례

1. **키(Key) 속성 올바르게 사용하기**

   ```jsx
   // 좋은 예시
   {
     items.map((item) => <ListItem key={item.id} {...item} />);
   }
   ```

2. **상태 업데이트는 불변성 유지하기**

   ```jsx
   // 잘못된 방법
   const [items, setItems] = useState([]);
   items.push(newItem); //

   // 올바른 방법
   setItems([...items, newItem]); //
   ```

3. **큰 리스트는 가상화 사용하기**
   - react-window나 react-virtualized 같은 라이브러리 활용

## 결론

Virtual DOM은 React의 핵심 기능 중 하나로, 복잡한 UI 업데이트를 효율적으로 처리할 수 있게 해준다. 하지만 이는 마법이 아니며, 개발자가 적절한 최적화 기법을 적용할 때 가장 효과적으로 작동한다.
