import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/data";
import { ExternalLink } from "lucide-react";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section ref={ref} id="work" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
      <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-xs text-muted-foreground">
            02
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              The arc
            </div>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">
              A timeline, not a list.
            </h2>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          {experience.length} positions
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent md:left-1/2 md:block md:-translate-x-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-5 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-primary via-primary/80 to-primary/20 md:left-1/2 md:block md:-translate-x-1/2"
        />

        <ul className="flex flex-col gap-12 md:gap-20">
          {experience.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={e.company}
                className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-8"
              >
                <motion.div
                  initial={{ opacity: 0, x: left ? -30 : 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  className={
                    left
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                  }
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                    {e.year}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                    {e.role}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{e.company}</span>
                  </div>
                  <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-foreground/70">
                    {e.summary}
                  </p>
                  <div
                    className={
                      "mt-5 flex flex-wrap gap-1.5 " +
                      (left ? "md:justify-end" : "")
                    }
                  >
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-foreground/10 bg-foreground/[0.02] px-3 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <div
                  className={
                    "relative hidden md:block " +
                    (left ? "md:col-start-2" : "md:col-start-1 md:row-start-1")
                  }
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="absolute left-1/2 top-8 z-10 -translate-x-1/2"
                    style={{ left: left ? "0%" : "100%" }}
                  >
                    <div className="relative">
                      <motion.span
                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.6, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -inset-3 rounded-full bg-primary/20 blur-sm"
                      />
                      <span className="relative block h-4 w-4 rounded-full border-4 border-background bg-primary shadow-[0_0_16px_var(--primary)]" />
                    </div>
                  </motion.div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 flex justify-center"
      >
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.02] px-6 py-3 text-sm font-medium transition-all hover:border-primary/30 hover:text-primary"
        >
          View the work
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </section>
  );
}
