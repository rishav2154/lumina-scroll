import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      const overflow = t.scrollWidth - window.innerWidth;
      setDistance(Math.max(0, overflow + 80));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [48, -distance]);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative bg-foreground text-background"
      style={{ height: `${Math.max(projects.length * 75, 300)}vh` }}
    >
      <div className=" sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between px-6 pb-6 pt-24 sm:flex-row sm:items-end sm:pb-8 sm:pt-28">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 text-xs text-background/50">
                05
              </div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-background/40">
                Selected work
              </div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium tracking-tight"
            >
              Things I've shipped.
            </motion.h2>
          </div>
          <div className="mt-4 hidden items-center gap-2 text-xs text-background/40 sm:mt-0 sm:flex">
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
            Scroll to explore
          </div>
        </div>

        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[10vw] bg-gradient-to-r from-foreground to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[10vw] bg-gradient-to-l from-foreground to-transparent" />

          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full w-max items-center gap-6 pl-[6vw] pr-[6vw] will-change-transform md:gap-8"
          >
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative flex h-[62vh] w-[88vw] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-background/10 p-6 sm:w-[65vw] md:w-[50vw] md:p-8 lg:w-[38vw]"
                style={{
                  background: `linear-gradient(180deg, color-mix(in oklab, ${p.accent} 12%, transparent), color-mix(in oklab, ${p.accent} 24%, black))`,
                }}
              >
                <div className="grain absolute inset-0 opacity-25" />
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-60"
                  style={{ background: p.accent }}
                />
                <div
                  className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
                  style={{ background: p.accent }}
                />

                <div className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-background/20 bg-background/10 opacity-0 backdrop-blur transition-all group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs text-background/50">
                  <span className="font-medium">{p.year}</span>
                  <span className="font-display text-background/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="font-display text-2xl font-medium leading-tight sm:text-3xl lg:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-background/70">
                    {p.blurb}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-background/50">{p.role}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-background/70 transition-all group-hover:text-primary">
                      Case study
                      <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}

            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex h-[62vh] w-[50vw] shrink-0 items-center justify-center rounded-3xl border border-background/10 bg-background/5 sm:w-[35vw] lg:w-[25vw]"
            >
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-background/20">
                  <ArrowUpRight className="h-6 w-6 text-background/50" />
                </div>
                <span className="text-sm font-medium text-background/70">Start a project</span>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
