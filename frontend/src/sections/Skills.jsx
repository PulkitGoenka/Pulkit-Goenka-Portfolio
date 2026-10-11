import { motion } from "framer-motion";
import { DoodleBolt } from "@/components/Doodles";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

const SKILLS = [
  { name: "HTML5", icon: "html5/html5-original" },
  { name: "CSS", icon: "css3/css3-original" },
  { name: "JavaScript", icon: "javascript/javascript-original" },
  { name: "React", icon: "react/react-original" },
  { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original" },
  { name: "Bootstrap", icon: "bootstrap/bootstrap-original" },
  { name: "jQuery", icon: "jquery/jquery-original" },
  { name: "Figma", icon: "figma/figma-original" },
  { name: "Git", icon: "git/git-original" },
  { name: "VS Code", icon: "vscode/vscode-original" },
  { name: "Java", icon: "java/java-original" },
  { name: "Spring Boot", icon: "spring/spring-original" },
  { name: "MongoDB", icon: "mongodb/mongodb-original" },
  { name: "Node.js", icon: "nodejs/nodejs-original" },
];

const ALSO = ["REST APIs", "Microservices", "MySQL", "Docker", "Hibernate", "Maven", "JWT", "Git & GitHub"];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Skills() {
  return (
    <section id="skills" data-testid="skills-section" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
          MY SKILLS
          <DoodleBolt className="inline w-8 h-8 md:w-10 md:h-10 text-neon-cyan ml-3 -mt-4" />
        </h2>
        <p className="text-zinc-400 mt-4">Tools I reach for every day, on both sides of the stack.</p>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 mt-14">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              data-testid={`skill-badge-${slugify(skill.name)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: (i % 7) * 0.05 }}
              className="sticker-card rounded-xl p-4 flex flex-col items-center gap-2.5 text-center hover:!bg-neon-green group cursor-default"
            >
              <img src={`${DEVICON}${skill.icon}.svg`} alt={skill.name} loading="lazy" className="w-9 h-9" />
              <span className="text-xs font-bold leading-tight group-hover:text-black">{skill.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold mr-2">Also in my toolbox</span>
          {ALSO.map((item) => (
            <span key={item} data-testid={`skill-pill-${slugify(item)}`} className="text-sm font-bold border-2 border-white rounded-full px-4 py-1.5 hover:bg-neon-cyan hover:text-black hover:border-black hover:rotate-2 transition-all cursor-default">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
