import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/lib/data";

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative bg-foreground text-background"
      style={{ height: `${projects.length * 80}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between px-6 pt-28 pb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-background/50">
              05 · Selected work
            </div>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-medium tracking-tight">
              Things I've shipped.
            </h2>
          </div>
          <div className="hidden text-xs text-background/50 md:block">
            Drag horizontally · or just scroll
          </div>
        </div>

        <div className="relative flex-1">
          <motion.div
            style={{ x }}
            className="flex h-full items-center gap-8 pl-[10vw] pr-[10vw] will-change-transform"
          >
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                whileHover={{ y: -8 }}
                className="group relative flex h-[68vh] w-[78vw] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-background/10 p-8 sm:w-[58vw] md:w-[44vw] lg:w-[36vw]"
                style={{
                  background: `linear-gradient(180deg, color-mix(in oklab, ${p.accent} 14%, transparent), color-mix(in oklab, ${p.accent} 28%, black))`,
                }}
              >
                <div className="grain absolute inset-0 opacity-30" />
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
                  style={{ background: p.accent }} />

                <div className="relative z-10 flex items-center justify-between text-xs text-background/70">
                  <span>{p.year}</span>
                  <span>0{i + 1}</span>
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="font-display text-3xl font-medium leading-tight sm:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-background/80">{p.blurb}</p>
                  <div className="mt-6 flex items-center justify-between text-xs text-background/70">
                    <span>{p.role}</span>
                    <span className="inline-flex items-center gap-1 transition-transform group-hover:translate-x-1">
                      Case study →
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}