import { Link, useLocation, useNavigate } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { scrollToSection } from "@/lib/api";
import { DoodleHeart } from "@/components/Doodles";

export const SOCIALS = {
  github: "https://github.com/pulkitgoenka",
  linkedin: "https://www.linkedin.com/in/pulkit-goenka",
  email: "goenka19pulkit@gmail.com",
  whatsapp: "https://wa.me/919999999999",
  
};

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchor = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 150);
    } else {
      scrollToSection(id);
    }
  };

  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer data-testid="site-footer" className="border-t-2 border-white bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-3xl text-white">
            Pulkit Goenka<span className="text-neon-green">.</span>
          </p>
          <p className="text-zinc-400 text-sm mt-2 max-w-xs">
            Full Stack Developer — robust backends, clean APIs, delightful interfaces.
          </p>
          <div className="flex gap-3 mt-5">
            <a data-testid="footer-social-github" href={SOCIALS.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="border-2 border-white rounded-full p-2 hover:bg-neon-green hover:text-black hover:border-black transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a data-testid="footer-social-linkedin" href={SOCIALS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="border-2 border-white rounded-full p-2 hover:bg-neon-pink hover:text-black hover:border-black transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a data-testid="footer-social-email" href={`mailto:${SOCIALS.email}`} aria-label="Email" className="border-2 border-white rounded-full p-2 hover:bg-neon-cyan hover:text-black hover:border-black transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-4">Navigate</p>
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <button key={l.id} data-testid={`footer-link-${l.id}`} onClick={() => handleAnchor(l.id)} className="text-left text-sm font-semibold text-zinc-300 hover:text-neon-green transition-colors w-fit">
                {l.label}
              </button>
            ))}
            <Link to="/blog" data-testid="footer-link-blog" className="text-sm font-semibold text-zinc-300 hover:text-neon-green transition-colors w-fit">
              Blog
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-4">Good code, better days</p>
          <p className="font-display text-2xl text-neon-yellow -rotate-1 leading-snug">Code. Design. Create. Repeat.</p>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
          <p data-testid="footer-copyright">© 2026 Pulkit Goenka. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <DoodleHeart className="w-3.5 h-3.5 text-neon-pink" /> by Pulkit Goenka
          </p>
        </div>
      </div>
    </footer>
  );
}