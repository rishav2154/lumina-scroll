import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "click" | "text" | "drag";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
    document.documentElement.classList.add("no-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let scale = 1;
    let target = 1;
    let opacity = 1;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setVisible(true);

      const t = e.target as HTMLElement;
      const cursorAttr = t.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorAttr) {
        if (cursorAttr === "text" || cursorAttr === "drag") {
          setState(cursorAttr as CursorState);
          setText("");
          target = 1;
        } else {
          setState("hover");
          setText(cursorAttr);
          target = 1.5;
        }
      } else if (t.closest('a, button, [role="button"]')) {
        setState("hover");
        setText("");
        target = 2.2;
      } else if (t.closest("input, textarea, [contenteditable]")) {
        setState("text");
        setText("");
        target = 1;
      } else {
        setState("default");
        setText("");
        target = 1;
      }
    };

    const onDown = () => {
      setState((s) => (s === "hover" ? "click" : s));
      scale = 0.85;
    };

    const onUp = () => {
      scale = 1;
      setState((s) => (s === "click" ? "hover" : s));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const raf = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.15;
      ringPos.y += (pos.y - ringPos.y) * 0.15;
      scale += (target - scale) * 0.15;

      if (dot.current) {
        dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${scale})`;
        ring.current.style.opacity = String(opacity);
      }

      requestAnimationFrame(raf);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("no-cursor");
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{
          transition: "border-color 0.2s, background-color 0.2s",
        }}
      >
        <div
          className="flex items-center justify-center rounded-full border transition-all duration-200"
          style={{
            width: state === "text" ? "2px" : state === "drag" ? "64px" : "44px",
            height: state === "text" ? "24px" : state === "drag" ? "64px" : "44px",
            borderColor: state === "hover" || state === "click" ? "var(--primary)" : "oklch(0.18 0.02 260 / 0.4)",
            backgroundColor: state === "click" ? "oklch(0.66 0.22 28 / 0.1)" : "transparent",
            borderRadius: state === "text" ? "2px" : "50%",
          }}
        >
          {text && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
              {text}
            </span>
          )}
        </div>
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full bg-foreground mix-blend-difference md:block"
        style={{
          width: state === "text" ? "4px" : "6px",
          height: state === "text" ? "4px" : "6px",
          transition: "width 0.15s, height 0.15s",
        }}
      />
    </>
  );
}
