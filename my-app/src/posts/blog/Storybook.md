---
title: "Storybook에 대해서"
date: "2025-11-15"
description: "UI 컴포넌트 개발 도구 Storybook에 대해 알아보자."
---

## Storybook이란?

Storybook은 UI 컴포넌트를 독립적으로 개발하고, 테스트하고, 문서화할 수 있게 해주는 오픈소스 도구이다. React, Vue, Angular 등 다양한 프레임워크를 지원하며, 애플리케이션의 나머지 부분과 분리하여 컴포넌트를 작업할 수 있게 해준다.

## Storybook의 주요 특징

1. **컴포넌트 격리 개발**

   - 앱의 나머지 부분과 분리하여 컴포넌트를 독립적으로 개발
   - 데이터베이스나 API 없이도 UI 개발 가능

2. **인터랙티브 UI**

   - 다양한 props와 상태를 즉시 확인
   - Controls를 통해 실시간으로 props 변경 가능

3. **문서화**

   - 컴포넌트 사용법과 예제를 자동 생성
   - Markdown 지원으로 상세한 문서 작성 가능

4. **테스트 지원**

   - 단위 테스트와 시각적 회귀 테스트 지원
   - Accessibility 테스트도 가능

5. **다양한 뷰포트**
   - 다양한 화면 크기에서 컴포넌트 테스트
   - 모바일, 태블릿, 데스크톱 등 다양한 환경 시뮬레이션

## Storybook 설치 및 설정

### Next.js 프로젝트에 Storybook 설치

```bash
npx storybook@latest init
```

이 명령어는 자동으로 Storybook을 설정하고 필요한 패키지를 설치한다.

### 수동 설치 방법

```bash
npm install --save-dev @storybook/react @storybook/react-webpack5
npx sb init
```

## Story 작성 방법

### 기본 Story 구조

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
```

### 다양한 상태 표현

```tsx
// 컴포넌트의 다양한 상태를 Story로 표현
export const Loading: Story = {
  args: {
    loading: true,
    label: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled",
  },
};

export const WithIcon: Story = {
  args: {
    icon: "plus",
    label: "Add Item",
  },
};
```

## Args와 Controls 활용

Storybook의 Controls를 통해 컴포넌트 props를 실시간으로 조작할 수 있다.

```tsx
const meta = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    title: {
      control: "text",
      description: "카드의 제목",
    },
    description: {
      control: "text",
      description: "카드의 설명",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "카드의 크기",
    },
    backgroundColor: {
      control: "color",
      description: "카드의 배경색",
    },
  },
} satisfies Meta<typeof Card>;
```

## Parameters와 Decorators

### Parameters

Storybook의 설정과 환경을 제어할 수 있다.

```tsx
export default {
  parameters: {
    backgrounds: {
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#333333" },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
      },
    },
  },
};
```

### Decorators

Story를 감싸서 추가 기능을 제공할 수 있다.

```tsx
// 테마 Provider로 감싸기
export default {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

// 스타일 적용
export default {
  decorators: [
    (Story) => (
      <div style={{ padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};
```

## Addons 활용

Storybook은 다양한 애드온을 제공하여 기능을 확장할 수 있다.

### 자주 사용하는 Addons

1. **@storybook/addon-essentials**

   - Controls, Actions, Docs 등 필수 기능 포함

2. **@storybook/addon-a11y**

   - 접근성 테스트

3. **@storybook/addon-viewport**

   - 다양한 뷰포트에서 테스트

4. **@storybook/addon-backgrounds**
   - 배경색 변경

### Addon 사용 예시

```tsx
// .storybook/main.ts
export default {
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-viewport",
  ],
};
```

## 문서화 (Docs)

Storybook은 자동으로 컴포넌트 문서를 생성한다.

### MDX를 활용한 문서 작성

````mdx
// Button.mdx
import { Meta, Story, Canvas, Controls } from '@storybook/blocks';
import \* as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button 컴포넌트

Button은 사용자의 액션을 트리거하는 기본 컴포넌트입니다.

## 사용법

```tsx
import { Button } from "./Button";

<Button label="클릭" primary />;
```
````

## Props

| Props   | Type                           | Default  | Description           |
| ------- | ------------------------------ | -------- | --------------------- |
| label   | string                         | -        | 버튼에 표시될 텍스트  |
| primary | boolean                        | false    | 주요 버튼 스타일 적용 |
| size    | 'small' \| 'medium' \| 'large' | 'medium' | 버튼 크기             |

<Canvas of={ButtonStories.Primary} />
```

## 테스트 통합

### 단위 테스트

```tsx
import { render, screen } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import * as stories from "./Button.stories";

const { Primary } = composeStories(stories);

test("renders primary button", () => {
  render(<Primary />);
  expect(screen.getByRole("button")).toHaveTextContent("Button");
});
```

### 시각적 회귀 테스트

```bash
npm install --save-dev @storybook/test-runner
```

```json
// package.json
{
  "scripts": {
    "test-storybook": "test-storybook"
  }
}
```

## Storybook 실행

### 개발 모드

```bash
npm run storybook
```

기본적으로 `http://localhost:6006`에서 실행된다.

### 빌드

```bash
npm run build-storybook
```

정적 파일로 빌드되어 배포할 수 있다.

## 모범 사례

1. **컴포넌트별 Story 파일 작성**

   - 각 컴포넌트마다 `Component.stories.tsx` 파일 생성

2. **의미있는 Story 이름 사용**

   - `Primary`, `WithError`, `Loading` 등 명확한 이름 사용

3. **Args 재사용**

   - 공통 args는 meta에 정의하여 재사용

4. **문서화 유지**

   - 컴포넌트 변경 시 Story도 함께 업데이트

5. **실제 사용 사례 반영**
   - 앱에서 실제로 사용되는 props 조합으로 Story 작성

## 주의사항

1. **스타일링 이슈**

   - Next.js의 절대 경로나 이미지 최적화 기능 사용 시 설정 필요

2. **환경 변수**

   - `.env` 파일의 변수는 별도로 설정해야 함

3. **의존성 관리**
   - 프로젝트의 의존성과 Storybook의 의존성 버전 충돌 주의

## 결론

Storybook은 컴포넌트 기반 개발에 필수적인 도구이다. 컴포넌트를 독립적으로 개발하고 테스트할 수 있게 해주며, 자동화된 문서화를 통해 팀 내 소통을 원활하게 만든다. 특히 대규모 프로젝트에서 컴포넌트 라이브러리를 관리할 때 매우 유용하다.
