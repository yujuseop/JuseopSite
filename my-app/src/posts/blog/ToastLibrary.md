---
title: "CSS 자동 주입이 가능한 Toast 라이브러리 개발기"
date: "2025-10-14"
description: "프레임워크와 무관하게 사용할 수 있는 Toast 알림 라이브러리 개발"
---

## 프로젝트 개요

프레임워크에 무관하게 사용할 수 있는 **경량화된 Toast 알림 라이브러리**를 개발했습니다.  
가장 큰 특징은 **CSS 파일을 별도로 import하지 않아도 자동으로 스타일이 적용**된다는 점입니다.

---

## 핵심 목표

- **CSS 파일 없이도 완전히 작동하는 라이브러리**
- `import { toast } from "js-toastify"` 한 줄로 사용 가능
- **완전한 커스터마이징 지원**
- **TypeScript 완벽 지원**
- **경량화 (3.8KB)**

---

## 기술 스택

| 기술                   | 역할                              |
| ---------------------- | --------------------------------- |
| **TypeScript**         | 타입 안정성과 개발 편의성         |
| **Rollup**             | 번들링 및 ESM/CommonJS 지원       |
| **CSS Variables**      | 커스터마이징 가능한 스타일 시스템 |
| **Vanilla JavaScript** | 프레임워크 의존성 제거            |

---

## 핵심 구현 아이디어

### 1. CSS 자동 주입 시스템

라이브러리를 import하는 순간, 내부적으로 CSS 문자열을 `<style>` 태그로 주입하여  
**사용자가 별도로 CSS 파일을 import하지 않아도 스타일이 적용**되도록 만들었습니다.

```ts
const style = document.createElement("style");
style.textContent = `
  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--toast-bg, #333);
    color: var(--toast-color, #fff);
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 14px;
    opacity: 0.95;
    transition: opacity 0.3s ease;
  }
`;
document.head.appendChild(style);
```

### 2. CSS 변수를 활용한 커스터마이징

CSS 변수를 사용하면 사용자 정의 스타일을 손쉽게 적용할 수 있습니다.

```css
:root {
  --toast-bg: #222;
  --toast-color: #fff;
  --toast-radius: 8px;
}
```

### 3. Rollup 설정

```ts
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-import-css";

export default {
  input: "src/index.ts",
  output: [
    { file: "dist/index.esm.js", format: "esm", sourcemap: true },
    { file: "dist/index.cjs.js", format: "cjs", sourcemap: true },
  ],
  plugins: [typescript(), css(), terser()],
};
```

rollup-plugin-import-css를 통해 CSS 파일을 번들에 포함시키고,
terser로 최종 번들 크기를 최소화했습니다.

## 사용법

### 기본 사용법

```ts
import { toast } from "js-toastify";

toast("Hello from js-toastify!");

커스터마이징
:root {
--toast-bg: #0055ff;
--toast-color: #fff;
--toast-radius: 10px;
}

toast("Custom styled toast!");
```

## npm 배포 과정

### 1.패키지 이름 충돌 해결

처음 js.toast라는 이름으로 배포를 시도했으나,
기존 패키지와 이름이 유사하여 이름 충돌 에러가 발생했습니다.

최종적으로 js-toastify 이름으로 배포에 성공했습니다.

### 2. 최종 배포

https://www.npmjs.com/package/js-toastify

## 결과

항목 내용
패키지 크기 3.8KB (압축 후)
번들 크기 14.6KB (압축 해제)
파일 수 7개
TypeScript 지원
모던 브라우저 호환성

### 핵심 성과

1. CSS 파일 import 없이도 바로 사용 가능

2. CSS 변수로 완전한 커스터마이징 가능

3. 경량화 (3.8KB)

4. TypeScript 타입 완벽 지원

5. React, Vue, Angular 등 프레임워크 무관하게 사용 가능

### 향후 계획

1. 애니메이션 커스터마이징 옵션 추가

2. 다크/라이트 테마 지원

3. 모바일 UI 최적화

4. 접근성 개선

## 개발 후기

이번 프로젝트를 통해 사용자 경험을 최우선으로 하는 라이브러리 설계의 중요성을 깨달았습니다.
CSS 자동 주입 시스템을 통해 개발자들이 별도의 설정 없이 바로 사용할 수 있도록 만든 것이
가장 큰 성과라고 생각합니다.

또한 CSS 변수 기반 커스터마이징 시스템으로 유연성과 사용성을 모두 확보할 수 있었습니다.
앞으로도 더 나은 DX(Developer Experience)를 제공하는 UI 라이브러리를 지속적으로 연구할 예정입니다.
