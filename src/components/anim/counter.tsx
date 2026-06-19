import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({ to, duration = 1.8 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration, ease: [0.2, 0.8, 0.2, 1] });
      return controls.stop;
    }
  }, [inView, to, duration, mv]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return rounded.on("change", (v) => {
      node.textContent = v;
    });
  }, [rounded]);

  return <span ref={ref}>0</span>;
}