import Intro from "@/components/Intro";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section>
        <Intro />
      </section>
      <section className="flex justify-center items-center">
        <Image
          src="/assets/yujuseop.jpeg"
          alt="유주섭 증명사진"
          width={300}
          height={300}
          className="rounded-full object-cover"
        />
      </section>
    </main>
  );
}
