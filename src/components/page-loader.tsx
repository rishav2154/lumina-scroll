import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 20 + 8, 100);
        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setLoading(false);
        setTimeout(onComplete, 800);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  className="h-14 w-14 rounded-full border-2 border-transparent border-t-primary"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-1.5 rounded-full border border-transparent border-b-primary/40"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-center"
            >
              <div className="font-display text-3xl font-bold tracking-tight text-foreground">
                HC
              </div>
              <div className="mt-5 h-0.5 w-36 overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 font-mono text-xs tabular-nums text-muted-foreground">
                {Math.round(progress)}%
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-[10px] uppercase tracking-[0.35em] text-muted-foreground"
            >
              {progress < 30 ? "Initializing" : progress < 65 ? "Loading assets" : progress < 90 ? "Almost ready" : "Welcome"}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
