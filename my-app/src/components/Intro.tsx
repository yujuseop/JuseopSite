import Link from "next/link";

export default function Intro() {
  return (
    <section className="flex flex-col justify-center text-center px-4  gap-4 ">
      <p className="font-bold text-xl lg:text-3xl">
        안녕하세요!
        <strong className="text-blue-600"> 프론트엔드 개발자 유주섭</strong>
        입니다. <br />
      </p>
      <p className="text-sm lg:text-xl">
        사용자 경험을 더 좋게 만들기 위해 항상 고민하고, 더 나은 코드를 향해
        끊임없이 달려나가고 있습니다.
      </p>
      <div className="flex justify-center">
        <Link
          href="mailto:juseop159@gmail.com"
          target="_blank"
          className="inline-block p-3 m-3 rounded text-xs full transition border lg:text-sm border-black dark:border-white"
        >
          이메일 보내기 ✉️
        </Link>
        <a
          href="/assets/유주섭 이력서.pdf"
          target="_blank"
          className="inline-block p-3 m-3 rounded text-xs full transition border lg:text-sm border-black dark:border-white"
        >
          이력서 다운로드 ↓
        </a>
      </div>
    </section>
  );
}
