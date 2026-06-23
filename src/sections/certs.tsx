import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { certifications } from "@/lib/data";
import { ExternalLink, Award } from "lucide-react";

export function Certs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="certifications" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
      <div className="mb-12 flex items-end justify-between gap-6 border-b border-foreground/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-xs text-muted-foreground">
            06
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Certification vault
            </div>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">
              Receipts for the curiosity.
            </h2>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
          <Award className="h-4 w-4" />
          {certifications.length} verified
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <motion.li
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 text-[10px] text-muted-foreground">
                    {c.year.slice(-2)}
                  </div>
                  <span className="text-xs text-muted-foreground">{c.issuer}</span>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>

              <h3 className="mt-4 font-display text-lg font-medium leading-snug">
                {c.title}
              </h3>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Verified
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 400, delay: 0.2 + i * 0.05 }}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 text-primary"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
