import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitText } from "@/components/anim/split-text";

const lines = [
  "I build companies that treat",
  "software as cultural infrastructure —",
  "tools that quietly raise the ceiling",
  "on what teams can imagine.",
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section
      ref={ref}
      id="about"
      className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40"
    >
      <div className="mb-12 flex items-end justify-between gap-6">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          01 · The premise
        </div>
        <div className="hidden text-xs text-muted-foreground sm:block">
          Written long-form · scroll
        </div>
      </div>

      <div className="font-display text-[clamp(1.8rem,4.6vw,3.6rem)] font-medium leading-[1.1] tracking-tight">
        {lines.map((l, i) => {
          const opacity = useTransform(
            scrollYProgress,
            [0.05 + i * 0.08, 0.18 + i * 0.08],
            [0.18, 1],
          );
          const blur = useTransform(
            scrollYProgress,
            [0.05 + i * 0.08, 0.22 + i * 0.08],
            ["12px", "0px"],
          );
          return (
            <motion.p
              key={i}
              style={{ opacity, filter: useTransform(blur, (b) => `blur(${b})`) }}
              className="block"
            >
              {l}
            </motion.p>
          );
        })}
      </div>

      <div className="mt-20 grid gap-10 border-t border-foreground/10 pt-12 md:grid-cols-3">
        {[
          { k: "Operating", v: "9+ years across product, design, and engineering leadership." },
          { k: "Currently", v: "Founder & CEO at Lumen Labs — AI-native workspace for creative teams." },
          { k: "Believing", v: "Craft compounds. Distribution rewards taste. Calm beats clever." },
        ].map((c) => (
          <motion.div
            key={c.k}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <SplitText
              text={c.k}
              className="block font-display text-xl font-medium text-primary"
            />
            <p className="mt-2 max-w-sm text-pretty text-sm text-muted-foreground">{c.v}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}