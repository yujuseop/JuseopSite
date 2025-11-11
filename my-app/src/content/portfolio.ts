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
    slug: "portfolio-site",
    emoji: "🚀",
    title: "개인 포트폴리오 사이트",
    summary:
      "Next.js와 Tailwind CSS로 구축한 반응형 포트폴리오, 다크 모드와 블로그를 지원합니다.",
    description:
      "디자인 시스템과 콘텐츠 관리를 효율적으로 적용하기 위해 Next.js 15 App Router를 활용해 설계한 개인 포트폴리오입니다.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    highlights: [
      "프로젝트·블로그·연락처를 한 곳에서 관리하도록 정보 구조(IA)를 재정비",
      "MDX 기반 블로그 게시글 빌드 파이프라인을 구축해 마크다운만으로 글 작성 가능",
      "다크 모드 및 반응형 레이아웃을 Tailwind CSS 커스텀 프리셋으로 구성",
    ],
    participants: "개인 프로젝트",
    duration: "2024.09 ~ 2024.10",
    links: {
      demo: "https://juseopsite.vercel.app/",
      repo: "https://github.com/yujuseop/JuseopSite",
    },
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
  {
    slug: "wine-community",
    emoji: "🍷",
    title: "WINE 커뮤니티 플랫폼",
    summary:
      "와인을 탐색하고 애호가들이 소통할 수 있는 웹 애플리케이션으로, 검색·필터·리뷰 기능을 제공해 맞춤형 와인 관리와 커뮤니티 경험을 지원합니다.",
    description:
      "Next.js 기반으로 와인 데이터 탐색과 커뮤니티 기능을 통합하고, 인증·프로필 관리·무한 스크롤 등 사용자 중심 UX를 구축했습니다.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "React Hook Form",
      "React Query",
    ],
    highlights: [
      "SSR/CSR 토큰 검증으로 인증되지 않은 사용자를 로그인 페이지로 리다이렉트해 보안 강화",
      "프로필 이미지 변경 시 URL.createObjectURL 미리보기로 UX 개선, 최종 저장 시에만 서버 요청",
      "내가 작성한 와인·리뷰 리스트를 제공하고 수정/삭제 시 로컬 상태를 즉시 반영해 새로고침 없는 UI 업데이트",
      "IntersectionObserver 기반 무한 스크롤로 초기 로딩 시간 단축 및 점진적 데이터 로드",
      "Skeleton UI와 로딩 스피너를 결합해 로딩 구간에서도 안정적인 사용자 경험 제공",
      "프로필 이미지·와인 카드 등 반복 UI를 공용 컴포넌트로 분리해 유지보수성과 일관성 향상",
    ],
    participants: "팀 프로젝트 (FE 6명)",
    duration: "2025.01 ~ 2025.02 (2주)",
    links: {
      demo: "https://project-team2-wine.vercel.app/",
      repo: "https://github.com/yujuseop/Project-Team2-WINE",
    },
  },
];

export interface ExperienceHighlight {
  title: string;
  details: string[];
}

export interface ExperienceContent {
  company: string;
  emoji: string;
  role: string;
  employmentType: string;
  period: string;
  summary: string;
  techStack: string[];
  team: string;
  highlights: ExperienceHighlight[];
}

export const EXPERIENCES: ExperienceContent[] = [
  {
    company: "PECSPERT",
    emoji: "🧩",
    role: "프론트엔드 인턴",
    employmentType: "인턴",
    period: "2025.06 ~ 2025.08",
    summary:
      "발화에 어려움이 있는 자폐 아동을 위한 보완대체의사소통(AAC) 앱을 개발했습니다. 단어 카드를 선택하면 음성으로 출력되어 감정과 욕구를 자연스럽게 전달할 수 있도록 돕는 서비스입니다.",
    techStack: [
      "React Native",
      "React",
      "Expo",
      "React Hook Form",
      "TypeScript",
    ],
    team: "팀 프로젝트 · FE 6명, BE 2명",
    highlights: [
      {
        title: "발화 아동 지원을 위한 음성 시스템 고도화",
        details: [
          "전역 설정값 일관성을 위해 Context API 기반 상태 관리 도입",
          "Expo Audio로 실시간 음성 미리듣기와 7단계 속도 조절 제공",
          "Firestore + AsyncStorage 이중 저장으로 다중 디바이스 동기화 및 오프라인 대응",
        ],
      },
      {
        title: "디자인 시스템 구축 및 반응형 확장",
        details: [
          "디자이너·기획자와 협업하며 슬라이더·버튼 등 공용 컴포넌트 개발",
          "태블릿 전용 UI를 비율 기반 레이아웃으로 전환해 모바일까지 대응",
          "기기 해상도별 텍스트 크기 자동 조정 로직 구현으로 일관된 UX 확보",
        ],
      },
      {
        title: "성능 최적화와 유지보수성 향상",
        details: [
          "음성 설정 UI의 불필요한 리렌더링을 useMemo·useCallback으로 최적화",
          "공통 UI 모듈화를 통해 코드 수정 범위 30% 이상 축소",
        ],
      },
      {
        title: "Tech PM 역할로 협업 프로세스 조율",
        details: [
          "구독권 시스템 이슈를 디자이너·프론트·백엔드 간 조율하여 일정 지연 방지",
          "기능 범위와 기대치 정렬로 팀 의사결정과 전달 구조 안정화",
        ],
      },
    ],
  },
];
