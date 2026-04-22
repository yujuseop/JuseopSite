---
title: "CORS 에러에 대해서"
date: "2025-11-16"
description: "Cross-Origin Resource Sharing(CORS)와 에러 해결 방법에 대해 알아보자."
---

## CORS란?

CORS(Cross-Origin Resource Sharing)는 웹 브라우저에서 한 출처(Origin)에서 실행 중인 웹 애플리케이션이 다른 출처의 리소스에 접근할 수 있도록 허용하는 메커니즘이다. 기본적으로 브라우저는 **Same-Origin Policy(동일 출처 정책)**에 의해 다른 출처의 리소스 접근을 차단한다.

## Origin(출처)이란?

출처는 다음 세 가지로 구성된다:

1. **프로토콜(Protocol)**: `http`, `https`
2. **도메인(Domain)**: `example.com`, `localhost:3000`
3. **포트(Port)**: `3000`, `8080` (기본 포트는 생략 가능)

### 동일 출처 예시

```
https://example.com:443  →  https://example.com:443  ✅ 동일
http://example.com:80    →  https://example.com:443  ❌ 다름 (프로토콜)
https://example.com      →  https://api.example.com  ❌ 다름 (도메인)
http://localhost:3000    →  http://localhost:8080    ❌ 다름 (포트)
```

## Same-Origin Policy가 필요한 이유

Same-Origin Policy는 보안을 위해 존재한다:

1. **CSRF(Cross-Site Request Forgery) 공격 방지**
   - 악의적인 사이트가 사용자의 인증 정보를 이용해 다른 사이트에 요청하는 것을 방지

2. **데이터 유출 방지**
   - 민감한 정보가 다른 출처로 전송되는 것을 차단

3. **XSS(Cross-Site Scripting) 공격 완화**
   - 악성 스크립트가 다른 출처의 리소스에 접근하는 것을 제한

## CORS 에러가 발생하는 경우

### 일반적인 시나리오

1. **프론트엔드와 백엔드가 다른 포트에서 실행**
   ```
   프론트엔드: http://localhost:3000
   백엔드:     http://localhost:8080
   ```

2. **다른 도메인으로 API 호출**
   ```
   프론트엔드: https://myapp.com
   API 서버:   https://api.example.com
   ```

3. **프로토콜이 다른 경우**
   ```
   프론트엔드: https://myapp.com
   API 서버:   http://api.example.com
   ```

### 브라우저 콘솔 에러 메시지

```
Access to fetch at 'http://localhost:8080/api/users' from origin 
'http://localhost:3000' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## CORS 작동 방식

### Simple Request (단순 요청)

다음 조건을 모두 만족하면 Simple Request로 처리된다:

- 메서드: `GET`, `POST`, `HEAD`
- 헤더: `Accept`, `Accept-Language`, `Content-Language`, `Content-Type` (제한된 값만)
- `Content-Type`: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`

**작동 과정:**

1. 브라우저가 실제 요청을 바로 전송
2. 서버가 `Access-Control-Allow-Origin` 헤더로 응답
3. 브라우저가 헤더를 확인하고 응답 허용/차단 결정

### Preflight Request (사전 요청)

Simple Request 조건을 만족하지 않으면 Preflight Request가 발생한다:

**작동 과정:**

1. 브라우저가 `OPTIONS` 메서드로 사전 요청 전송
2. 서버가 허용 여부를 헤더로 응답
3. 허용되면 실제 요청 전송
4. 차단되면 실제 요청을 보내지 않음

**Preflight 요청 예시:**

```http
OPTIONS /api/users HTTP/1.1
Origin: http://localhost:3000
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type
```

**서버 응답 예시:**

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

## 서버 측 해결 방법

### Express.js 예시

```javascript
const express = require("express");
const app = express();

// 모든 출처 허용 (개발 환경용)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});

// 특정 출처만 허용 (프로덕션 권장)
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://myapp.com",
    "https://www.myapp.com",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// 또는 cors 미들웨어 사용
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

### Next.js API Routes 예시

```typescript
// pages/api/users.ts 또는 app/api/users/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = NextResponse.json({ data: "users" });

  response.headers.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}

// OPTIONS 요청 처리 (Preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
```

### Nginx 설정 예시

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        # CORS 헤더 추가
        add_header 'Access-Control-Allow-Origin' 'https://myapp.com' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;

        # Preflight 요청 처리
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://myapp.com' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
            add_header 'Access-Control-Max-Age' 86400;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        proxy_pass http://backend;
    }
}
```

## 클라이언트 측 해결 방법 (임시)

### 개발 환경에서만 사용 가능한 방법

#### 1. 브라우저 확장 프로그램 사용

- Chrome: "CORS Unblock" 같은 확장 프로그램 (개발 전용)

