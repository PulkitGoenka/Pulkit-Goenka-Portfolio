import { motion } from "framer-motion";
import { Code2, Layers, Rocket } from "lucide-react";
import { scrollToSection } from "@/lib/api";
import { DoodleCrown, DoodleStar, DoodleZigzag } from "@/components/Doodles";

const ABOUT_IMG = "/img/about-character.png";

const STATS = [
  { icon: Rocket, value: "3+", label: "Years of Experience", testid: "about-stat-experience" },
  { icon: Layers, value: "15+", label: "Projects Built", testid: "about-stat-projects" },
  { icon: Code2, value: "10+", label: "Technologies", testid: "about-stat-technologies" },
];

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative py-24 md:py-32 bg-[#080808] border-y-2 border-dashed border-zinc-800">
      <DoodleZigzag className="absolute top-14 right-6 w-20 h-20 text-neon-cyan/60 hidden lg:block" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.35fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-xs mx-auto lg:mx-0"
        >
          <DoodleCrown className="absolute -top-9 -left-5 w-14 h-14 text-neon-yellow -rotate-12 z-10" />
          <div className="sticker-card rounded-2xl rotate-2 overflow-hidden">
            <img src={ABOUT_IMG} alt="Cartoon portrait of Pulkit Goenka" data-testid="about-character-image" className="w-full" />
          </div>
          <DoodleStar className="absolute -bottom-7 -right-5 w-10 h-10 text-neon-pink animate-float" />
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
              ABOUT <span className="text-neon-pink">ME</span>
            </h2>
            <p className="text-zinc-300 mt-6 leading-relaxed text-base md:text-lg">
              I'm Pulkit — a full stack developer who feels most at home in the backend.
            </p>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              Most of my time goes into Java, Spring Boot and databases: designing APIs,
              modeling data, and making sure the boring-but-critical parts — reliability,
              security, performance — just work. On the front end I build with React and
              Tailwind, so the products I ship feel as good as they run.
            </p>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              Lately I've been building systems like self-checkout flows, CRM platforms
              and policy management tools — the kind of software that has to be correct,
              not just pretty.
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-9">
              {STATS.map(({ icon: Icon, value, label, testid }, i) => (
                <motion.div
                  key={label}
                  data-testid={testid}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="sticker-card rounded-xl p-3 sm:p-4 text-center"
                >
                  <Icon className="w-5 h-5 text-neon-green mx-auto" />
                  <p className="font-display text-3xl md:text-4xl mt-2">{value}</p>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-500 mt-1">{label}</p>
                </motion.div>
              ))}
            </div>

            <button data-testid="about-contact-button" onClick={() => scrollToSection("contact")} className="btn-neon px-6 py-3 text-sm mt-9">
              More About Me — Say Hi
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
