import { motion } from "framer-motion";
import { SkillsGalaxy } from "@/components/three/skills-galaxy";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-foreground text-background">
      <div className="grain absolute inset-0 opacity-50" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-32 sm:py-40 lg:grid-cols-2">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-background/60">
            03 · The toolkit
          </div>
          <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-medium tracking-tight">
            A galaxy of disciplines, one operator.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-sm text-background/70">
            I've spent a decade refusing to specialize in just one thing. The galaxy on the right
            is interactive — every node is a discipline I ship in production.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2">
            {skills.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group flex items-center gap-3 rounded-xl border border-background/10 bg-background/5 px-3 py-2.5 backdrop-blur transition-colors hover:bg-background/10"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: `hsl(${s.hue} 80% 60%)` }}
                />
                <span className="flex-1 text-sm">{s.name}</span>
                <div className="h-1 w-16 overflow-hidden rounded-full bg-background/15">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                    className="h-full"
                    style={{ background: `hsl(${s.hue} 80% 60%)` }}
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-square w-full max-w-[600px] justify-self-center">
          <SkillsGalaxy />
        </div>
      </div>
    </section>
  );
}