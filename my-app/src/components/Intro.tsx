export default function Intro() {
  return (
    <section className="flex flex-col items-center justify-center px-4 text-center text-2xl gap-4">
      <h1>Welcome to the Yujuseop Dev Site</h1>
      <p>
        안녕하세요! 저는{" "}
        <strong className="text-blue-600"> 프론트엔드 개발자 유주섭</strong>
        입니다. 사용자 경험을 더 좋게 만들기 위해 항상 고민하고, 더 나은 코드를
        향해 끊임없이 성장하는 중이에요.
      </p>
      <p>
        언제든지{" "}
        <span className="uderline decoration-dashed">
          이메일로 편하게 연락 주세요!{" "}
        </span>
        좋은 기회가 된다면 <strong>직접 만나서 커피 한잔</strong>, 그리고{" "}
        <strong>개발 이야기</strong>를 함께 나누면 정말 좋겠어요!
      </p>
      <p>제 페이지에 와주신 여러분 좋은 하루 되시길 바랍니다!</p>
      <p>감사합니다!</p>
      <a
        href="mailto:juseop159@gmail.com"
        className="inline-block py-3 px-6 rounded full transition"
      >
        이메일 보내기
      </a>
    </section>
  );
}
