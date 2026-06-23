import { motion } from "framer-motion";
import { press } from "@/lib/data";

export function Marquee() {
  const items = [...press, ...press];

  return (
    <section
      aria-label="Press & recognition"
      className="relative border-y border-foreground/5 bg-paper/50 py-5"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-paper via-transparent to-paper opacity-80" />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-paper to-transparent" />

        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="marquee-track flex w-max gap-10 whitespace-nowrap"
        >
          {items.map((p, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-sm font-medium text-muted-foreground"
            >
              <span className="transition-colors hover:text-primary">{p}</span>
              <span className="h-1 w-1 rounded-full bg-primary/50" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
