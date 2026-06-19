import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/data";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section ref={ref} id="work" className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40">
      <div className="mb-16 flex items-end justify-between gap-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            02 · The arc
          </div>
          <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-medium tracking-tight">
            A timeline, not a list.
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-foreground/10 md:block" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-primary md:block"
        />

        <ul className="flex flex-col gap-16 md:gap-24">
          {experience.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={e.company}
                className="grid grid-cols-1 items-center gap-6 md:grid-cols-2"
              >
                <motion.div
                  initial={{ opacity: 0, x: left ? -40 : 40, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                  className={
                    left
                      ? "md:pr-12 md:text-right"
                      : "md:col-start-2 md:pl-12"
                  }
                >
                  <div className="text-xs uppercase tracking-[0.25em] text-primary">
                    {e.year}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                    {e.role}
                  </h3>
                  <div className="mt-1 text-sm text-muted-foreground">{e.company}</div>
                  <p className="mt-4 text-pretty text-sm text-foreground/80">{e.summary}</p>
                  <div
                    className={
                      "mt-4 flex flex-wrap gap-1.5 " +
                      (left ? "md:justify-end" : "")
                    }
                  >
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-foreground/10 bg-paper px-2.5 py-0.5 text-[11px] text-muted-foreground"
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
                    transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: left ? "0%" : "100%" }}
                  >
                    <div className="relative">
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-40" />
                      <span className="relative block h-3 w-3 rounded-full bg-primary ring-4 ring-paper" />
                    </div>
                  </motion.div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}