import type { SkillCategory } from "@/types/api";

interface Props {
  categories: SkillCategory[];
}

function StarLevel({ level }: { level: number }) {
  return (
    <span className="text-yellow-400 text-sm">
      {"⭐".repeat(level)}
      <span className="text-muted-foreground/30">{"⭐".repeat(3 - level)}</span>
    </span>
  );
}

const WORKING_STYLE = [
  {
    title: "커뮤니케이션",
    quote: "가능한 것과 어려운 것을 설명하고, 반드시 대안을 제시합니다.",
    lines: [
      "개발 불가능한 요구사항을 단순히 거절하지 않습니다.",
      "현업의 목적을 파악하고, 기술적으로 실현 가능한 대안을 함께 찾아갑니다.",
    ],
  },
  {
    title: "팔로워십",
    quote: "팀의 목표를 위해 헌신하는 협업자입니다.",
    lines: [
      "개인의 성과보다 팀 전체의 목표 달성을 우선시합니다.",
      "리더의 방향성을 이해하고, 그 안에서 최선의 실행을 고민합니다.",
    ],
  },
];

export default function Skills({ categories }: Props) {
  return (
    <section className="space-y-10">
      <header className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-blue-600">
          기술 스택 및 워크 스타일
        </h2>
        <p className="text-sm text-muted-foreground lg:text-base">
          주요 기술 스택 과 워크 스타일을 소개합니다.
        </p>
      </header>

      {/* Tech Stack 테이블 */}
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <article
            key={category.id}
            className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <header className="space-y-0.5">
              <h3 className="text-lg font-semibold lg:text-xl">
                {category.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {category.description}
              </p>
            </header>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="pb-2 text-left font-medium w-1/3">기술</th>
                  <th className="pb-2 text-left font-medium w-1/4">수준</th>
                  <th className="pb-2 text-left font-medium">설명</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {category.skills.map((skill, i) => (
                  <tr key={`${category.id}-${skill.name ?? i}`}>
                    <td className="py-2 font-medium text-foreground pr-2">
                      {skill.name}
                    </td>
                    <td className="py-2 pr-2 whitespace-nowrap">
                      <StarLevel level={skill.level} />
                    </td>
                    <td className="py-2 text-muted-foreground text-xs leading-relaxed">
                      {skill.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        ))}
      </div>

      {/* Working Style */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-center">💡 Working Style</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {WORKING_STYLE.map((item) => (
            <article
              key={item.title}
              className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h4 className="text-base font-semibold">{item.title}</h4>
              <blockquote className="border-l-4 border-blue-500 pl-4 text-sm italic text-muted-foreground">
                {item.quote}
              </blockquote>
              <ul className="space-y-1">
                {item.lines.map((line) => (
                  <li
                    key={line}
                    className="text-sm text-muted-foreground before:content-['·'] before:mr-2"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
