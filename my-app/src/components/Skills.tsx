import { SKILL_CATEGORIES } from "@/content/portfolio";

export default function Skills() {
  return (
    <section className="space-y-6">
      <header className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-blue-600">기술 스택 및 도구</h2>
        <p className="text-sm text-muted-foreground lg:text-base">
          주요 기술 스택 및 도구를 소개합니다.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {SKILL_CATEGORIES.map((category) => (
          <article
            key={category.id}
            className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <header className="space-y-1">
              <h3 className="text-lg font-semibold lg:text-xl">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground lg:text-base">
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
