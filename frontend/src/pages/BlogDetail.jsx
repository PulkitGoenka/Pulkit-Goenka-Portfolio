import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import axios from "axios";
import { API } from "@/lib/api";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => (await axios.get(`${API}/blog/${slug}`)).data,
  });

  if (isLoading) {
    return (
      <section className="pt-36 pb-24 min-h-screen grid place-items-center">
        <p data-testid="blog-detail-loading" className="text-zinc-500 font-display text-2xl animate-blink">Loading post…</p>
      </section>
    );
  }

  if (isError || !post) {
    return (
      <section className="pt-36 pb-24 min-h-screen">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-display text-6xl text-neon-pink">404</p>
          <h1 data-testid="blog-detail-not-found" className="font-display text-3xl mt-4">This post wandered off.</h1>
          <button data-testid="blog-notfound-back-link" onClick={() => navigate("/blog")} className="btn-neon px-6 py-2.5 text-sm mt-8">
            Back to all posts
          </button>
        </div>
      </section>
    );
  }

  return (
    <motion.article data-testid="blog-detail-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="pt-36 pb-24 md:pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <button data-testid="blog-back-link" onClick={() => navigate("/blog")} className="inline-flex items-center gap-2 text-sm font-bold text-zinc-300 hover:text-neon-green transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Posts
        </button>

        <div className="flex flex-wrap gap-2 mt-8">
          {post.tags.map((t) => (
            <span key={t} className="text-[11px] font-bold border border-neon-pink/60 text-neon-pink rounded-full px-2.5 py-0.5">{t}</span>
          ))}
        </div>

        <h1 data-testid="blog-detail-title" className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.02]">{post.title}</h1>

        <div className="flex items-center gap-3 text-sm text-zinc-500 mt-4">
          <span>{formatDate(post.published_at)}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.read_minutes} min read</span>
        </div>

        <div className="sticker-card rounded-xl overflow-hidden mt-10">
          <img src={post.cover_image} alt={post.title} className="w-full aspect-[16/9] object-cover" />
        </div>

        <div className="mt-10">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-zinc-300 leading-relaxed text-base md:text-lg mt-6 first:mt-0">{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 border-t-2 border-dashed border-zinc-800 pt-8 flex items-center justify-between">
          <p className="font-display text-2xl text-neon-yellow -rotate-1">Written by Pulkit Goenka</p>
          <button data-testid="blog-detail-back-button" onClick={() => navigate("/blog")} className="btn-ghost px-5 py-2 text-sm">More posts</button>
        </div>
      </div>
    </motion.article>
  );
}
