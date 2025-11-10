type SkillCategory = {
  id: string;
  label: string;
  description: string;
  skills: string[];
};

const CATEGORIES: SkillCategory[] = [
  {
    id: "tech",
    label: "기술",
    description: "기본 언어 및 핵심 프론트엔드 역량",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "library",
    label: "라이브러리",
    description: "주로 사용하는 프론트엔드 라이브러리",
    skills: [
      "React",
      "Next.js",
      "Tanstack Query",
      "React Hook Form",
      "Zustand",
    ],
  },
  {
    id: "infra",
    label: "환경 및 배포",
    description: "서비스 운영과 배포 환경",
    skills: ["Supabase", "Vercel", "Vite", "Webpack"],
  },
  {
    id: "collaboration",
    label: "협업 도구",
    description: "디자인 협업 및 프로토타이핑 도구",
    skills: ["Figma", "notion", "cursor", "Github"],
  },
];

export default function Skills() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold">기술 스택 및 도구</h2>
        <p className="text-sm text-muted-foreground">
          주요 기술 스택 및 도구를 소개합니다.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {CATEGORIES.map((category) => (
          <article
            key={category.id}
            className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <header className="space-y-1">
              <h3 className="text-lg font-semibold">{category.label}</h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </header>
            <ul className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li
                  key={`${category.id}-${skill}`}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
