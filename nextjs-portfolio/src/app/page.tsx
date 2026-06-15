import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
    </div>
  );
}
