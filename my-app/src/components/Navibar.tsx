import Link from "next/link";

const NAV_LINKS = [
  {
    href: "/blog",
    label: "블로그로 이동",
    description: "학습 기록과 인사이트를 담은 글들을 만나보세요.",
    emoji: "📝",
    cta: "블로그 열기",
  },
  {
    href: "/troubleShooting",
    label: "트러블슈팅 살펴보기",
    description: "프로젝트에서의 문제 해결 과정을 단계별로 정리했습니다.",
    emoji: "🧠",
    cta: "트러블슈팅 보기",
  },
] as const;

export default function Navibar() {
  return (
    <section className="flex flex-col justify-center items-center gap-1 ">
      <header className="mb-6 space-y-2 text-center">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-300 lg:text-2xl">
          기록과 성장의 여정
        </h2>
        <p className="text-sm text-muted-foreground lg:text-base">
          블로그와 트러블슈팅 페이지에서 문제 해결 과정과 배움을 확인해보세요.
        </p>
      </header>

      <nav className="grid gap-4 md:grid-cols-2">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-4 rounded-2xl border border-transparent bg-white/70 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:bg-slate-900/60 dark:hover:border-blue-500/60"
            aria-label={link.label}
          >
            <span className="text-3xl" aria-hidden>
              {link.emoji}
            </span>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {link.label}
                </h3>
                <span className="text-sm font-medium text-blue-600 transition group-hover:translate-x-1 dark:text-blue-400">
                  {link.cta} →
                </span>
              </div>
              <p className="text-xs text-muted-foreground lg:text-sm">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </nav>
    </section>
  );
}
