import Image from "next/image";
import Intro from "@/components/Intro";
import Develop from "@/components/Develop";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 py-10">
      <section className="flex flex-col items-center justify-center gap-6 text-center md:flex-row md:text-left">
        <Image
          src="/assets/yujuseop.jpeg"
          alt="유주섭 증명사진"
          width={220}
          height={220}
          className="h-40 w-40 rounded-full border-2 border-blue-200 object-cover shadow-lg md:h-52 md:w-52"
        />
        <Intro />
      </section>

      <section>
        <Develop />
      </section>
    </div>
  );
}
