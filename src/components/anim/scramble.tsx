import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function Scramble({ text, className }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);
  const frame = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    const from = out;
    const length = Math.max(from.length, text.length);
    for (let i = 0; i < length; i++) {
      const fromCh = from[i] || "";
      const toCh = text[i] || "";
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 30) + 10;
      queue.push({ from: fromCh, to: toCh, start, end });
    }
    frame.current = 0;
    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        let char = queue[i].char;
        if (frame.current >= end) {
          complete++;
          output += to;
        } else if (frame.current >= start) {
          if (!char || Math.random() < 0.28) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)];
            queue[i].char = char;
          }
          output += `<span class="text-primary">${char}</span>`;
        } else {
          output += from;
        }
      }
      setOut(output);
      if (complete !== queue.length) {
        frame.current++;
        raf.current = requestAnimationFrame(update);
      }
    };
    raf.current = requestAnimationFrame(update);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: out }} />;
}