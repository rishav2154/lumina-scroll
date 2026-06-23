import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { SplitText } from "@/components/anim/split-text";
import { personal, stats } from "@/lib/data";
import { Counter } from "@/components/anim/counter";
import { Github, Linkedin, Twitter, Send, Download } from "lucide-react";

const portrait = "https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1024";

const EASE = [0.2, 0.8, 0.2, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(14px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, delay: 0.15 + i * 0.12, ease: EASE },
  }),
};

const portraitReveal: Variants = {
  hidden: { opacity: 0, scale: 0.86, filter: "blur(24px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, delay: 0.2, ease: EASE },
  },
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden pt-32">
      <motion.div
        style={{ y: auroraY }}
        aria-hidden
        className="aurora absolute -top-20 left-1/2 h-[90vmin] w-[110vmin] -translate-x-1/2 opacity-80"
      />
      <div className="grain pointer-events-none absolute inset-0" />

      <motion.div
        style={{ y, scale, opacity }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.1fr_1fr]"
      >
        <div>
          <motion.div
            variants={reveal}
            custom={0}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary text-glow"
          >
            <span className="h-px w-8 bg-primary" />
            Hi, I'm {personal.name.split(" ")[0]}
          </motion.div>

          <motion.h1
            variants={reveal}
            custom={1}
            className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-glow"
          >
            <SplitText text="Founder &" className="block text-foreground" />
            <SplitText text="Technologist." className="block text-primary" />
          </motion.h1>

          <motion.p
            variants={reveal}
            custom={2}
            className="mt-7 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            {personal.tagline} A persistent optimist about software that
            respects people, building products at the intersection of design,
            AI, and human ambition.
          </motion.p>

          {/* Social icons */}
          <motion.div
            variants={reveal}
            custom={3}
            className="mt-8 flex items-center gap-3"
          >
            {[
              { Icon: Github, href: personal.social.github, label: "GitHub" },
              { Icon: Linkedin, href: personal.social.linkedin, label: "LinkedIn" },
              { Icon: Twitter, href: personal.social.twitter, label: "Twitter" },
              { Icon: Send, href: `mailto:${personal.email}`, label: "Email" },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ y: -3, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="grid h-11 w-11 place-items-center rounded-full border border-primary/40 bg-paper/40 text-primary backdrop-blur transition-colors hover:bg-primary/10"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={reveal}
            custom={4}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="glow-btn group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-primary-foreground"
            >
              <Download className="h-4 w-4" />
              Download CV
            </motion.a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-primary/10"
            >
              View Work
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            custom={5}
            className="mt-14 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s) => (
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

        <motion.div
          variants={portraitReveal}
          className="relative aspect-square w-full max-w-[560px] justify-self-center"
        >
          {/* Outer rotating glow ring */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, color-mix(in oklab, var(--primary) 70%, transparent), transparent 40%, color-mix(in oklab, var(--primary) 40%, transparent), transparent 80%)",
              filter: "blur(2px)",
            }}
          />
          {/* Pulsing halo */}
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-3 rounded-full glow-ring"
          />
          {/* Portrait disc */}
          <div className="absolute inset-8 overflow-hidden rounded-full border border-primary/40 glow-ring">
            <img
              src={portrait}
              alt={personal.name}
              width={1024}
              height={1024}
              className="h-full w-full object-cover [filter:contrast(1.05)_saturate(1.05)]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 110%, color-mix(in oklab, var(--primary) 35%, transparent), transparent 55%)",
              }}
            />
          </div>
          {/* Orbiting dot */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 block h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
          </motion.div>
        </motion.div>
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