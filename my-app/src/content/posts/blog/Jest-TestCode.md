---
title: "Jest 테스트 프레임워크 완전 가이드"
date: "2025-04-30"
description: "JavaScript/TypeScript 코드 테스트를 위한 Jest 기초부터 실전까지"
---

### Jest란 무엇인가

Jest는 Facebook에서 개발한 JavaScript/TypeScript 테스트 프레임워크입니다.  
**제로 설정**으로 시작할 수 있으며, 내장된 assertion, mocking, 코드 커버리지 기능을 제공합니다.

### 왜 Jest를 사용할까

- **제로 설정**: 추가 설정 없이 바로 사용 가능
- **빠른 실행**: 병렬 테스트 실행으로 속도 최적화
- **강력한 Mocking**: 함수, 모듈, 타이머 등을 쉽게 모킹
- **스냅샷 테스트**: UI 컴포넌트 렌더링 결과 비교
- **코드 커버리지**: 테스트 커버리지 자동 측정

### 설치 및 기본 설정

```bash
# npm
npm install --save-dev jest @types/jest

# yarn
yarn add -D jest @types/jest

# TypeScript 사용 시
npm install --save-dev ts-jest @types/node
```

**package.json 설정:**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

**jest.config.js (기본 설정):**

```javascript
module.exports = {
  testEnvironment: "node", // 또는 'jsdom' (브라우저 환경)
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
};
```

### 기본 문법

#### describe와 it/test

```javascript
describe("계산기 함수", () => {
  it("두 수를 더해야 함", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("두 수를 빼야 함", () => {
    expect(subtract(5, 2)).toBe(3);
  });
});
```

#### Assertion (단언)

```javascript
// 동등성
expect(2 + 2).toBe(4); // === 비교
expect({ name: "John" }).toEqual({ name: "John" }); // 깊은 비교

// 참/거짓
expect(true).toBeTruthy();
expect(false).toBeFalsy();
expect(null).toBeNull();
expect(undefined).toBeUndefined();

// 숫자
expect(2 + 2).toBeGreaterThan(3);
expect(2 + 2).toBeGreaterThanOrEqual(4);
expect(2 + 2).toBeLessThan(5);

// 문자열
expect("team").toMatch(/ea/);
expect("team").toContain("ea");

// 배열
expect(["apple", "banana"]).toContain("apple");
expect([1, 2, 3]).toHaveLength(3);

// 객체
expect({ name: "John", age: 30 }).toHaveProperty("name");
expect({ name: "John" }).toMatchObject({ name: "John" });

// 예외
expect(() => {
  throw new Error("에러 발생");
}).toThrow("에러 발생");
```

### 비동기 테스트

```javascript
// Promise
test("비동기 데이터 가져오기", async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});

// 콜백
test("콜백 테스트", (done) => {
  fetchData((data) => {
    expect(data).toBeDefined();
    done();
  });
});

// resolves/rejects
test("Promise 성공", async () => {
  await expect(fetchData()).resolves.toBe("success");
});

test("Promise 실패", async () => {
  await expect(fetchData()).rejects.toThrow("에러");
});
```

### Mocking (모킹)

#### 함수 모킹

```javascript
// jest.fn() - 함수 모킹
const mockFn = jest.fn();
mockFn(1, 2);
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith(1, 2);
expect(mockFn).toHaveReturnedWith(undefined);

// 반환값 설정
const mockFn = jest.fn(() => "mocked value");
expect(mockFn()).toBe("mocked value");

// 여러 반환값
const mockFn = jest
  .fn()
  .mockReturnValueOnce("first")
  .mockReturnValueOnce("second")
  .mockReturnValue("default");
```

#### 모듈 모킹

```javascript
// 모듈 전체 모킹
jest.mock("./api");

// 부분 모킹
jest.mock("./api", () => ({
  ...jest.requireActual("./api"),
  fetchUser: jest.fn(),
}));

// 구현 커스터마이징
jest.mock("./api", () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: "John" })),
}));
```

#### 타이머 모킹

```javascript
// 타이머 모킹
jest.useFakeTimers();

test("1초 후 실행", () => {
  const callback = jest.fn();
  setTimeout(callback, 1000);

  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalled();
});

// 원래 타이머로 복원
jest.useRealTimers();
```

### React 컴포넌트 테스트

**설치:**

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

**설정 (jest.config.js):**

```javascript
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
```

**jest.setup.js:**

```javascript
import "@testing-library/jest-dom";
```

**컴포넌트 테스트 예시:**

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button 컴포넌트", () => {
  it("버튼이 렌더링되어야 함", () => {
    render(<Button>클릭</Button>);
    expect(screen.getByText("클릭")).toBeInTheDocument();
  });

  it("클릭 이벤트가 발생해야 함", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>클릭</Button>);

    fireEvent.click(screen.getByText("클릭"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 스냅샷 테스트

```javascript
import { render } from "@testing-library/react";
import Component from "./Component";

test("컴포넌트 스냅샷", () => {
  const { container } = render(<Component />);
  expect(container).toMatchSnapshot();
});
```

### 코드 커버리지

```bash
# 커버리지 리포트 생성
npm run test:coverage

# 특정 임계값 설정
jest --coverage --coverageThreshold='{
  "global": {
    "branches": 80,
    "functions": 80,
    "lines": 80,
    "statements": 80
  }
}'
```

### Next.js와 Jest 통합

**jest.config.js:**

```javascript
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
```

### 실전 예시

#### 유틸리티 함수 테스트

```typescript
// utils/formatDate.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR");
}

// utils/formatDate.test.ts
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("날짜를 한국어 형식으로 포맷해야 함", () => {
    const date = new Date("2025-04-30");
    expect(formatDate(date)).toMatch(/2025/);
  });
});
```

#### API 함수 테스트

```typescript
// api/user.ts
export async function fetchUser(id: number) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// api/user.test.ts
import { fetchUser } from "./user";

jest.mock("node-fetch", () => jest.fn());

describe("fetchUser", () => {
  it("사용자 데이터를 가져와야 함", async () => {
    const mockUser = { id: 1, name: "John" };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser),
      })
    ) as jest.Mock;

    const user = await fetchUser(1);
    expect(user).toEqual(mockUser);
    expect(global.fetch).toHaveBeenCalledWith("/api/users/1");
  });
});
```

### 베스트 프랙티스

1. **테스트는 독립적으로 작성**: 각 테스트는 다른 테스트에 의존하지 않아야 함
2. **명확한 테스트 이름**: `it('should ...')` 형식으로 의도를 명확히
3. **AAA 패턴**: Arrange(준비) → Act(실행) → Assert(검증)
4. **한 번에 하나만 테스트**: 하나의 테스트는 하나의 동작만 검증
5. **Mock은 최소화**: 필요한 경우에만 모킹 사용

### 체크리스트

- [ ] 테스트 환경 설정 완료
- [ ] 기본 테스트 작성 가능
- [ ] 비동기 테스트 이해
- [ ] Mocking 활용 가능
- [ ] React 컴포넌트 테스트 가능
- [ ] 코드 커버리지 측정 가능

### 참고

- [Jest 공식 문서](https://jestjs.io/)
- [Testing Library 문서](https://testing-library.com/)
- [Next.js 테스팅 가이드](https://nextjs.org/docs/app/building-your-application/testing/jest)
