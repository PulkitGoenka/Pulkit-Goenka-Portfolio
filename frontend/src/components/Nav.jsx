import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/api";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchor = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 150);
    } else {
      scrollToSection(id);
    }
  };

  const linkClass = (active) =>
    `text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
      active ? "text-neon-green" : "text-zinc-200 hover:text-neon-green"
    }`;

  return (
    <header data-testid="site-nav" className="fixed top-0 inset-x-0 z-50 bg-[#050505] border-b-2 border-white">
      <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between">
        <button data-testid="nav-logo" onClick={() => handleAnchor("home")} className="text-left leading-none">
          <span className="font-display text-2xl md:text-[1.7rem] text-white">
            Pulkit Goenka<span className="text-neon-green">.</span>
          </span>
          <span className="hidden sm:block text-[10px] tracking-[0.35em] uppercase text-zinc-400 mt-1">
            Full Stack Developer
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) =>
            l.href ? (
              <Link key={l.label} to={l.href} data-testid={`nav-link-${l.label.toLowerCase()}`} className={linkClass(location.pathname === l.href)}>
                {l.label}
              </Link>
            ) : (
              <button key={l.label} data-testid={`nav-link-${l.id}`} onClick={() => handleAnchor(l.id)} className={linkClass(false)}>
                {l.label}
              </button>
            )
          )}
          <button data-testid="nav-lets-talk-button" onClick={() => handleAnchor("contact")} className="btn-neon px-5 py-2 text-sm">
            Let's Talk
          </button>
        </nav>

        <button data-testid="nav-mobile-toggle" className="md:hidden text-white p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <nav data-testid="nav-mobile-menu" className="md:hidden border-t-2 border-white bg-[#050505] px-6 py-5 flex flex-col gap-4">
          {LINKS.map((l) =>
            l.href ? (
              <Link key={l.label} to={l.href} data-testid={`nav-mobile-link-${l.label.toLowerCase()}`} onClick={() => setOpen(false)} className={linkClass(location.pathname === l.href)}>
                {l.label}
              </Link>
            ) : (
              <button key={l.label} data-testid={`nav-mobile-link-${l.id}`} onClick={() => handleAnchor(l.id)} className={`text-left ${linkClass(false)}`}>
                {l.label}
              </button>
            )
          )}
          <button data-testid="nav-mobile-lets-talk" onClick={() => handleAnchor("contact")} className="btn-neon px-5 py-2 text-sm justify-center">
            Let's Talk
          </button>
        </nav>
      )}
    </header>
  );
}
