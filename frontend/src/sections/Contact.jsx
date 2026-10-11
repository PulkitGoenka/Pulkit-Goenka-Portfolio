import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Mail, MessageCircle, Send } from "lucide-react";
import { API } from "@/lib/api";
import { DoodleArrow, DoodleZigzag } from "@/components/Doodles";
import { SOCIALS } from "@/components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Couldn't send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative py-24 md:py-32">
      <DoodleZigzag className="absolute top-16 right-8 w-24 h-24 text-neon-purple/70 hidden lg:block" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
            LET'S<br />WORK<br /><span className="text-neon-green">TOGETHER!</span>
          </h2>
          <p className="text-zinc-400 mt-6 max-w-md leading-relaxed">
            Have a project, an idea, or just want to say hi? Drop a message below — it
            lands straight with me. Prefer talking? Email or WhatsApp works too.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a data-testid="contact-email-button" href={`mailto:${SOCIALS.email}`} className="btn-neon px-6 py-3 text-sm">
              <Mail className="w-4 h-4" /> Email Me
            </a>
            <a data-testid="contact-whatsapp-button" href={SOCIALS.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost px-6 py-3 text-sm">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          <p className="font-display text-xl text-neon-cyan mt-10 -rotate-1">Good ideas start with a conversation.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
          className="relative"
        >
          <DoodleArrow className="absolute -top-10 -left-6 w-12 h-12 text-neon-pink hidden md:block" />
          <form data-testid="contact-form" onSubmit={onSubmit} className="sticker-card rounded-xl p-7 md:p-8 flex flex-col gap-5">
            <div>
              <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Your Name</label>
              <input id="contact-name" data-testid="contact-name-input" type="text" required minLength={2} value={form.name} onChange={update("name")} placeholder="Jane Doe" className="input-brutal mt-2" />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Your Email</label>
              <input id="contact-email" data-testid="contact-email-input" type="email" required value={form.email} onChange={update("email")} placeholder="jane@example.com" className="input-brutal mt-2" />
            </div>
            <div>
              <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Message</label>
              <textarea id="contact-message" data-testid="contact-message-input" required minLength={10} rows={5} value={form.message} onChange={update("message")} placeholder="Tell me about your project…" className="input-brutal mt-2 resize-none" />
            </div>
            <button type="submit" data-testid="contact-submit-button" disabled={sending} className="btn-neon px-6 py-3 text-sm justify-center disabled:opacity-60 disabled:pointer-events-none">
              {sending ? "Sending…" : "Send Message"} <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
