import { lazy, Suspense, useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { Nav } from "@/components/nav";
import { Hero } from "@/sections/hero";

const Marquee = lazy(() => import("@/sections/marquee").then(m => ({ default: m.Marquee })));
const About = lazy(() => import("@/sections/about").then(m => ({ default: m.About })));
const Experience = lazy(() => import("@/sections/experience").then(m => ({ default: m.Experience })));
const Skills = lazy(() => import("@/sections/skills").then(m => ({ default: m.Skills })));
const Bento = lazy(() => import("@/sections/bento").then(m => ({ default: m.Bento })));
const Projects = lazy(() => import("@/sections/projects").then(m => ({ default: m.Projects })));
const Certs = lazy(() => import("@/sections/certs").then(m => ({ default: m.Certs })));
const Contact = lazy(() => import("@/sections/contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/sections/footer").then(m => ({ default: m.Footer })));

const PageLoader = memo(function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 18 + 10, 100));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setLoading(false);
        setTimeout(onComplete, 600);
      }, 150);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="h-12 w-12 rounded-full border-2 border-transparent border-t-primary"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-1 rounded-full border border-transparent border-b-primary/40"
                />
              </div>
            </motion.div>

            <div className="font-display text-2xl font-bold">HC</div>
            <div className="mt-5 h-0.5 w-32 overflow-hidden rounded-full bg-foreground/10">
              <motion.div
                className="h-full rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 font-mono text-xs tabular-nums text-muted-foreground">
              {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

const SectionFallback = memo(function SectionFallback() {
  return (
    <div className="min-h-[50vh] animate-pulse bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="h-8 w-32 rounded bg-foreground/5" />
        <div className="mt-6 h-12 w-2/3 rounded bg-foreground/5" />
      </div>
    </div>
  );
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className="relative">
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgress />
        <Nav />
        <Hero />

        <Suspense fallback={<SectionFallback />}>
          <Marquee />
          <About />
          <Experience />
          <Skills />
          <Bento />
          <Projects />
          <Certs />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}

export default App;
