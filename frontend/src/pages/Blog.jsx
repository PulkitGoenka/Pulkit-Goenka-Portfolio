import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import axios from "axios";
import { API } from "@/lib/api";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Blog() {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => (await axios.get(`${API}/blog`)).data,
  });

  return (
    <section data-testid="blog-page" className="pt-36 pb-24 md:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs tracking-[0.35em] uppercase text-neon-cyan font-bold">Blog</p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-3 leading-[0.95]">
          DEV NOTES &<br /><span className="text-neon-green">LESSONS</span>
        </h1>
        <p className="text-zinc-400 mt-4 max-w-xl">
          Things I learn while building backends, APIs and interfaces — written down so
          future me (and you) can find them.
        </p>

        {isLoading && <p data-testid="blog-loading" className="mt-16 text-zinc-500 font-display text-2xl animate-blink">Loading posts…</p>}
        {isError && <p data-testid="blog-error" className="mt-16 text-zinc-400">Couldn't load posts right now. Try refreshing in a bit.</p>}
        {!isLoading && !isError && posts?.length === 0 && (
          <p data-testid="blog-empty" className="mt-16 text-zinc-400 font-display text-2xl">No posts yet — new notes drop soon.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {posts?.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link to={`/blog/${post.slug}`} data-testid={`blog-card-${post.slug}`} className="sticker-card rounded-xl overflow-hidden group block h-full">
                <div className="border-b-2 border-white overflow-hidden aspect-[16/9]">
                  <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-zinc-500">
                    <span>{formatDate(post.published_at)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.read_minutes} min read</span>
                  </div>
                  <h2 className="font-display text-2xl mt-3 leading-tight">{post.title}</h2>
                  <p className="text-zinc-400 text-sm mt-2 line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((t) => (
                      <span key={t} className="text-[11px] font-bold border border-neon-cyan/60 text-neon-cyan rounded-full px-2.5 py-0.5">{t}</span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-neon-green">
                    Read More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
