import Image from "next/image";

import Develop from "@/components/Develop";
import Experience from "@/components/Experience";
import Intro from "@/components/Intro";
import Navi from "@/components/Navi";
import Navibar from "@/components/Navibar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white via-white to-blue-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-5 pb-16 pt-10">
        <Navi />

        <section
          id="intro"
          className="flex flex-col items-center justify-center gap-6 scroll-mt-24 pb-28 text-center md:flex-row md:text-left"
        >
          <Image
            src="/assets/yujuseop.jpeg"
            alt="유주섭 증명사진"
            width={220}
            height={220}
            className="h-40 w-40 rounded-full border-2 border-blue-200 object-cover shadow-lg md:h-52 md:w-52"
          />
          <Intro />
        </section>

        <section id="develop" className="scroll-mt-24 pb-28">
          <Develop />
        </section>

        <section id="skills" className="scroll-mt-24 pb-28">
          <Skills />
        </section>

        <section id="experience" className="scroll-mt-24 pb-28">
          <Experience />
        </section>

        <section id="projects" className="scroll-mt-24 pb-28">
          <Projects />
        </section>

        <section id="journey" className="scroll-mt-24 pb-28">
          <Navibar />
        </section>
      </div>
    </main>
  );
}
