import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { SplitText } from "@/components/anim/split-text";

const lines = [
  "I bridge technology and",
  "real-world business solutions —",
  "combining cloud, cyber security,",
  "digital strategy, and client growth.",
];

const pillars = [
  {
    k: "Studying",
    v: "MCA student at Chandigarh University specializing in Cloud Computing, with a BCA foundation from GGSIPU.",
    icon: "01",
  },
  {
    k: "Currently",
    v: "Head of Business Development & Co-Founder at NeoSankalp, focused on growth strategy, clients, partnerships, and digital presence.",
    icon: "02",
  },
  {
    k: "Expertise",
    v: "Cyber Security, Cloud Computing, Digital Marketing, SEO, Content Strategy, Client Management, Web Technologies, and Programming.",
    icon: "03",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} id="about" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
      <div className="section-shell relative overflow-hidden px-5 py-8 sm:px-8 lg:px-10">
        <div aria-hidden className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mb-12 flex items-end justify-between gap-6 border-b border-foreground/5 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-xs text-muted-foreground">
              01
            </div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              About me
            </div>
          </div>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Cloud · Cyber · Growth
          </div>
        </div>

        <div className="font-display text-[clamp(1.9rem,4.7vw,3.8rem)] font-medium leading-[1.08] tracking-tight text-foreground">
          {lines.map((l, i) => {
            const opacity = useTransform(
              scrollYProgress,
              [0.08 + i * 0.07, 0.22 + i * 0.07],
              [0.15, 1]
            );
            const blur = useTransform(
              scrollYProgress,
              [0.08 + i * 0.07, 0.26 + i * 0.07],
              ["10px", "0px"]
            );
            const y = useTransform(
              scrollYProgress,
              [0.08 + i * 0.07, 0.22 + i * 0.07],
              [16, 0]
            );

            return (
              <motion.p
                key={i}
                style={{ opacity, filter: useTransform(blur, (b) => `blur(${b})`), y }}
                className="block"
              >
                {l}
              </motion.p>
            );
          })}
        </div>

        <div className="mt-20 grid gap-4 border-t border-foreground/5 pt-12 md:grid-cols-3">
          {pillars.map((c, i) => (
            <motion.div
              key={c.k}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative rounded-3xl border border-foreground/5 bg-paper/55 p-6 shadow-[0_18px_60px_-46px_var(--foreground)] transition-all hover:-translate-y-1 hover:border-primary/20 hover:bg-primary/[0.035]"
            >
              <div className="absolute -left-3 top-0 flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-medium text-muted-foreground transition-colors group-hover:text-primary">
                {c.icon}
              </div>
              <div className="pl-8">
                <SplitText
                  text={c.k}
                  className="block font-display text-xl font-medium text-foreground"
                />
                <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
                  {c.v}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 rounded-full border border-foreground/5 bg-foreground/[0.02] px-5 py-2.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">
              Available at {""}
              <span className="text-foreground">chawlahimanshi2002@gmail.com</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
