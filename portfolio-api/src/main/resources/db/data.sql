-- ============================================================
-- Portfolio API - Seed Data (Portfolio 정적 데이터)
-- 포스트(posts)는 PostInitializer가 마크다운 파일에서 자동 삽입
-- ============================================================

-- 기존 데이터 충돌 방지 (재실행 가능)
DELETE FROM experience_highlight_details;
DELETE FROM experience_highlights;
DELETE FROM experience_tech_stacks;
DELETE FROM experiences;
DELETE FROM project_highlights;
DELETE FROM project_tech_stacks;
DELETE FROM projects;
DELETE FROM skills;
DELETE FROM skill_categories;

-- ============================================================
-- 스킬 카테고리 & 스킬
-- ============================================================

INSERT INTO skill_categories (id, title, description, display_order) VALUES
('backend',  'Backend',       '서버 및 API 개발',              1),
('frontend', 'Frontend',      'UI 및 클라이언트 개발',          2),
('database', 'Database',      '데이터베이스 설계 및 관리',       3),
('devops',   'DevOps / Tools','배포 환경 및 협업 도구',          4);

INSERT INTO skills (category_id, name, level, description, display_order) VALUES
('backend',  'Java',         3, '업무 코드 작성 가능',                          1),
('backend',  'Spring Boot',  3, 'RESTful API 설계 및 서버 개발',                2),
('frontend', 'React',        3, '컴포넌트 기반 UI 개발',                        1),
('frontend', 'Next.js',      3, 'SSR 기반 웹 애플리케이션',                     2),
('frontend', 'React Native', 3, '크로스플랫폼 모바일 앱 개발 (AAC 프로젝트)',   3),
('database', 'MySQL',        3, '관계형 DB 설계 및 쿼리 작성',                  1),
('database', 'PostgreSQL',   3, '운영 환경 DB 관리',                            2),
('database', 'Firebase',     3, '실시간 데이터 동기화 및 인증 (AAC 프로젝트)',  3),
('devops',   'Git / GitHub', 3, '버전 관리 및 협업',                            1),
('devops',   'Docker',       2, '컨테이너 기반 배포 환경 구성',                 2),
('devops',   'Nginx',        2, '웹 서버 및 리버스 프록시',                     3);

-- ============================================================
-- 프로젝트
-- ============================================================

INSERT INTO projects (slug, emoji, title, summary, description, participants, duration, demo_url, repo_url, display_order) VALUES
(
  'kalisco-kdh',
  '🍽️',
  'Kalisco — KDH 외식업 통합 운영 관리 플랫폼',
  '수기·엑셀에 의존하던 외식업 다점포의 메뉴 원가 관리와 영업일 관리를 디지털화한 풀스택 백오피스 플랫폼입니다.',
  '제조업의 BOM(Bill of Materials) 개념을 외식업 레시피 원가 관리에 도입해, 식자재 단가 변동이 전체 레시피에 즉시 반영되는 구조를 설계했습니다. 전사 기준 캘린더와 매장별 예외를 이중 테이블로 분리해 다점포 영업일을 효율적으로 관리합니다.',
  '소규모 팀 (2~3인) · 풀스택',
  '진행 중',
  'https://kdh.kalisco.net',
  NULL,
  1
),
(
  'portfolio-site',
  '🚀',
  'YJS 포트폴리오 사이트',
  'Next.js와 Tailwind CSS로 구축한 반응형 포트폴리오, 다크 모드와 블로그를 지원합니다.',
  '디자인 시스템과 콘텐츠 관리를 효율적으로 적용하기 위해 Next.js 15 App Router를 활용해 설계한 개인 포트폴리오입니다.',
  '개인 프로젝트',
  '2024.09 ~ 2024.10',
  'https://juseopsite.vercel.app/',
  'https://github.com/yujuseop/JuseopSite',
  3
),
(
  'epigram-collaboration',
  '🤝',
  'Epigram 협업 프로세스 최적화',
  '협업 체계 재정비와 UI 개선으로 빌드 오류를 70% 이상 줄이고 감정 인식 효율을 높인 프로젝트입니다.',
  '협업 문서화 체계 구축과 자동화된 배포 파이프라인을 정비해 팀 생산성을 높였고, 감정 인식 인터페이스를 개선해 사용자 만족도를 끌어올렸습니다.',
  '팀 프로젝트 (FE6명)',
  '2025.03 ~ 2025.04',
  'https://fe-12-team5-coworkers.vercel.app/',
  'https://github.com/yujuseop/FE12_Team5_epigram',
  4
),
(
  'tripview',
  '🌍',
  'TripView 여행 리뷰 플랫폼',
  '여행을 기록하고 리뷰를 남길 수 있는 플랫폼으로, 일정별 여행지를 관리하고 공개/비공개를 전환할 수 있습니다.',
  'Next.js와 Supabase를 기반으로 인증부터 데이터 관리까지 한 생태계에서 처리하며, 폼 검증과 토스트 시스템을 직접 설계해 사용자 경험을 높였습니다.',
  '개인 프로젝트',
  '2025.09 ~ 2025.10 (2주)',
  'https://trip-review-site.vercel.app/',
  'https://github.com/yujuseop/TripReviewSite',
  5
),
(
  'wine-community',
  '🍷',
  'WINE 커뮤니티 플랫폼',
  '와인을 탐색하고 애호가들이 소통할 수 있는 웹 애플리케이션으로, 검색·필터·리뷰 기능을 제공해 맞춤형 와인 관리와 커뮤니티 경험을 지원합니다.',
  'Next.js 기반으로 와인 데이터 탐색과 커뮤니티 기능을 통합하고, 인증·프로필 관리·무한 스크롤 등 사용자 중심 UX를 구축했습니다.',
  '팀 프로젝트 (FE 6명)',
  '2025.01 ~ 2025.02 (2주)',
  'https://project-team2-wine.vercel.app/',
  'https://github.com/yujuseop/Project-Team2-WINE',
  6
),
(
  'pecspert-aac',
  '🧩',
  'PECSPERT — AAC 보완대체의사소통 앱',
  '발화에 어려움이 있는 자폐 아동을 위한 AAC 앱을 개발했습니다. 단어 카드를 선택하면 음성으로 출력되어 감정과 욕구를 자연스럽게 전달할 수 있도록 돕는 서비스입니다.',
  '제조업 관행을 AAC 도메인에 적용해 음성 시스템을 고도화하고, Context API 기반 전역 상태 관리와 Firestore + AsyncStorage 이중 저장으로 다중 디바이스 동기화를 구현했습니다. Tech PM 역할로 직군 간 커뮤니케이션을 조율하며 프로젝트 일정을 안정적으로 관리했습니다.',
  '팀 프로젝트 · FE 6명, BE 2명',
  '2025.06 ~ 2025.07',
  NULL,
  NULL,
  2
);

