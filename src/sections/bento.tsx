import { motion } from "framer-motion";
import { useRef } from "react";
import { Counter } from "@/components/anim/counter";

function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={"relative transition-transform duration-300 ease-out " + (className ?? "")}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function Bento() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40">
      <div className="mb-12">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          04 · Digital DNA
        </div>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-medium tracking-tight">
          The dashboard behind the founder.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 lg:grid-cols-4">
        <Tilt className="md:col-span-2 lg:col-span-2 lg:row-span-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative h-full min-h-[320px] overflow-hidden rounded-3xl border border-foreground/10 bg-card p-8"
            style={{
              backgroundImage:
                "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%)",
            }}
          >
            <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Lifetime impact
            </div>
            <div className="mt-2 flex items-end gap-2">
              <div className="font-display text-[clamp(3.5rem,8vw,7rem)] font-medium leading-none tracking-tight">
                <Counter to={2400000} />
              </div>
              <div className="mb-3 text-2xl text-primary">+</div>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Humans served across the products I've built, led, or advised.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { l: "NPS", v: 72 },
                { l: "Retention", v: 91, suffix: "%" },
                { l: "Talks", v: 48 },
              ].map((m) => (
                <div key={m.l} className="rounded-2xl bg-paper/60 p-4">
                  <div className="font-display text-2xl font-medium">
                    <Counter to={m.v} />
                    {m.suffix ?? ""}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </Tilt>

        <Tilt>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="h-full min-h-[180px] overflow-hidden rounded-3xl border border-foreground/10 bg-foreground p-6 text-background"
          >
            <div className="text-[11px] uppercase tracking-[0.25em] text-background/60">
              Currently reading
            </div>
            <div className="mt-3 font-display text-xl leading-snug">
              "The Beginning of Infinity" — David Deutsch
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-background/60">
              <span className="h-1 w-16 rounded-full bg-background/20">
                <span className="block h-full w-2/3 rounded-full bg-primary" />
              </span>
              68%
            </div>
          </motion.div>
        </Tilt>

        <Tilt>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative h-full min-h-[180px] overflow-hidden rounded-3xl border border-foreground/10 bg-card p-6"
          >
            <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Studio
            </div>
            <div className="mt-3 font-display text-2xl">Bengaluru — 09:41</div>
            <div className="mt-1 text-sm text-muted-foreground">28°C · clear</div>
            <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />
          </motion.div>
        </Tilt>

        <Tilt className="md:col-span-2 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="h-full min-h-[180px] overflow-hidden rounded-3xl border border-foreground/10 bg-paper p-6"
          >
            <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Now writing
            </div>
            <p className="mt-3 max-w-xl font-display text-xl leading-snug text-pretty">
              "Calm products win: how restraint becomes the competitive edge in an over-stimulated decade."
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-foreground/5 px-2 py-1">Essay · in progress</span>
              <span className="rounded-full bg-foreground/5 px-2 py-1">3 of 7 sections</span>
            </div>
          </motion.div>
        </Tilt>
      </div>
    </section>
  );
}