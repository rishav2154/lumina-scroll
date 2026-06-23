import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { SplitText } from "@/components/anim/split-text";
import { personal, stats } from "@/lib/data";
import { Counter } from "@/components/anim/counter";
import { Github, Linkedin, Twitter, Send, Download, ArrowDown, Sparkles } from "lucide-react";

const portrait = "https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1024";

const EASE = [0.2, 0.8, 0.2, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(14px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, delay: 0.1 + i * 0.08, ease: EASE },
  }),
};

const portraitReveal: Variants = {
  hidden: { opacity: 0, scale: 0.88, filter: "blur(24px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.3, delay: 0.2, ease: EASE },
  },
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const socials = [
    { Icon: Github, href: personal.social.github, label: "GitHub" },
    { Icon: Linkedin, href: personal.social.linkedin, label: "LinkedIn" },
    { Icon: Twitter, href: personal.social.twitter, label: "Twitter" },
    { Icon: Send, href: `mailto:${personal.email}`, label: "Email" },
  ];

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-32">
      <motion.div
        style={{ y: auroraY }}
        aria-hidden
        className="aurora absolute -top-32 left-1/2 h-[110vmin] w-[130vmin] -translate-x-1/2 opacity-70"
      />
      <div className="grain pointer-events-none absolute inset-0" />

      <motion.div
        style={{ y, scale, opacity }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
      >
        <div className="pb-8 lg:pb-0">
          <motion.div
            variants={reveal}
            custom={0}
            className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              Open to opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={reveal}
            custom={1}
            className="font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.93] tracking-tight"
          >
            <SplitText text="Founder &" className="block text-foreground" />
            <span className="block text-glow text-primary">
              <SplitText text="Technologist." className="inline" />
            </span>
          </motion.h1>

          <motion.p
            variants={reveal}
            custom={2}
            className="mt-6 max-w-lg text-balance text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {personal.tagline} A persistent optimist about software that respects people, building
            products at the intersection of design, AI, and human ambition.
          </motion.p>

          <motion.div variants={reveal} custom={3} className="mt-8 flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                data-cursor={label}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="grid h-12 w-12 place-items-center rounded-full border border-foreground/10 bg-paper/60 text-foreground backdrop-blur transition-colors hover:border-primary/30 hover:text-primary"
              >
                <Icon className="h-[18px] w-[18px]" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={reveal} custom={4} className="mt-10 flex flex-wrap items-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="glow-btn group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-foreground px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-background"
            >
              <Download className="relative h-4 w-4" />
              <span className="relative">Download CV</span>
            </motion.a>
            <a
              href="#projects"
              data-cursor="View"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-foreground/15 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-foreground transition-all hover:border-primary/40 hover:text-primary"
            >
              View Work
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            custom={5}
            className="mt-14 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="group glass relative overflow-hidden rounded-2xl p-4 transition-colors hover:border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative font-display text-2xl font-medium tracking-tight md:text-3xl">
                  <Counter to={s.value} />
                  <span className="text-primary">{s.suffix}</span>
                </div>
                <div className="relative mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={portraitReveal}
          className="relative aspect-square w-full max-w-[480px] justify-self-center lg:max-w-[560px]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, color-mix(in oklab, var(--primary) 58%, transparent), transparent 35%, color-mix(in oklab, var(--primary) 28%, transparent), transparent 70%, color-mix(in oklab, var(--primary) 48%, transparent), transparent)",
              filter: "blur(2px)",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-3 rounded-full glow-ring"
          />
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-1 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)",
              filter: "blur(18px)",
            }}
          />
          <div className="absolute inset-8 overflow-hidden rounded-full border border-primary/30 glow-ring">
            <img
              src={portrait}
              alt={personal.name}
              width={1024}
              height={1024}
              className="h-full w-full object-cover [filter:contrast(1.04)_saturate(1.06)]"
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 120%, color-mix(in oklab, var(--primary) 38%, transparent), transparent 55%)",
              }}
            />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 block h-4 w-4 rounded-full bg-primary shadow-[0_0_22px_var(--primary)]" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4"
          >
            <span className="absolute bottom-0 left-0 block h-2 w-2 rounded-full bg-foreground/25" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <span className="text-[11px] uppercase tracking-[0.25em]">Scroll to explore</span>
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}