-- 프로젝트 기술 스택
INSERT INTO project_tech_stacks (project_id, tech_name, display_order)
SELECT p.id, t.tech_name, t.display_order
FROM projects p
JOIN (VALUES
  ('kalisco-kdh', 'Spring Boot', 1),
  ('kalisco-kdh', 'Java', 2),
  ('kalisco-kdh', 'MyBatis', 3),
  ('kalisco-kdh', 'PostgreSQL', 4),
  ('kalisco-kdh', 'Redis', 5),
  ('kalisco-kdh', 'Thymeleaf', 6),
  ('kalisco-kdh', 'jQuery', 7),
  ('kalisco-kdh', 'Bootstrap 5', 8),
  ('kalisco-kdh', 'OCI', 9),
  ('kalisco-kdh', 'Nginx', 10),
  ('kalisco-kdh', 'Google Gemini', 11),
  ('portfolio-site', 'Next.js', 1),
  ('portfolio-site', 'TypeScript', 2),
  ('portfolio-site', 'Tailwind CSS', 3),
  ('portfolio-site', 'MDX', 4),
  ('epigram-collaboration', 'React', 1),
  ('epigram-collaboration', 'TypeScript', 2),
  ('epigram-collaboration', 'Recharts', 3),
  ('epigram-collaboration', 'Toastify', 4),
  ('epigram-collaboration', 'Notion', 5),
  ('tripview', 'Next.js', 1),
  ('tripview', 'Tailwind CSS', 2),
  ('tripview', 'TypeScript', 3),
  ('tripview', 'Supabase', 4),
  ('tripview', 'React Query', 5),
  ('tripview', 'React Hook Form', 6),
  ('tripview', 'Zod', 7),
  ('wine-community', 'Next.js', 1),
  ('wine-community', 'Tailwind CSS', 2),
  ('wine-community', 'TypeScript', 3),
  ('wine-community', 'React Hook Form', 4),
  ('wine-community', 'React Query', 5),
  ('pecspert-aac', 'React Native', 1),
  ('pecspert-aac', 'React', 2),
  ('pecspert-aac', 'Expo', 3),
  ('pecspert-aac', 'React Hook Form', 4),
  ('pecspert-aac', 'TypeScript', 5),
  ('pecspert-aac', 'Firebase', 6)
) AS t(slug, tech_name, display_order) ON p.slug = t.slug;

