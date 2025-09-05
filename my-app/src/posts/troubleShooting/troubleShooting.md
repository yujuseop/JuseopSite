---
title: "개발 중 마주친 문제 해결 기록"
date: "2025-03-19"
description: "Next.js와 Vercel을 사용하면서 겪은 문제들과 해결 방법을 정리합니다."
---

## 1. Vercel 배포 시 404 에러

### 문제 상황

- Vercel에 배포 후 페이지에 접근하면 404 에러가 발생
- 로컬 환경에서는 정상 작동

### 원인

- `vercel.json` 설정에서 `routes`와 `rewrites`를 동시에 사용하는 문제
- Vercel은 이 두 설정을 동시에 사용하는 것을 허용하지 않음

### 해결 방법

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- `routes` 설정을 제거하고 `rewrites`만 사용하여 해결

## 2. Next.js 동적 라우팅 오류

### 문제 상황

- 블로그의 동적 라우팅(`[slug]`)에서 타입 에러 발생
- "Type error: File is not a module" 에러 메시지

### 해결 방법

```typescript
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  // ... 컴포넌트 내용
}
```

- 컴포넌트를 async 함수로 변경하여 해결
