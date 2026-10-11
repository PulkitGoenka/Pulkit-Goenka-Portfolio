import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";
import { API } from "@/lib/api";
import { DoodleStar } from "@/components/Doodles";

const ACCENTS = {
  cyan: "border-neon-cyan/60 text-neon-cyan",
  pink: "border-neon-pink/60 text-neon-pink",
  purple: "border-neon-purple/70 text-neon-purple",
};

export default function Projects() {
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => (await axios.get(`${API}/projects`)).data,
  });

  return (
    <section id="projects" data-testid="projects-section" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
              FEATURED<br />PROJECTS
              <DoodleStar className="inline w-8 h-8 md:w-10 md:h-10 text-neon-pink ml-3 -mt-6" />
            </h2>
            <p className="text-zinc-400 mt-4">Here are some of the things I've built — real systems, real users.</p>
          </div>
        </div>

        {isLoading && (
          <p data-testid="projects-loading" className="mt-16 text-zinc-500 font-display text-2xl animate-blink">Loading projects…</p>
        )}
        {isError && (
          <p data-testid="projects-error" className="mt-16 text-zinc-400">Couldn't load projects right now. Try refreshing in a bit.</p>
        )}
        {!isLoading && !isError && projects?.length === 0 && (
          <p data-testid="projects-empty" className="mt-16 text-zinc-400 font-display text-2xl">Projects coming soon — check back!</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {projects?.map((project, i) => (
            <motion.article
              key={project.id}
              data-testid={`project-card-${project.slug}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.09 }}
              className="sticker-card rounded-xl overflow-hidden group"
            >
              <div className="relative border-b-2 border-white overflow-hidden aspect-[16/10]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-black/85 border rounded-full px-3 py-1 ${ACCENTS[project.accent] || ACCENTS.cyan}`}>
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-3xl leading-none">{project.title}</h3>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-bold border border-zinc-600 text-zinc-200 rounded-full px-3 py-1">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
