import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, FolderKanban } from "lucide-react";
import { scrollToSection } from "@/lib/api";
import { DoodleStar, DoodleBolt, DoodleCrown, DoodleSquiggle } from "@/components/Doodles";
import { SOCIALS } from "@/components/Footer";

const HERO_IMG = "/img/hero-character.png";

function Reveal({ children, delay = 0 }) {
  return (
    <span className="reveal-mask">
      <motion.span 
        className="block" 
        initial={{ y: "110%" }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const SOCIAL_ITEMS = [
  { key: "github", icon: Github, href: SOCIALS.github, label: "GitHub" },
  { key: "linkedin", icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
  { key: "mail", icon: Mail, href: `mailto:${SOCIALS.email}`, label: "Email" },
];

export default function Hero() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 16 });
  const sy = useSpring(my, { stiffness: 60, damping: 16 });
  const charX = useTransform(sx, (v) => v * 22);
  const charY = useTransform(sy, (v) => v * 16);
  const doodleX = useTransform(sx, (v) => v * -30);
  const doodleY = useTransform(sy, (v) => v * -20);

  const onMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="home" ref={ref} onMouseMove={onMouseMove} data-testid="hero-section" className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24">
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-neon-purple/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-neon-green/10 blur-[130px] pointer-events-none" />

      <motion.div style={{ x: doodleX, y: doodleY }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <DoodleStar className="absolute top-[16%] left-[5%] w-10 h-10 text-neon-yellow animate-float" />
        <DoodleStar className="absolute bottom-[22%] left-[42%] w-6 h-6 text-neon-pink animate-float" />
        <DoodleBolt className="absolute top-[26%] right-[6%] w-12 h-12 text-neon-cyan animate-float" />
        <DoodleBolt className="absolute bottom-[14%] left-[8%] w-8 h-8 text-neon-purple animate-float" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center relative z-10 w-full">
        <div>
          <Reveal delay={0.05}>
            <p className="font-display text-2xl md:text-3xl text-neon-pink -rotate-2 w-fit">Hey, I'm</p>
          </Reveal>

          <div className="relative mt-1">
            <DoodleCrown className="absolute -top-9 left-1 w-12 h-12 text-neon-yellow -rotate-12" />
            <h1 className="font-display leading-[0.85] text-white">
              <Reveal delay={0.15}>
                <span className="block text-[18vw] sm:text-8xl lg:text-[8.5rem]">PULKIT</span>
              </Reveal>
              <Reveal delay={0.3}>
                <span className="block text-[18vw] sm:text-8xl lg:text-[8.5rem] text-neon-green">GOENKA</span>
              </Reveal>
            </h1>
          </div>

          <Reveal delay={0.45}>
            <p className="mt-5 font-display text-2xl md:text-4xl">Full Stack Developer</p>
            <DoodleSquiggle className="w-44 h-6 text-neon-green mt-1" />
          </Reveal>

          <Reveal delay={0.55}>
            <p className="mt-5 text-zinc-400 max-w-md leading-relaxed">
              I build robust backends, clean APIs and user-friendly web experiences —
              from Java & Spring Boot services to React front ends.
            </p>
          </Reveal>

          <Reveal delay={0.65}>
            <div className="flex flex-wrap gap-4 mt-8">
              <button data-testid="hero-view-work-button" onClick={() => scrollToSection("projects")} className="btn-neon px-7 py-3 text-sm">
                <FolderKanban className="w-4 h-4" /> View My Work
              </button>
              <button data-testid="hero-contact-button" onClick={() => scrollToSection("contact")} className="btn-ghost px-7 py-3 text-sm">
                Get In Touch
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.75}>
            <div className="flex gap-3 mt-9">
              {SOCIAL_ITEMS.map(({ key, icon: Icon, href, label }) => (
                <a key={key} data-testid={`hero-social-${key}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label} className="border-2 border-white rounded-full p-2.5 text-zinc-200 hover:bg-neon-green hover:text-black hover:border-black hover:-rotate-6 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative">
          {/* Container size badha kar max-w-md / lg kiya hai */}
          <motion.div style={{ x: charX, y: charY }} className="relative max-w-md lg:max-w-lg mx-auto">
            {/* Speech Bubble */}
            <motion.div
              initial={{ scale: 0, rotate: 20 }}
              animate={{ scale: 1, rotate: 6 }}
              transition={{ delay: 1, type: "spring", stiffness: 200, damping: 12 }}
              className="absolute -top-8 -left-2 md:-left-12 z-20 bg-white text-black rounded-2xl px-4 py-3 shadow-[4px_4px_0_#FF00FF]"
            >
              <p className="font-display text-lg md:text-xl leading-tight">
                LET'S BUILD<br />SOMETHING<br />AWESOME!
              </p>
              <svg viewBox="0 0 24 24" className="absolute -bottom-3 left-8 w-5 h-5 text-white fill-white" aria-hidden="true">
                <path d="M2 2l14 6-8 8z" stroke="#000" strokeWidth="2" />
              </svg>
            </motion.div>

            {/* Character Image: mix-blend-multiply se white background background me blend ho jata hai */}
           <img
src={HERO_IMG}
alt="Cartoon illustration of Pulkit Goenka with a laptop"
data-testid="hero-character-image"
className="w-full h-auto mx-auto object-contain select-none pointer-events-none"
/>


            {/* Yellow Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute bottom-6 -right-2 md:-right-6 rotate-6 bg-neon-yellow text-black font-display text-sm px-4 py-2 border-2 border-black shadow-[3px_3px_0_#fff]"
            >
              GOOD CODE, BETTER DAYS
            </motion.div>
          </motion.div>
        </div>
      </div>

      <button data-testid="hero-scroll-indicator" onClick={() => scrollToSection("projects")} className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-zinc-500 hover:text-neon-green transition-colors">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll Down</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}