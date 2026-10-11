export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function scrollToSection(id) {
  const lenis = typeof window !== "undefined" ? window.__lenis : null;
  if (lenis) {
    lenis.scrollTo(`#${id}`, { offset: -76 });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}
