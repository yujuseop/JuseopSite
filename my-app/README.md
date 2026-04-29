# JuseopSite - 유주섭의 포트폴리오

풀스택 개발자 유주섭의 개인 포트폴리오 사이트입니다.  
자기소개, 기술스택, 프로젝트, 경력, 블로그, 트러블슈팅, 연락처를 제공합니다.

## 소개

안녕하세요! 개발자 **유주섭**입니다.  
사용자 경험을 더 좋게 만들기 위해 항상 고민하고, 더 나은 코드를 향해 끊임없이 성장하는 중입니다.

## 주요 기능

- **소개**: 자기소개 및 핵심 역량
- **기술스택**: 보유 기술 카테고리별 정리
- **프로젝트**: 진행한 프로젝트 목록 및 상세 정보
- **경력**: 회사별 경력 사항
- **블로그**: React, TypeScript, 웹 개발 관련 포스트
- **트러블슈팅**: 개발 과정에서 마주친 문제들과 해결 과정
- **연락처**: 이메일을 통한 간편한 연락
- **다크모드**: 라이트/다크 테마 토글
- **반응형 디자인**: 모바일부터 데스크톱까지 최적화

## 기술 스택

### 프론트엔드 (my-app/)

| 분류       | 기술                                            |
| ---------- | ----------------------------------------------- |
| 프레임워크 | Next.js 15 (App Router), React 19, TypeScript 5 |
| 스타일링   | Tailwind CSS 3.4.1                              |
| 마크다운   | gray-matter, marked                             |
| 폰트       | Pretendard (한국어 최적화)                      |
| 배포       | Vercel                                          |

### 백엔드 (portfolio-api/)

| 분류         | 기술                           |
| ------------ | ------------------------------ |
| 프레임워크   | Spring Boot 3.5.5              |
| 언어         | Java 17                        |
| DB 연동      | MyBatis                        |
| 데이터베이스 | PostgreSQL (로컬), Neon (운영) |
| 배포         | Render (Docker)                |

## 프로젝트 구조

```
JuseopSite/
├── my-app/              # 프론트엔드 (Next.js, 포트 3000)
└── portfolio-api/       # 백엔드 API (Spring Boot, 포트 8082)
```

### 프론트엔드 (my-app/src/)

```
app/
├── page.tsx                  # 홈 — 코르크보드 메인
├── about/page.tsx            # 소개
├── skills/page.tsx           # 기술스택 (API fetch)
├── career/page.tsx           # 경력 (API fetch)
├── projects/page.tsx         # 프로젝트 (API fetch)
├── blog/                     # 블로그 (.md 직접 읽기)
├── troubleShooting/          # 트러블슈팅 (.md 직접 읽기)
└── contact/page.tsx          # 연락하기
components/
├── Intro.tsx / Develop.tsx   # 소개 섹션
├── Skills.tsx                # 기술 스택
├── Projects.tsx              # 프로젝트 목록 + 모달
├── Experience.tsx            # 경력 목록 + 모달
├── Header.tsx / Footer.tsx   # 레이아웃
├── ThemeToggle.tsx           # 다크모드 토글
├── ContactForm.tsx           # 연락처 폼
└── ui/                       # 공용 컴포넌트 (Feed, Modal, CommentSection)
content/posts/
├── blog/                     # 블로그 마크다운
└── troubleShooting/          # 트러블슈팅 마크다운
```

## 주소

| https://juseopsite.vercel.app |

## 연락처

- **이메일**: [juseop159@gmail.com](mailto:juseop159@gmail.com)
