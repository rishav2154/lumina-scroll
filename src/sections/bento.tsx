import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Counter } from "@/components/anim/counter";

function TiltCard({
  children,
  className,
  glare = true
}: {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={"relative transition-transform duration-200 ease-out " + (className ?? "")}
    >
      {glare && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${50 + springX.get() * 100}% ${50 + springY.get() * 100}%, rgba(255,255,255,0.15), transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

export function Bento() {
  return (
    <section id="metrics" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
      <div className="mb-12 flex items-end justify-between gap-6 border-b border-foreground/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-xs text-muted-foreground">
            04
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Profile Snapshot
            </div>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">
              Education, languages, and operating strengths.
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:grid-rows-2 lg:grid-cols-4">
        <TiltCard className="md:col-span-2 lg:col-span-2 lg:row-span-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.01 }}
            className="group relative h-full min-h-[340px] overflow-hidden rounded-3xl border border-foreground/10 bg-card p-8 transition-colors hover:border-primary/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10">
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Academic track
              </div>
              <div className="mt-4 flex items-end gap-2">
                <div className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-none tracking-tight">
                  <Counter to={2026} />
                </div>
                <div className="mb-2 text-3xl font-bold text-primary">MCA</div>
              </div>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Pursuing Masters of Computer Applications at Chandigarh University with Cloud Computing specialization.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-3">
                {[
                  { l: "BCA", v: 2023, suffix: "" },
                  { l: "Roles", v: 4, suffix: "" },
                  { l: "Certs", v: 4, suffix: "" },
                ].map((m) => (
                  <motion.div
                    key={m.l}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-foreground/[0.03] p-4 transition-colors hover:bg-foreground/5"
                  >
                    <div className="font-display text-xl font-medium">
                      <Counter to={m.v} />
                      {m.suffix ?? ""}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {m.l}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </TiltCard>

        <TiltCard className="md:col-span-1 lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="h-full min-h-[160px] overflow-hidden rounded-3xl border border-background/10 bg-foreground p-6 text-background transition-all"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-background/50">
              Languages
            </div>
            <div className="mt-3 font-display text-lg font-medium leading-snug">
              English · Intermediate
            </div>
            <div className="text-sm text-background/70">Hindi · Native</div>
            <div className="mt-6 flex items-center gap-2">
              <div className="h-1 w-full rounded-full bg-background/20">
                <div className="block h-full w-2/3 rounded-full bg-primary" />
              </div>
              <span className="text-xs text-background/60">2 languages</span>
            </div>
          </motion.div>
        </TiltCard>

        <TiltCard className="md:col-span-1 lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative h-full min-h-[160px] overflow-hidden rounded-3xl border border-foreground/10 bg-card p-6 transition-colors hover:border-primary/20"
          >
            <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative z-10">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Focus
              </div>
              <div className="mt-2 font-display text-xl font-medium">NeoSankalp</div>
              <div className="mt-1 text-sm text-muted-foreground">Business development, clients, partnerships</div>
            </div>
          </motion.div>
        </TiltCard>

        <TiltCard className="md:col-span-2 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            whileHover={{ scale: 1.01 }}
            className="h-full min-h-[140px] overflow-hidden rounded-3xl border border-foreground/10 bg-haze/50 p-6 transition-colors hover:border-primary/20"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Core direction
            </div>
            <p className="mt-3 max-w-xl font-display text-lg font-medium leading-snug">
              Building technology-driven solutions through cyber security awareness, cloud foundations, digital marketing, SEO, and client-focused project coordination.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-[11px] text-muted-foreground">
                Cloud Computing
              </span>
              <span className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-[11px] text-muted-foreground">
                Cyber Security · SEO · Business Development
              </span>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </section>
  );
}
