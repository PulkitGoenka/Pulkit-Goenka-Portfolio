import Hero from "@/sections/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import About from "@/sections/About";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <Marquee />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
