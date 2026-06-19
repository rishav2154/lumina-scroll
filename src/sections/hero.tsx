import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroSphere } from "@/components/three/hero-sphere";
import { Scramble } from "@/components/anim/scramble";
import { SplitText } from "@/components/anim/split-text";
import { personal, stats } from "@/lib/data";
import { Counter } from "@/components/anim/counter";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden pt-32">
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -120]) }}
        aria-hidden
        className="aurora absolute -top-40 left-1/2 h-[60vmin] w-[80vmin] -translate-x-1/2 opacity-70"
      />
      <div className="grain pointer-events-none absolute inset-0" />

      <motion.div
        style={{ y, scale, opacity }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.1fr_1fr]"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-paper/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Open to new chapters · {personal.location}
          </motion.div>

          <h1 className="font-display text-[clamp(2.6rem,7.4vw,6.2rem)] font-medium leading-[0.95] tracking-tight">
            <SplitText text="A founder building" className="block" />
            <span className="block">
              <Scramble text="what's next." className="bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-7 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            {personal.tagline} I'm {personal.name} — operator, designer, and persistent optimist
            about software that respects people.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } },
            }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            {[
              { label: "View work", href: "#projects", primary: true },
              { label: "Read story", href: "#about" },
              { label: "Download CV", href: "#" },
            ].map((b) => (
              <motion.a
                key={b.label}
                href={b.href}
                variants={{
                  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className={
                  b.primary
                    ? "group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
                    : "group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-paper/60 px-5 py-3 text-sm text-foreground backdrop-blur transition-colors hover:bg-foreground/5"
                }
              >
                {b.label}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-14 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -3 }}
                className="glass rounded-2xl p-3"
              >
                <div className="font-display text-2xl font-medium tracking-tight">
                  <Counter to={s.value} />
                  <span className="text-primary">{s.suffix}</span>
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative aspect-square w-full max-w-[560px] justify-self-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0"
          >
            <HeroSphere />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        Scroll to enter
      </motion.div>
    </section>
  );
}