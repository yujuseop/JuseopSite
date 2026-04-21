interface Develop {
  id: string;
  title: string;
  description: string;
}

const DEVELOPS: Develop[] = [
  {
    id: "empathy",
    title: "공감 (Empathy)",
    description:
      "병원 원무과 현장에서 쌓은 경험을 바탕으로 기술 그 이상의 사람 중심 시각을 갖췄습니다. 사용자의 숨겨진 니즈를 파악하여 요구사항을 정확히 정의합니다.",
  },
  {
    id: "coordination",
    title: "조율 (Coordination)",
    description:
      "기술과 현업의 언어를 모두 이해하는 연결자입니다. 다양한 이해관계자 사이에서 타협점을 찾고, 원활한 협업을 이끌어 기술적 해답을 도출합니다.",
  },
  {
    id: "action",
    title: "실행 (Action)",
    description:
      "비효율적인 수기 업무를 발견하면 직접 코드로 해결합니다. 실행력을 바탕으로 시스템 자동화를 구현하여 팀의 생산성을 극대화합니다.",
  },
  {
    id: "tech",
    title: "기술적 역량",
    description:
      "Java, Spring Boot, PostgreSQL을 활용한 견고한 백엔드 아키텍쳐와 React, Next.js, TypeScript기반의 사용자 중심의 프론트엔드를 모두 다룹니다. 데이터부터 인터페이스까지 전체 흐름을 설계합니다.",
  },
];

export default function Develop() {
  return (
    <section className="flex flex-col gap-4 justify-center items-center">
      <h2 className="text-xl lg:text-2xl font-bold text-blue-600">
        나를 정의하는 아이덴티티{" "}
      </h2>
      <p className="text-sm lg:text-base font-bold">
        소통을 중요시하고, 협업을 중요시하며, 항상 성장하는 개발자입니다.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {DEVELOPS.map((develop) => (
          <article
            key={develop.id}
            className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <header className="space-y-1">
              <h3 className="text-lg font-semibold lg:text-xl">
                {develop.title}
              </h3>
              <p className="text-sm text-muted-foreground lg:text-base">
                {develop.description}
              </p>
            </header>
          </article>
        ))}
      </div>
    </section>
  );
}
