# 배포 가이드 — Render + Neon + Vercel

## 전체 구조

```
브라우저
  → Vercel (Next.js 프론트엔드)
      → Render (Spring Boot API)
          → Neon (PostgreSQL 클라우드 DB)
```

---

## 서비스 정보

| 서비스 | URL | 용도 |
|---|---|---|
| Vercel | https://juseopsite.vercel.app | 프론트엔드 |
| Render | https://juseopsite.onrender.com | 백엔드 API |
| Neon | neon.tech 대시보드 | PostgreSQL DB |

---

## Render 설정

- **서비스명**: juseopsite
- **Runtime**: Docker
- **Root Directory**: `portfolio-api`
- **Dockerfile 위치**: `portfolio-api/Dockerfile`
- **Branch**: main (push 시 자동 배포)

### 환경변수 (Render → Environment 탭)

| Key | 값 형식 |
|---|---|
| `DATABASE_URL` | `jdbc:postgresql://[Neon Host]/neondb?sslmode=require` |
| `DB_USER` | Neon 유저명 |
| `DB_PASSWORD` | Neon 비밀번호 |
| `CORS_ALLOWED_ORIGINS` | `https://juseopsite.vercel.app` |

> **주의**: Render가 자동 제공하는 DB URL은 `postgresql://` 형식 → Spring Boot는 반드시 `jdbc:postgresql://` 형식 필요

---

## Neon 설정

- **서비스**: neon.tech
- **DB명**: neondb
- **Region**: ap-southeast-1 (Singapore)
- **무료 티어**: 영구 무료 (Render PostgreSQL은 90일 후 만료라 Neon 사용)

### DBeaver로 Neon 접속 방법

1. DBeaver → 새 연결 → PostgreSQL
2. Connection String 탭에서 Neon 제공 URL 입력
3. `sslmode=require` 필수

---

## Vercel 설정

### 환경변수 (Vercel → Settings → Environment Variables)

| Key | Value | Environment |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `https://juseopsite.onrender.com` | Production |

---

## DB 초기화 방법 (최초 1회 또는 데이터 리셋 시)

prod 환경에서는 `sql.init.mode: never`라 자동 실행되지 않음. 아래 절차로 수동 초기화:

1. `application.yml` prod 프로파일 수정
```yaml
sql:
  init:
    mode: always          # never → always 임시 변경
    schema-locations: classpath:db/schema.sql
    data-locations: classpath:db/data.sql
```
2. 커밋 → 푸시 → Render 재배포 완료 대기
3. API 정상 확인: `curl https://juseopsite.onrender.com/api/skills`
4. 다시 `mode: never`로 롤백 → 커밋 → 푸시

---

## 데이터 수정 흐름

### 포트폴리오 데이터 (기술/프로젝트/경력) 수정 시

```
1. portfolio-api/src/main/resources/db/data.sql 수정
2. 로컬: ./gradlew bootRun → 자동 반영 (mode: always)
3. 운영: 위 DB 초기화 방법 절차 실행
```

### 프로젝트 상세 페이지 수정 시

```
my-app/src/content/projects/{slug}.md 파일 수정
→ git push → Vercel 자동 재배포
```

---

## Render 무료 티어 주의사항

- **슬립**: 15분 비활성 시 서버 슬립 → 첫 요청 30~60초 콜드 스타트
- **영향 최소화**: 사이트가 SSG 구조라 일반 방문자는 콜드 스타트 영향 없음
  - 댓글 작성 / 연락처 폼 제출 시에만 실시간 API 호출
