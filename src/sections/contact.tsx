import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { personal } from "@/lib/data";

function MagneticButton({ children, href, type, onClick }: { children: React.ReactNode; href?: string; type?: "submit" | "button"; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.3;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };
  const className =
    "magnetic inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground will-change-transform";
  if (href) {
    return (
      <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={reset} className={className}>
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </button>
  );
}

function Field({ label, name, type = "text", textarea }: { label: string; name: string; type?: string; textarea?: boolean }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const float = focused || val.length > 0;
  const common = {
    name,
    value: val,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setVal(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: "peer w-full resize-none bg-transparent text-foreground placeholder-transparent outline-none",
  } as const;
  return (
    <label className="relative block border-b border-foreground/15 pt-6 pb-2 transition-colors focus-within:border-primary">
      <span
        className={
          "pointer-events-none absolute left-0 transition-all duration-300 " +
          (float
            ? "top-0 text-[11px] uppercase tracking-[0.25em] text-primary"
            : "top-6 text-base text-muted-foreground")
        }
      >
        {label}
      </span>
      {textarea ? (
        <textarea rows={3} placeholder={label} {...common} />
      ) : (
        <input type={type} placeholder={label} {...common} />
      )}
    </label>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden bg-foreground text-background">
      <div className="aurora absolute -top-40 right-0 h-[60vmin] w-[60vmin] opacity-50" />
      <div className="grain absolute inset-0 opacity-50" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-32 sm:py-40 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-background/50">
            07 · Command center
          </div>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[1] tracking-tight">
            Let's build something
            <br />
            <span className="text-primary">unmistakable.</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty text-background/70">
            Always reading messages from founders, operators, and curious humans. Tell me what
            you're trying to make happen.
          </p>

          <div className="mt-10 space-y-3 text-sm">
            <a href={`mailto:${personal.email}`} className="block text-background/80 hover:text-primary">
              {personal.email}
            </a>
            <div className="text-background/60">{personal.location}</div>
          </div>

          <div className="mt-10 flex gap-3">
            {Object.entries(personal.social).map(([k, v]) => (
              <a
                key={k}
                href={v}
                className="rounded-full border border-background/15 px-4 py-2 text-xs uppercase tracking-wider text-background/70 transition-colors hover:border-primary hover:text-primary"
              >
                {k}
              </a>
            ))}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="glass rounded-3xl p-8 text-foreground"
          style={{
            background: "color-mix(in oklab, var(--paper) 92%, transparent)",
          }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex min-h-[320px] flex-col items-center justify-center text-center"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
                ✓
              </div>
              <h3 className="mt-5 font-display text-2xl">Signal received.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                I'll reply within 48 hours, often sooner.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <Field label="Your name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="What are you building?" name="message" textarea />
              <div className="pt-6">
                <MagneticButton type="submit">
                  Send transmission →
                </MagneticButton>
              </div>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}