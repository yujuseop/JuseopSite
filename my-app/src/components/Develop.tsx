export default function Develop() {
  return (
    <section className="flex flex-col gap-4 justify-center items-center">
      <h2 className="text-xl font-bold text-blue-600">핵심 역량 </h2>
      <p className="text-lg font-bold">
        소통을 중요시하고, 협업을 중요시하며, 항상 성장하는 개발자입니다.
      </p>
      <div className="flex p-4 gap-4">
        <ul>
          <li className="font-bold text-xl">프론트엔드 개발</li>
          <p>
            React.js를 이용한 프론트엔드 개발을 하며, javascript, typescript의
            사용에 능숙합니다. <br /> Next.js와 더불어 React Library를 사용하여
            개발을 합니다.
          </p>
        </ul>
        <ul>
          <li className="font-bold text-xl">커뮤니케이션 및 협업</li>
          <p>
            Github를 이용한 협업을 하며, notion 등의 협업 도구 사용도
            가능합니다. <br /> 팀 협업 원칙을 준수하며, 커뮤니케이션을
            중요시합니다.
          </p>
        </ul>
      </div>
    </section>
  );
}
