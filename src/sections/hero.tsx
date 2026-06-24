import { motion, useScroll, useTransform, type Variants, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { SplitText } from "@/components/anim/split-text";
import { personal, stats } from "@/lib/data";
import { Counter } from "@/components/anim/counter";
import { Linkedin, Mail, Phone, Download, ArrowDown, Sparkles } from "lucide-react";
import portrait from "../public/ChatGPT Image Jun 24, 2026, 01_05_43 PM.png";

const EASE = [0.2, 0.8, 0.2, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(16px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, delay: 0.15 + i * 0.1, ease: EASE },
  }),
};

const portraitReveal: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(28px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.5, delay: 0.3, ease: EASE },
  },
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, -140]);

  const mouseX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.02);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.02);
  };

  const socials = [
    { Icon: Linkedin, href: personal.social.linkedin, label: "LinkedIn" },
    { Icon: Mail, href: personal.social.email, label: "Email" },
    { Icon: Phone, href: personal.social.phone, label: "Phone" },
  ];

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-32">
      <div aria-hidden className="surface-grid pointer-events-none absolute inset-0 opacity-70" />
      <motion.div
        style={{ y: auroraY }}
        aria-hidden
        className="aurora absolute -top-32 left-1/2 h-[110vmin] w-[130vmin] -translate-x-1/2 opacity-70"
      />
      <div className="grain pointer-events-none absolute inset-0" />

      <motion.div
        style={{ y, scale, opacity }}
        onMouseMove={handleMouseMove}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16"
      >
        <div className="pb-8 lg:pb-0">
          <motion.div
            variants={reveal}
            custom={0}
            className="eyebrow-pill mb-6 text-xs font-semibold uppercase tracking-[0.28em]"
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
            className="font-display text-[clamp(3rem,8.2vw,7.25rem)] font-bold leading-[0.98] tracking-tight"
          >
            <SplitText text="Himanshi" className="block text-foreground" />
            <span className="block pb-2 text-primary text-glow">
              <SplitText text="Chawla." className="inline-block" />
            </span>
          </motion.h1>

          <motion.p
            variants={reveal}
            custom={2}
            className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-xl"
          >
            {personal.tagline} Currently serving as Head of Business Development & Co-Founder at
            NeoSankalp, with experience across cyber security analysis, technical support, SEO,
            content writing, and client management.
          </motion.p>

          <motion.div variants={reveal} custom={3} className="mt-8 flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                data-cursor={label}
                onHoverStart={() => setIsHovered(label)}
                onHoverEnd={() => setIsHovered(null)}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative grid h-12 w-12 place-items-center rounded-full border border-foreground/10 bg-paper/70 text-foreground shadow-[0_12px_30px_-20px_var(--foreground)] backdrop-blur transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                <Icon className="h-[18px] w-[18px]" />
                <AnimatePresence>
                  {isHovered === label && (
                    <motion.span
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.9 }}
                      className="absolute -bottom-8 whitespace-nowrap rounded bg-foreground px-2 py-1 text-[10px] text-background"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={reveal} custom={4} className="mt-10 flex flex-wrap items-center gap-4">
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="glow-btn group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-foreground px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-background"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <Download className="relative h-4 w-4" />
              <span className="relative">Contact Me</span>
            </motion.a>
            <a
              href="#projects"
              data-cursor="View"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-foreground/15 bg-paper/45 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-foreground shadow-[0_16px_40px_-30px_var(--foreground)] backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              View Work
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            custom={5}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group glass relative overflow-hidden rounded-2xl p-4 transition-colors hover:border-primary/30 hover:bg-primary/[0.04]"
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
          className="relative aspect-square w-full max-w-[460px] justify-self-center lg:max-w-[560px]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, color-mix(in oklab, var(--primary) 60%, transparent), transparent 35%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 70%, color-mix(in oklab, var(--primary) 50%, transparent), transparent)",
              filter: "blur(3px)",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-3 rounded-full glow-ring"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 25%, transparent), transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <div className="absolute inset-8 overflow-hidden rounded-[42%] border border-primary/30 shadow-[0_24px_90px_-45px_var(--foreground)] glow-ring">
            <motion.img
              src={portrait}
              alt={personal.name}
              width={1024}
              height={1024}
              className="h-full w-full object-cover [filter:contrast(1.04)_saturate(1.08)]"
              loading="eager"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 120%, color-mix(in oklab, var(--primary) 40%, transparent), transparent 60%)",
              }}
            />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 block h-4 w-4 rounded-full bg-primary shadow-[0_0_24px_var(--primary)]" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4"
          >
            <span className="absolute bottom-0 left-0 block h-2 w-2 rounded-full bg-foreground/30 shadow-[0_0_12px_var(--primary)]" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <span className="text-[11px] uppercase tracking-[0.25em]">Scroll to explore</span>
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}

import { AnimatePresence } from "framer-motion";
