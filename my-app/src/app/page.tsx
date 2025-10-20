import Intro from "@/components/Intro";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col-reverse items-center justify-center lg:flex-row gap-4">
      <section>
        <Intro />
      </section>
      <section className="flex justify-center items-center">
        <Image
          src="/assets/yujuseop.jpeg"
          alt="유주섭 증명사진"
          width={300}
          height={300}
          className="rounded-full object-cover border-2 border-gray-300 mb-4 lg:mb-0 w-1/2 h-1/2 lg:w-full lg:h-full"
        />
      </section>
    </main>
  );
}
