import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("no-cursor");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let scale = 1;
    let target = 1;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = e.target as HTMLElement;
      const hov = t.closest('a, button, [data-cursor="hover"], input, textarea');
      target = hov ? 2.4 : 1;
    };

    const raf = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      scale += (target - scale) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${scale})`;
      requestAnimationFrame(raf);
    };

    window.addEventListener("mousemove", onMove);
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("no-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-9 w-9 rounded-full border border-foreground/40 mix-blend-difference md:block"
        style={{ transition: "border-color .2s" }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-foreground mix-blend-difference md:block"
      />
    </>
  );
}