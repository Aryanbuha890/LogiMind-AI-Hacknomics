import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  Linkedin,
  Github,
  Instagram,
  Check,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   CONTACT US COMPONENT (MATCHING THE REFERENCE LAYOUT & LOGIMIND CYBER-GLASS THEME)
   ───────────────────────────────────────────────────────── */

export function ContactUs() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [department, setDepartment] = useState("sales");

  // Social Icons matching the bottom of the main card
  const socialIcons = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    {
      // Custom WhatsApp icon using SVGs since lucide doesn't have it natively
      icon: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
      href: "https://whatsapp.com",
      label: "WhatsApp",
    },
  ];

  return (
    <section id="contact-us" className="py-24 bg-slate-50 dark:bg-[#020205] relative overflow-hidden flex flex-col items-center">
      {/* Background ambient lighting/glows matching LogiMind theme */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.06),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.04),transparent)] blur-3xl" />

      <div className="mx-auto w-full max-w-[640px] px-6 relative z-10 flex flex-col items-center">
        
        {/* Upper Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-[#020205] border border-slate-200 dark:border-white/10 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Get in Touch
        </motion.div>

        {/* Large Styled Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl sm:text-5xl font-black tracking-tight text-center text-slate-900 dark:text-white leading-tight uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Let's Build <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400">
            Something Great.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-slate-500 dark:text-slate-400 text-sm text-center max-w-md leading-relaxed"
        >
          Have a question or want to collaborate? We reply within 24 hours.
        </motion.p>

        {/* Main Glassy Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 w-full rounded-[24px] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-[#060814]/60 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle inner box shadow/glow */}
          <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.03] pointer-events-none" />

          {!formSubmitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(true);
              }}
              className="relative z-10 space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Send a Message</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Every message is read and replied to personally.</p>
              </div>

              {/* Form Input fields */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono font-bold mb-2 block">Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="h-12 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#060814]/90 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500/40 transition duration-300"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono font-bold mb-2 block">Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="h-12 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#060814]/90 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500/40 transition duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono font-bold mb-2 block">Department *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "sales", label: "Sales" },
                    { id: "support", label: "Support" },
                    { id: "partners", label: "Partners" },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDepartment(d.id)}
                      className={`h-10 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        department === d.id
                          ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300"
                          : "bg-white/60 dark:bg-[#060814]/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-200 hover:text-white"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono font-bold mb-2 block">Subject *</label>
                <input
                  required
                  type="text"
                  placeholder="What's this about?"
                  className="h-12 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#060814]/90 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500/40 transition duration-300"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono font-bold mb-2 block">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what's on your mind..."
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#060814]/90 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500/40 transition duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full h-12 rounded-xl text-sm font-semibold text-slate-900 dark:text-white overflow-hidden transition hover:-translate-y-px cursor-pointer"
                style={{
                  backgroundImage: "linear-gradient(120deg, #1B3A6B 0%, #2563EB 55%, #0D9488 110%)",
                  boxShadow: "0 10px 30px -8px rgba(37, 99, 235, 0.5)",
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Send Message
                  <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />
              </button>

              {/* Connect with us divider */}
              <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 font-mono font-bold mb-4">Connect with us</span>
                
                {/* Social media icons grid */}
                <div className="flex items-center gap-3">
                  {socialIcons.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#020205] text-slate-500 dark:text-slate-400 hover:text-white hover:border-cyan-500/35 hover:bg-cyan-500/10 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-16"
            >
              <div className="mx-auto h-16 w-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 animate-pulse">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Message Dispatched</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">Thank you for reaching out. We will connect with you shortly.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom Cards Row */}
        <div className="mt-6 w-full grid sm:grid-cols-2 gap-4">
          
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-[#060814]/40 backdrop-blur-xl p-5"
          >
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Mail className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono font-bold">Email</h4>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">hello@logimind.ai</div>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-[#060814]/40 backdrop-blur-xl p-5"
          >
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <MapPin className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono font-bold">Location</h4>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">Rotterdam · Singapore · Dubai</div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
