import { personal } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-background/10 bg-foreground text-background/70">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <div className="font-display text-sm">
          © {new Date().getFullYear()} {personal.name}. Designed in motion.
        </div>
        <div className="text-xs uppercase tracking-[0.25em] text-background/40">
          Built with React · GSAP · Lenis · Three
        </div>
      </div>
    </footer>
  );
}