import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { personal } from "@/lib/data";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [stuck, setStuck] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setStuck(v > 24));

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );

    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <motion.nav
          animate={{
            width: stuck ? "min(720px, 96vw)" : "min(960px, 96vw)",
            paddingTop: stuck ? 10 : 14,
            paddingBottom: stuck ? 10 : 14,
          }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="glass flex items-center justify-between rounded-full px-4 transition-all duration-300 ring-1 ring-white/25 sm:px-5"
          style={{
            boxShadow: stuck
              ? "0 8px 32px -8px oklch(0.14 0.02 260 / 0.12), 0 0 0 1px oklch(0.14 0.02 260 / 0.04)"
              : "none",
          }}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight transition-transform hover:scale-[1.02]"
          >
            <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-foreground font-display text-sm text-background shadow-[0_10px_24px_-14px_var(--foreground)]">
              H
              <span className="absolute inset-0 rounded-full bg-foreground opacity-0 transition-opacity group-hover:opacity-20" />
            </span>
            <span className="hidden sm:inline">{personal.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-full px-3.5 py-1.5 text-sm transition-colors"
                  style={{
                    color:
                      activeSection === l.href
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                  }}
                >
                  {activeSection === l.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-foreground/5"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-[0_14px_28px_-18px_var(--foreground)] transition-all hover:scale-[1.03] hover:bg-primary active:scale-[0.98]"
              style={{
                boxShadow: "0 4px 16px -4px oklch(0.14 0.02 260 / 0.2)",
              }}
            >
              Let's talk
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-medium">{personal.name}</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-16 flex-1">
                <ul className="space-y-2">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <a
                        href={l.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-2xl border border-transparent px-4 py-4 font-display text-2xl font-medium transition-colors hover:border-foreground/10 hover:bg-paper/70"
                        style={{
                          color:
                            activeSection === l.href
                              ? "var(--primary)"
                              : "var(--foreground)",
                        }}
                      >
                        <span className="mr-3 text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {l.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-foreground/10 pt-6">
                <div className="flex gap-3">
                  {Object.entries(personal.social).slice(0, 4).map(([k, v]) => (
                    <a
                      key={k}
                      href={v}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-sm capitalize transition-colors hover:border-primary hover:text-primary"
                    >
                      {k.charAt(0)}
                    </a>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  {personal.location}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
