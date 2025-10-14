---
title: "REST API 설계 가이드"
date: "2025-06-25"
description: "리소스 모델링, 엔드포인트/메서드, 멱등성, 에러/보안, 상태 코드 상세"
---

### REST란 무엇인가

- 리소스를 URI로 식별하고, 표현(주로 JSON)과 표준 HTTP를 이용해 조작하는 아키텍처 스타일.
- 제약: Client-Server, Stateless, Cacheable, Uniform Interface, Layered System, Code-on-Demand(선택).

### 리소스 모델링과 URI 규칙

- 명사+복수형: `/users`, `/users/{id}`, `/users/{id}/posts`
- 관계 표현은 하위 리소스로: `/orders/{id}/items`
- 행위는 메서드로 표현하고, URI에 동사를 피함(예외: 비즈니스 액션은 `/payments/{id}:capture`처럼 명시적 엔드포인트 고려).

### HTTP 메서드와 멱등성

- GET(조회, 멱등), POST(생성/액션), PUT(전체 수정, 멱등), PATCH(부분 수정), DELETE(삭제, 멱등)
- 멱등성: 동일 요청을 여러 번 보내도 서버 상태가 동일하게 유지되어야 함(副작용은 로그 등 허용 가능하나 리소스 상태는 동일).

### 요청/응답 규칙(권장)

- 요청: `Content-Type: application/json; charset=utf-8`
- 응답: `Content-Type: application/json; charset=utf-8`
- 타임스탬프는 ISO-8601 UTC(`2025-04-25T12:34:56Z`), 금액/정밀도는 문자열 또는 정수 센트단위 권장.

### 페이징/필터/정렬

- 페이징: `GET /items?page=1&size=20`
- 커서 기반: `GET /items?cursor=xxx&limit=20`
- 정렬/필터: `?sort=-createdAt&status=active` (내림차순은 `-` 접두)

### 캐싱

- 캐시 지시자: `Cache-Control: public, max-age=60`(초)
- 조건부 요청: `ETag/If-None-Match`, `Last-Modified/If-Modified-Since`
- 304 Not Modified로 대역폭 절감.

### 오류 응답 포맷 예시(권장)

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "title is required",
    "details": [{ "field": "title", "reason": "required" }],
    "traceId": "9b8f..."
  }
}
```

### 보안

- HTTPS 필수, 입력 검증/출력 인코딩, 레이트 리밋팅/봇 방어, CORS 최소 허용 원칙.
- 인증: Bearer JWT 또는 세션 쿠키, 민감정보는 절대 로그/응답에 노출 금지.

### 버전 관리

- 경로 버전: `/v1/users`
- 헤더 버전: `Accept: application/vnd.myapp.v2+json`
- Major 변경에만 버전 상승, 가능한 호환성 유지.

### 상태 코드 상세(실전 사용 가이드)

- 1xx Informational
  - 100 Continue: 대용량 전송 전 헤더 승인(드뭄)
  - 101 Switching Protocols: 업그레이드(웹소켓 등)
- 2xx Success
  - 200 OK: 일반 성공(조회/갱신 결과 본문 포함)
  - 201 Created: 생성 성공. `Location` 헤더에 새 리소스 URI 포함, 본문에 리소스 표현
  - 202 Accepted: 비동기 처리 수락(큐잉). 폴링/웹훅으로 완료 통지
  - 204 No Content: 본문 없는 성공(DELETE/멱등 PUT 결과 등)
  - 206 Partial Content: 범위 응답(대용량 다운로드)
- 3xx Redirection
  - 301 Moved Permanently / 308 Permanent Redirect: 영구 이동(메서드 보존은 308)
  - 302 Found / 303 See Other / 307 Temporary Redirect: 일시적 리다이렉트(303은 GET으로 전환)
  - 304 Not Modified: 조건부 요청 캐시 적중
- 4xx Client Error
  - 400 Bad Request: 잘못된 문법/바디. 필드 검증 실패는 422 권장
  - 401 Unauthorized: 인증 필요/만료(WWW-Authenticate 포함)
  - 403 Forbidden: 인증했으나 권한 없음
  - 404 Not Found: 리소스 없음(보안 관점에서 403 대신 404 마스킹 고려 가능)
  - 405 Method Not Allowed: 허용 메서드 아님(`Allow` 헤더 포함)
  - 409 Conflict: 상태 충돌(중복 키/버전 충돌/상태 전이 불가)
  - 410 Gone: 영구 삭제되어 더 이상 사용 불가
  - 412 Precondition Failed: ETag/조건 헤더 불일치(낙관적 락)
  - 415 Unsupported Media Type: 지원하지 않는 Content-Type
  - 422 Unprocessable Entity: 의미상 유효하지 않음(필드 검증 실패)
  - 429 Too Many Requests: 레이트 리밋 초과(`Retry-After` 포함)
- 5xx Server Error
  - 500 Internal Server Error: 일반 서버 오류(민감정보 노출 금지)
  - 501 Not Implemented: 미구현 메서드/기능
  - 502 Bad Gateway: 상위 게이트웨이/업스트림 오류
  - 503 Service Unavailable: 점검/일시 과부하(`Retry-After`)
  - 504 Gateway Timeout: 업스트림 타임아웃

### 엔드포인트 예시

```http
POST /v1/users HTTP/1.1
Content-Type: application/json

{ "email": "a@b.com", "password": "***" }
```

```http
HTTP/1.1 201 Created
Location: /v1/users/123
Content-Type: application/json

{ "id": 123, "email": "a@b.com", "createdAt": "2025-04-25T12:34:56Z" }
```

부분 수정(PATCH) 예시

```http
PATCH /v1/users/123
Content-Type: application/json

{ "nickname": "js" }
```

충돌/락(ETag) 예시

```http
PUT /v1/users/123
If-Match: "etag-xyz"
Content-Type: application/json

{ "email": "c@d.com" }
```

### 체크리스트(요약)

- 명확한 리소스 모델과 일관된 URI/메서드 매핑
- 멱등성 보장(특히 PUT/DELETE)과 적절한 상태 코드 사용
- 표준화된 오류 포맷과 트레이스 ID 제공
- 캐시/조건부 요청/ETag로 대역폭 절감
- HTTPS, 인증/권한, 레이트 리밋, 입력 검증으로 보안 강화
- 문서화(OpenAPI/Swagger)와 샘플 응답 유지