-- 프로젝트 하이라이트
INSERT INTO project_highlights (project_id, content, display_order)
SELECT p.id, h.content, h.display_order
FROM projects p
JOIN (VALUES
  ('kalisco-kdh', '계층형 BOM 구조(item_type I/R)로 완제품·반제품·원자재를 DB 레벨에서 재귀적으로 관리, 제조업 Sub-Assembly 개념을 ''프렙 레시피''로 외식업에 적용', 1),
  ('kalisco-kdh', '@Transactional + 단가 이력 분리 설계(kdh_ingredient / kdh_ingredient_price)로 식자재 단가 변경 즉시 원가 일괄 반영 및 데이터 정합성 보장', 2),
  ('kalisco-kdh', '엑셀 업로드 실패 행 보관 → 운영자 수정 후 재시도 플로우 설계로 현장 데이터 정합성 운영 부담 감소', 3),
  ('kalisco-kdh', 'BOM 역추적(where-used) 기능으로 식자재 단가 변경 시 영향받는 레시피를 사전 파악 가능', 4),
  ('kalisco-kdh', 'Base + Override 이중 테이블 패턴으로 전사 기준 영업일과 매장별 예외를 분리, 데이터 중복 최소화', 5),
  ('kalisco-kdh', 'displayStatus 추상화로 전체 영업 / 전체 휴일 / 매장별 상이(△) 3단계 상태를 UI와 비즈니스 로직 분리하여 렌더링', 6),
  ('kalisco-kdh', 'Oracle Cloud + Nginx 리버스 프록시 + Let''s Encrypt SSL 인프라 직접 구성 및 Google Gemini 2.5 Flash AI 연동', 7),
  ('kalisco-kdh', 'Spring Scheduler + ShedLock 분산 락 배치 설계로 다중 인스턴스 환경에서의 중복 실행 방지', 8),
  ('pecspert-aac', '전역 설정값 일관성을 위해 Context API 기반 상태 관리 도입', 1),
  ('pecspert-aac', 'Expo Audio로 실시간 음성 미리듣기와 7단계 속도 조절 제공', 2),
  ('pecspert-aac', 'Firestore + AsyncStorage 이중 저장으로 다중 디바이스 동기화 및 오프라인 대응', 3),
  ('pecspert-aac', '디자이너·기획자와 협업하며 슬라이더·버튼 등 공용 컴포넌트 개발', 4),
  ('pecspert-aac', '태블릿 전용 UI를 비율 기반 레이아웃으로 전환해 모바일까지 대응', 5),
  ('pecspert-aac', '기기 해상도별 텍스트 크기 자동 조정 로직 구현으로 일관된 UX 확보', 6),
  ('pecspert-aac', '음성 설정 UI의 불필요한 리렌더링을 useMemo·useCallback으로 최적화', 7),
  ('pecspert-aac', '공통 UI 모듈화를 통해 코드 수정 범위 30% 이상 축소', 8),
  ('pecspert-aac', '구독권 시스템 이슈를 디자이너·프론트·백엔드 간 조율하여 일정 지연 방지', 9),
  ('pecspert-aac', '기능 범위와 기대치 정렬로 팀 의사결정과 전달 구조 안정화', 10),
  ('portfolio-site', '프로젝트·블로그·연락처를 한 곳에서 관리하도록 정보 구조(IA)를 재정비', 1),
  ('portfolio-site', 'MDX 기반 블로그 게시글 빌드 파이프라인을 구축해 마크다운만으로 글 작성 가능', 2),
  ('portfolio-site', '다크 모드 및 반응형 레이아웃을 Tailwind CSS 커스텀 프리셋으로 구성', 3),
  ('epigram-collaboration', 'Notion과 tldraw를 활용한 협업 문서화와 Git Flow, Vercel CI/CD 구성으로 빌드 오류 70% 이상 감소', 1),
  ('epigram-collaboration', 'PieChart와 리스트 UI를 기반으로 감정 데이터를 시각화하고 localStorage로 상태를 보존', 2),
  ('epigram-collaboration', 'Toastify 알림을 도입해 사용자 피드백 루프를 강화하고 감정 인식 효율 향상', 3),
  ('tripview', 'Supabase Auth와 createServerClient를 활용한 SSR 세션 동기화로 인증 일관성 확보', 1),
  ('tripview', '미들웨어 기반 라우팅 제어로 접근 권한 관리 및 보안 강화', 2),
  ('tripview', 'React Hook Form + Zod 조합으로 타입 안전한 폼 유효성 검사와 커스텀 훅 기반 상태 관리', 3),
  ('tripview', 'CSS 자동 주입 기능을 갖춘 js-toastify를 제작해 프레임워크 무관 토스트 시스템 구현', 4),
  ('wine-community', 'SSR/CSR 토큰 검증으로 인증되지 않은 사용자를 로그인 페이지로 리다이렉트해 보안 강화', 1),
  ('wine-community', '프로필 이미지 변경 시 URL.createObjectURL 미리보기로 UX 개선, 최종 저장 시에만 서버 요청', 2),
  ('wine-community', '내가 작성한 와인·리뷰 리스트를 제공하고 수정/삭제 시 로컬 상태를 즉시 반영해 새로고침 없는 UI 업데이트', 3),
  ('wine-community', 'IntersectionObserver 기반 무한 스크롤로 초기 로딩 시간 단축 및 점진적 데이터 로드', 4),
  ('wine-community', 'Skeleton UI와 로딩 스피너를 결합해 로딩 구간에서도 안정적인 사용자 경험 제공', 5),
  ('wine-community', '프로필 이미지·와인 카드 등 반복 UI를 공용 컴포넌트로 분리해 유지보수성과 일관성 향상', 6)
) AS h(slug, content, display_order) ON p.slug = h.slug;

