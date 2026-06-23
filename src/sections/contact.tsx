import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { personal } from "@/lib/data";
import { Send, ArrowUpRight, CircleCheck as CheckCircle2, Loader as Loader2 } from "lucide-react";

function MagneticButton({
  children,
  href,
  type,
  onClick
}: {
  children: React.ReactNode;
  href?: string;
  type?: "submit" | "button";
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const className =
    "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground will-change-transform";

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.97 }}
        className={className}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      {children}
    </motion.button>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const float = focused || val.length > 0;
  const ref = useRef<HTMLLabelElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const common = {
    name,
    value: val,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setVal(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className:
      "peer w-full resize-none bg-transparent text-foreground placeholder-transparent outline-none text-base",
  } as const;

  return (
    <motion.label
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative block border-b border-foreground/10 pt-7 pb-3 transition-all focus-within:border-primary"
    >
      <span
        className={
          "pointer-events-none absolute left-0 transition-all duration-300 " +
          (float
            ? "top-0 text-[11px] font-medium uppercase tracking-[0.2em] text-primary"
            : "top-7 text-base text-muted-foreground")
        }
      >
        {label}
      </span>
      {textarea ? (
        <textarea rows={4} placeholder={label} {...common} />
      ) : (
        <input type={type} placeholder={label} {...common} />
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-primary"
      />
    </motion.label>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative overflow-hidden bg-foreground text-background">
      <div className="absolute -top-60 -right-40 h-[70vmin] w-[70vmin] opacity-40 blur-3xl">
        <div className="aurora h-full w-full" />
      </div>
      <div className="grain absolute inset-0 opacity-40" />

      <div ref={ref} className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 sm:py-32 lg:grid-cols-2 lg:gap-20 lg:py-40">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 text-xs text-background/50">
              07
            </div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-background/40">
              Command center
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-tight"
          >
            Let's build something
            <br />
            <span className="text-primary">unmistakable.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-background/60"
          >
            Always reading messages from founders, operators, and curious humans. Tell me what
            you're trying to make happen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 space-y-4"
          >
            <a
              href={`mailto:${personal.email}`}
              className="group flex items-center gap-2 text-background/80 transition-colors hover:text-primary"
            >
              {personal.email}
              <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </a>
            <div className="flex items-center gap-2 text-sm text-background/50">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {personal.location}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {Object.entries(personal.social).map(([k, v]) => (
              <a
                key={k}
                href={v}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-background/15 px-4 py-2 text-xs font-medium uppercase tracking-wider text-background/60 transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                {k}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 blur-2xl" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setSent(true);
              }, 1500);
            }}
            className="relative rounded-3xl border border-background/10 bg-background/95 p-8 text-foreground backdrop-blur"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex min-h-[360px] flex-col items-center justify-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium">Signal received.</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  I'll reply within 48 hours, often sooner.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm text-primary underline-offset-4 hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <div className="space-y-1">
                <Field label="Your name" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field label="What are you building?" name="message" textarea />
                <div className="pt-8">
                  <MagneticButton type="submit">
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send transmission
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </MagneticButton>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
