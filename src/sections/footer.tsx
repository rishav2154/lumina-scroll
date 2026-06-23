import { motion } from "framer-motion";
import { personal } from "@/lib/data";
import { Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-background/10 bg-foreground text-background/70">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 text-sm font-medium text-background/80 transition-colors hover:text-primary"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-background/20 transition-colors group-hover:border-primary">
                <ArrowUp className="h-4 w-4" />
              </span>
              Back to top
            </motion.button>

            <div className="text-center text-xs text-background/40 sm:text-left">
              © {new Date().getFullYear()} {personal.name}. All rights reserved.
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:items-end">
            <div className="flex items-center gap-6">
              {Object.entries(personal.social).slice(0, 4).map(([key, url]) => (
                <motion.a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-xs font-medium uppercase tracking-wider text-background/50 transition-colors hover:text-primary"
                >
                  {key}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-background/40">
              <span>Crafted with</span>
              <Heart className="h-3 w-3 text-primary" fill="currentColor" />
              <span>using React, Three.js & GSAP</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-col items-center justify-center gap-2 border-t border-background/5 pt-8 text-center"
        >
          <div className="font-display text-lg font-medium tracking-tight text-background/80">
            {personal.name}
          </div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-background/30">
            {personal.role}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
