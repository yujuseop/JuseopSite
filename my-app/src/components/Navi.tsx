import Link from "next/link";

const NAV_ITEMS = [
  { id: "skills", label: "기술", description: "사용 기술과 도구" },
  { id: "experience", label: "경력", description: "실무 경험과 역할" },
  { id: "projects", label: "프로젝트", description: "대표 프로젝트" },
  { id: "journey", label: "기록과 성장", description: "블로그 · 트러블슈팅" },
] as const;

export default function Navi() {
  return (
    <nav
      aria-label="페이지 내 탐색"
      className="sticky top-6 z-40 w-full rounded-2xl border border-border flex justify-center items-center bg-white/70 p-4 shadow-sm backdrop-blur dark:bg-slate-900/70"
    >
      <ul className="flex flex-wrap items-center gap-3 text-sm font-medium">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <Link
              href={`/#${item.id}`}
              className="group inline-flex text-center items-center gap-2 rounded-full border border-transparent bg-white px-4 py-2 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 dark:bg-slate-900 dark:hover:border-blue-500/60 dark:hover:bg-slate-800/80"
            >
              <span className="font-semibold text-foreground  text-sm lg:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {item.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
