import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";

const SkillsGalaxy = lazy(() =>
  import("@/components/three/skills-galaxy").then((m) => ({ default: m.SkillsGalaxy }))
);

function GalaxyPlaceholder() {
  return (
    <div className="aspect-square w-full max-w-[500px] justify-self-center">
      <div className="h-full w-full animate-pulse rounded-full border border-background/10 bg-background/5" />
    </div>
  );
}

function GalaxyWrapper() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px", once: true });

  useEffect(() => {
    if (inView) {
      const idle = window.requestIdleCallback?.(() => setMounted(true)) || setTimeout(() => setMounted(true), 50);
      return () => typeof idle === "number" ? clearTimeout(idle) : window.cancelIdleCallback?.(idle);
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative aspect-square w-full max-w-[500px] justify-self-center">
      <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5 blur-3xl" />
      <div className="relative h-full w-full rounded-full border border-background/10">
        {mounted ? (
          <Suspense fallback={<GalaxyPlaceholder />}>
            <SkillsGalaxy />
          </Suspense>
        ) : (
          <GalaxyPlaceholder />
        )}
      </div>
    </div>
  );
}

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="skills" className="relative overflow-hidden bg-foreground text-background">
      <div className="grain absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 sm:py-32 lg:grid-cols-2 lg:gap-16 lg:py-40">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 text-xs text-background/60">
              03
            </div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-background/50">
              The toolkit
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium leading-tight tracking-tight"
          >
            A galaxy of disciplines,
            <br />
            <span className="text-primary">one operator.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-background/60"
          >
            I've spent a decade refusing to specialize in just one thing. The galaxy on the right
            is interactive - every node is a discipline I ship in production.
          </motion.p>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 grid grid-cols-2 gap-2 sm:gap-3"
          >
            {skills.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ x: 4 }}
                className="group relative flex items-center gap-3 rounded-xl border border-background/10 bg-background/5 px-3.5 py-3 backdrop-blur transition-all hover:border-primary/30 hover:bg-background/10"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-background/20"
                  style={{ background: `hsl(${s.hue} 80% 60%)` }}
                />
                <span className="flex-1 text-sm font-medium">{s.name}</span>
                <div className="h-1.5 w-14 overflow-hidden rounded-full bg-background/15">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                    className="h-full rounded-full"
                    style={{ background: `hsl(${s.hue} 70% 55%)` }}
                  />
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <GalaxyWrapper />
      </div>
    </section>
  );
}