-- ============================================================
-- 경험
-- ============================================================

INSERT INTO experiences (company, emoji, role, employment_type, period, summary, team, display_order) VALUES
(
  '스캇데이터관리',
  '💼',
  '프리랜서 개발자',
  '프리랜서',
  '2026.01 ~ 2026.05',
  '캘리스코 영업관리 시스템(FNB System) 교체 프로젝트 백엔드 개발을 담당했습니다.',
  '소규모 팀',
  1
),
(
  'PECSPERT',
  '🧩',
  '프론트엔드 개발자 / 인턴',
  '인턴',
  '2025.06 ~ 2025.07',
  '자폐 아동을 위한 AAC(보완대체의사소통) 앱 개발에 참여했습니다.',
  'FE 6명, BE 2명',
  2
),
(
  '김해바른병원',
  '🏥',
  '원무과 사원',
  '정규직',
  '2022.03 ~ 2024.06',
  '환자 응대 및 부서 간 협업을 통해 사용자 중심 사고와 커뮤니케이션 역량을 습득했습니다.',
  '원무과',
  3
);

INSERT INTO experience_tech_stacks (experience_id, tech_name, display_order)
SELECT e.id, t.tech_name, t.display_order
FROM experiences e
JOIN (VALUES
  ('스캇데이터관리', 'Java',        1),
  ('스캇데이터관리', 'Spring Boot', 2),
  ('스캇데이터관리', 'MyBatis',     3),
  ('스캇데이터관리', 'PostgreSQL',  4),
  ('PECSPERT', 'React Native', 1),
  ('PECSPERT', 'Expo',         2),
  ('PECSPERT', 'Firebase',     3),
  ('PECSPERT', 'TypeScript',   4)
) AS t(company, tech_name, display_order) ON e.company = t.company;

INSERT INTO experience_highlights (experience_id, title, display_order)
SELECT e.id, h.title, h.display_order
FROM experiences e
JOIN (VALUES
  ('스캇데이터관리', '영업일 관리',      1),
  ('스캇데이터관리', '목표매출 관리',    2),
  ('스캇데이터관리', '식자재/레시피 관리', 3),
  ('PECSPERT', '음성 설정 시스템', 1),
  ('PECSPERT', '반응형 전환',      2),
  ('PECSPERT', '렌더링 최적화',    3),
  ('PECSPERT', 'Tech PM',        4),
  ('김해바른병원', '주요 역할', 1)
) AS h(company, title, display_order) ON e.company = h.company;

INSERT INTO experience_highlight_details (highlight_id, content, display_order)
SELECT eh.id, d.content, d.display_order
FROM experience_highlights eh
JOIN (VALUES
  ('영업일 관리',      '기준/매장별 2단계 계층 구조 설계 및 전 매장 자동 동기화 로직 구현', 1),
  ('목표매출 관리',    '저장 프로시저 기반 UPSERT 처리, JSON 컬럼 파싱으로 월별 동적 테이블 렌더링', 1),
  ('식자재/레시피 관리', 'CRUD 및 이력 관리, 엑셀 업로드(3단계 플로우)/다운로드 기능 구현', 1),
  ('음성 설정 시스템', 'Context API로 전역 설정 관리, Firestore + AsyncStorage 병행으로 다중 디바이스 동기화 구현', 1),
  ('반응형 전환',      '태블릿 전용 앱을 모바일까지 지원하도록 비율 기반 레이아웃으로 전환', 1),
  ('렌더링 최적화',    'useMemo/useCallback 활용 렌더링 최적화, 코드 수정 범위 30% 이상 축소', 1),
  ('Tech PM',        'FE/BE/디자인 간 인식 차이 조율로 프로젝트 지연 방지', 1),
  ('주요 역할',       '환자 응대 및 부서 간 협업을 통해 사용자 중심 사고와 커뮤니케이션 역량 습득', 1),
  ('주요 역할',       '전산 프로그램 사용 경험을 통한 개발자 전환 계기', 2)
) AS d(highlight_title, content, display_order) ON eh.title = d.highlight_title;
