import Link from "next/link";

const CARDS = [
  {
    href: "/about",
    emoji: "👋",
    title: "소개",
    description: "저는 누구인지, 어떤 개발자인지 소개합니다.",
    rotate: "-rotate-2",
    color: "bg-yellow-50 dark:bg-yellow-900/40",
    pin: "bg-gradient-to-br from-red-300 to-red-700",
  },
  {
    href: "/skills",
    emoji: "🛠️",
    title: "기술 스택",
    description: "주로 사용하는 기술과 도구를 확인하세요.",
    rotate: "rotate-1",
    color: "bg-sky-50 dark:bg-sky-900/40",
    pin: "bg-gradient-to-br from-blue-300 to-blue-700",
  },
  {
    href: "/career",
    emoji: "💼",
    title: "경력",
    description: "실무에서 쌓은 경험과 역할을 소개합니다.",
    rotate: "-rotate-1",
    color: "bg-green-50 dark:bg-green-900/40",
    pin: "bg-gradient-to-br from-green-300 to-green-700",
  },
  {
    href: "/projects",
    emoji: "🚀",
    title: "프로젝트",
    description: "대표 프로젝트와 주요 기여를 확인하세요.",
    rotate: "rotate-2",
    color: "bg-pink-50 dark:bg-pink-900/40",
    pin: "bg-gradient-to-br from-pink-300 to-pink-700",
  },
  {
    href: "/blog",
    emoji: "📝",
    title: "블로그",
    description: "학습 기록과 인사이트를 담은 글들입니다.",
    rotate: "-rotate-1",
    color: "bg-purple-50 dark:bg-purple-900/40",
    pin: "bg-gradient-to-br from-purple-300 to-purple-700",
  },
  {
    href: "/troubleShooting",
    emoji: "🧠",
    title: "트러블슈팅",
    description: "프로젝트에서 마주한 문제와 해결 과정입니다.",
    rotate: "rotate-1",
    color: "bg-orange-50 dark:bg-orange-900/40",
    pin: "bg-gradient-to-br from-orange-300 to-orange-700",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10 py-8">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-blue-600 lg:text-4xl">
          welcome to my note space
        </h1>
        <p className="text-sm text-muted-foreground lg:text-base">
          코드로 기록하고, 기술로 소통하는 공간에 오신 것을 환영합니다.
        </p>
      </header>

      {/* 코르크보드 */}
      <div
        className="w-full max-w-4xl rounded-xl p-10"
        style={{
          background:
            "linear-gradient(135deg, #c9a96e 0%, #b8905a 25%, #c5a468 50%, #b08040 75%, #c9a96e 100%)",
          border: "14px solid #7a5230",
          boxShadow:
            "inset 0 2px 8px rgba(0,0,0,0.3), 0 10px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* 핀이 보드 밖으로 나오므로 상단 여백 확보 */}
        <div className="grid grid-cols-1 gap-10 pt-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={[
                "group relative flex flex-col gap-3 rounded-sm p-6",
                "shadow-[3px_3px_10px_rgba(0,0,0,0.3)]",
                "transition-all duration-200 ease-out",
                "hover:rotate-0 hover:scale-105 hover:z-10",
                "hover:shadow-[6px_6px_20px_rgba(0,0,0,0.4)]",
                card.rotate,
                card.color,
              ].join(" ")}
            >
              {/* 핀 */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center drop-shadow-md">
                <div
                  className={`h-5 w-5 rounded-full ring-1 ring-black/20 ${card.pin}`}
                />
                <div className="h-3 w-[3px] rounded-b bg-gradient-to-b from-gray-400 to-gray-600" />
              </div>

              <span className="mt-1 text-3xl">{card.emoji}</span>
              <div className="space-y-1">
                <h2 className="text-base font-bold text-gray-800 group-hover:text-blue-600 lg:text-lg dark:text-gray-100 dark:group-hover:text-blue-400">
                  {card.title}
                </h2>
                <p className="text-xs text-gray-600 lg:text-sm dark:text-gray-400">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
