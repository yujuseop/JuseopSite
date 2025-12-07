interface Develop {
  id: string;
  title: string;
  description: string;
}

const DEVELOPS: Develop[] = [
  {
    id: "frontend",
    title: "프론트엔드 개발",
    description:
      "React.js를 이용한 프론트엔드 개발을 하며, javascript, typescript의 사용에 능숙합니다. Next.js와 더불어 React Library를 사용하여 개발을 합니다.",
  },
  {
    id: "communication",
    title: "커뮤니케이션 및 협업",
    description:
      "Github를 이용한 협업을 하며, notion 등의 협업 도구 사용도 가능합니다. 팀 협업 원칙을 준수하며, 커뮤니케이션을 중요시합니다.",
  },
];

export default function Develop() {
  return (
    <section className="flex flex-col gap-4 justify-center items-center">
      <h2 className="text-xl lg:text-2xl font-bold text-blue-600">
        핵심 역량{" "}
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
