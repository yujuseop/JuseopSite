import Intro from "@/components/Intro";
import Develop from "@/components/Develop";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 py-10">
      <section className="flex flex-col items-center justify-center gap-6 text-center md:flex-row md:text-left">
        <Intro />
      </section>
      <section>
        <Develop />
      </section>
    </div>
  );
}
