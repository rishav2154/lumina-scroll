import { press } from "@/lib/data";

export function Marquee() {
  const items = [...press, ...press];
  return (
    <section
      aria-label="Press & recognition"
      className="relative border-y border-foreground/10 bg-paper py-6"
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap text-sm text-muted-foreground">
          {items.map((p, i) => (
            <span key={i} className="flex items-center gap-12 font-display">
              {p}
              <span className="h-1 w-1 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}