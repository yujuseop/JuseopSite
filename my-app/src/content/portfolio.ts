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
];
