import { motion } from "framer-motion";
import { certifications } from "@/lib/data";

export function Certs() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40">
      <div className="mb-12">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          06 · Certification vault
        </div>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-medium tracking-tight">
          Receipts for the curiosity.
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <motion.li
            key={c.title}
            initial={{ opacity: 0, y: 40, rotate: -2, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card p-6"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/40 via-transparent to-primary/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ padding: 1 }} />
            <div className="relative">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{c.issuer}</span>
                <span>{c.year}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-medium leading-snug">{c.title}</h3>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Verified</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/30 text-primary">
                  ✓
                </span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}