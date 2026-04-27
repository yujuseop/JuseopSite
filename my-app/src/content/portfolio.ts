export interface SkillCategoryContent {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategoryContent[] = [
  {
    id: "tech",
    title: "기술",
    description: "기본 언어 및 핵심 프론트엔드 역량",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Next.js",
    ],
  },
  {
    id: "library",
    title: "라이브러리",
    description: "주로 사용하는 프론트엔드 라이브러리",
    skills: ["React", "Tanstack Query", "React Hook Form", "Zustand"],
  },
  {
    id: "infra",
    title: "환경 및 배포",
    description: "서비스 운영과 배포 환경",
    skills: ["Supabase", "Vercel", "Vite", "Webpack"],
  },
  {
    id: "collaboration",
    title: "협업 도구",
    description: "디자인 협업 및 프로토타이핑 도구",
    skills: ["Figma", "Notion", "Cursor", "GitHub"],
  },
];

export interface ProjectContent {
  slug: string;
  emoji: string;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  highlights: string[];
  participants: string;
  duration: string;
  links?: {
    demo?: string;
    repo?: string;
  };
}

export const PROJECTS: ProjectContent[] = [
  {
    slug: "kalisco-kdh",
    emoji: "🍽️",
    title: "Kalisco — KDH 외식업 통합 운영 관리 플랫폼",
    summary:
      "수기·엑셀에 의존하던 외식업 다점포의 메뉴 원가 관리와 영업일 관리를 디지털화한 풀스택 백오피스 플랫폼입니다.",
    description:
      "제조업의 BOM(Bill of Materials) 개념을 외식업 레시피 원가 관리에 도입해, 식자재 단가 변동이 전체 레시피에 즉시 반영되는 구조를 설계했습니다. 전사 기준 캘린더와 매장별 예외를 이중 테이블로 분리해 다점포 영업일을 효율적으로 관리합니다.",
    techStack: [
      "Spring Boot",
      "Java",
      "MyBatis",
      "PostgreSQL",
      "Redis",
      "Thymeleaf",
      "jQuery",
      "Bootstrap 5",
      "Nginx",
    ],
    highlights: [
      "계층형 BOM 구조(item_type I/R)로 완제품·반제품·원자재를 DB 레벨에서 재귀적으로 관리, 제조업 Sub-Assembly 개념을 '프렙 레시피'로 외식업에 적용",
      "@Transactional + 단가 이력 분리 설계(kdh_ingredient / kdh_ingredient_price)로 식자재 단가 변경 즉시 원가 일괄 반영 및 데이터 정합성 보장",
      "엑셀 업로드 실패 행 보관 → 운영자 수정 후 재시도 플로우 설계로 현장 데이터 정합성 운영 부담 감소",
      "BOM 역추적(where-used) 기능으로 식자재 단가 변경 시 영향받는 레시피를 사전 파악 가능",
      "Base + Override 이중 테이블 패턴으로 전사 기준 영업일과 매장별 예외를 분리, 데이터 중복 최소화",
      "displayStatus 추상화로 전체 영업 / 전체 휴일 / 매장별 상이(△) 3단계 상태를 UI와 비즈니스 로직 분리하여 렌더링",
      "Spring Scheduler + ShedLock 분산 락 배치 설계로 다중 인스턴스 환경에서의 중복 실행 방지",
    ],
    participants: "소규모 팀 (2~3인) · 풀스택",
    duration: "진행 중",
  },
  {
    slug: "pecspert-aac",
    emoji: "🧩",
    title: "PECSPERT — AAC 보완대체의사소통 앱",
    summary:
      "발화에 어려움이 있는 자폐 아동을 위한 AAC 앱을 개발했습니다. 단어 카드를 선택하면 음성으로 출력되어 감정과 욕구를 자연스럽게 전달할 수 있도록 돕는 서비스입니다.",
    description:
      "음성 설정과 기기별 사용성을 개선한 React Native 기반 AAC 프로젝트입니다. 전역 상태 관리와 이중 저장 구조를 적용해 다중 디바이스 동기화와 오프라인 사용성을 함께 고려했습니다.",
    techStack: [
      "React Native",
      "React",
      "Expo",
      "React Hook Form",
      "TypeScript",
      "Firebase",
    ],
    highlights: [
      "전역 설정값 일관성을 위해 Context API 기반 상태 관리 도입",
      "Expo Audio로 실시간 음성 미리듣기와 7단계 속도 조절 제공",
      "Firestore + AsyncStorage 이중 저장으로 다중 디바이스 동기화 및 오프라인 대응",
      "디자이너·기획자와 협업하며 슬라이더·버튼 등 공용 컴포넌트 개발",
      "Tech PM 역할로 구독권 시스템 이슈를 디자이너·프론트·백엔드 간 조율",
    ],
    participants: "팀 프로젝트 · FE 6명, BE 2명",
    duration: "2025.06 ~ 2025.08",
  },
  {
    slug: "epigram-collaboration",
    emoji: "🤝",
    title: "Epigram 협업 프로세스 최적화",
    summary:
      "협업 체계 재정비와 UI 개선으로 빌드 오류를 70% 이상 줄이고 감정 인식 효율을 높인 프로젝트입니다.",
    description:
      "협업 문서화 체계 구축과 자동화된 배포 파이프라인을 정비해 팀 생산성을 높였고, 감정 인식 인터페이스를 개선해 사용자 만족도를 끌어올렸습니다.",
    techStack: ["React", "TypeScript", "Recharts", "Toastify", "Notion"],
    highlights: [
      "Notion과 tldraw를 활용한 협업 문서화와 Git Flow, Vercel CI/CD 구성으로 빌드 오류 70% 이상 감소",
      "PieChart와 리스트 UI를 기반으로 감정 데이터를 시각화하고 localStorage로 상태를 보존",
      "Toastify 알림을 도입해 사용자 피드백 루프를 강화하고 감정 인식 효율 향상",
    ],
    participants: "팀 프로젝트 (FE6명)",
    duration: "2025.03 ~ 2025.04",
    links: {
      demo: "https://fe-12-team5-coworkers.vercel.app/",
      repo: "https://github.com/yujuseop/FE12_Team5_epigram", // 필요 시 실제 저장소로 교체
    },
  },
  {
    slug: "tripview",
    emoji: "🌍",
    title: "TripView 여행 리뷰 플랫폼",
    summary:
      "여행을 기록하고 리뷰를 남길 수 있는 플랫폼으로, 일정별 여행지를 관리하고 공개/비공개를 전환할 수 있습니다.",
    description:
      "Next.js와 Supabase를 기반으로 인증부터 데이터 관리까지 한 생태계에서 처리하며, 폼 검증과 토스트 시스템을 직접 설계해 사용자 경험을 높였습니다.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Supabase",
      "React Query",
      "React Hook Form",
      "Zod",
    ],
    highlights: [
      "Supabase Auth와 createServerClient를 활용한 SSR 세션 동기화로 인증 일관성 확보",
      "미들웨어 기반 라우팅 제어로 접근 권한 관리 및 보안 강화",
      "React Hook Form + Zod 조합으로 타입 안전한 폼 유효성 검사와 커스텀 훅 기반 상태 관리",
      "CSS 자동 주입 기능을 갖춘 js-toastify를 제작해 프레임워크 무관 토스트 시스템 구현",
    ],
    participants: "개인 프로젝트",
    duration: "2025.09 ~ 2025.10 (2주)",
    links: {
      demo: "https://trip-review-site.vercel.app/",
      repo: "https://github.com/yujuseop/TripReviewSite",
    },
  },
];