#### 2. 프록시 서버 사용

**Next.js의 경우:**

```typescript
// next.config.ts
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
};
```

**Vite의 경우:**

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
};
```

#### 3. 개발 서버 프록시

```json
// package.json
{
  "proxy": "http://localhost:8080"
}
```

## CORS 관련 헤더 설명

### 서버가 설정하는 헤더

1. **Access-Control-Allow-Origin**
   - 허용할 출처 지정
   - `*`: 모든 출처 허용 (credentials 사용 시 불가)
   - 특정 출처: `https://myapp.com`

2. **Access-Control-Allow-Methods**
   - 허용할 HTTP 메서드
   - 예: `GET, POST, PUT, DELETE`

3. **Access-Control-Allow-Headers**
   - 허용할 요청 헤더
   - 예: `Content-Type, Authorization`

4. **Access-Control-Allow-Credentials**
   - 쿠키나 인증 정보 포함 허용
   - `true`로 설정 시 `Access-Control-Allow-Origin`은 `*` 불가

5. **Access-Control-Max-Age**
   - Preflight 요청 결과 캐시 시간 (초)
   - 예: `86400` (24시간)

### 클라이언트가 설정하는 헤더

1. **Origin**
   - 브라우저가 자동으로 설정
   - 현재 요청의 출처

2. **Access-Control-Request-Method**
   - Preflight 요청에서 실제 요청 메서드 지정

3. **Access-Control-Request-Headers**
   - Preflight 요청에서 실제 요청 헤더 지정

## Credentials와 CORS

쿠키나 인증 정보를 포함한 요청을 보낼 때는 추가 설정이 필요하다:

### 클라이언트 측

```typescript
fetch("https://api.example.com/users", {
  method: "GET",
  credentials: "include", // 쿠키 포함
  headers: {
    "Content-Type": "application/json",
  },
});
```

### 서버 측

```javascript
// Express
app.use(
  cors({
    origin: "https://myapp.com",
    credentials: true, // 필수!
  })
);

// 응답 헤더도 설정
res.header("Access-Control-Allow-Credentials", "true");
```

**주의:** `credentials: true`일 때 `Access-Control-Allow-Origin`은 `*`가 아닌 특정 출처여야 한다.

## 일반적인 실수와 해결 방법

### 1. Preflight 요청 미처리

**문제:**
```
Access to fetch ... has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check
```

**해결:**
```javascript
// OPTIONS 요청 명시적으로 처리
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});
```

### 2. Credentials와 Wildcard 혼용

**문제:**
```javascript
// ❌ 작동하지 않음
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Credentials", "true");
```

**해결:**
```javascript
// ✅ 특정 출처 지정
res.header("Access-Control-Allow-Origin", "https://myapp.com");
res.header("Access-Control-Allow-Credentials", "true");
```

### 3. 헤더 순서 문제

**문제:**
응답 헤더가 올바르게 설정되지 않음

**해결:**
```javascript
// 헤더를 응답 전에 모두 설정
res.header("Access-Control-Allow-Origin", origin);
res.header("Access-Control-Allow-Methods", methods);
res.header("Access-Control-Allow-Headers", headers);
res.json(data);
```

## 보안 고려사항

1. **프로덕션에서는 특정 출처만 허용**
   - `*` 사용 지양
   - 허용 목록을 환경 변수로 관리

2. **민감한 헤더 제한**
   - 필요한 헤더만 `Access-Control-Allow-Headers`에 포함

3. **HTTPS 사용**
   - 프로덕션에서는 반드시 HTTPS 사용

4. **CORS는 보안 기능이 아님**
   - CORS는 브라우저의 보안 정책
   - 서버는 여전히 직접 요청을 받을 수 있음
   - 서버 측 인증/인가 로직 필수

## 디버깅 팁

1. **브라우저 개발자 도구 확인**
   - Network 탭에서 Preflight 요청 확인
   - Response Headers에서 CORS 헤더 확인

2. **curl로 테스트**
   ```bash
   # Preflight 요청 테스트
   curl -X OPTIONS http://localhost:8080/api/users \
     -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -v
   ```

3. **서버 로그 확인**
   - OPTIONS 요청이 도착하는지 확인
   - 응답 헤더가 올바르게 설정되는지 확인

## 결론

CORS는 웹 보안의 중요한 부분이며, 올바르게 설정하지 않으면 개발과 배포 과정에서 많은 문제를 일으킬 수 있다. 서버 측에서 적절한 CORS 헤더를 설정하고, 개발 환경과 프로덕션 환경을 구분하여 관리하는 것이 중요하다. 특히 credentials를 사용하는 경우 특정 출처를 명시해야 하며, Preflight 요청을 올바르게 처리해야 한다.

