import Intro from "@/components/Intro";
import Image from "next/image";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Develop from "@/components/Develop";
import Experience from "@/components/Experience";
import Navibar from "@/components/Navibar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <section className="flex justify-center items-center">
        <Image
          src="/assets/yujuseop.jpeg"
          alt="유주섭 증명사진"
          width={200}
          height={200}
          className="rounded-full object-cover border-2 border-gray-300 mb-4 lg:mb-0 w-1/2 h-1/2 lg:w-full lg:h-full"
        />
      </section>
      <section>
        <Intro />
      </section>
      <section>
        <Develop />
      </section>

      <section>
        <Skills />
      </section>
      <section>
        <Experience />
      </section>
      <section>
        <Projects />
      </section>
      <section>
        <Navibar />
      </section>
    </main>
  );
}
