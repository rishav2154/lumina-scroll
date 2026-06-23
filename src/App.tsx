import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { PageLoader } from "@/components/page-loader";
import { Nav } from "@/components/nav";
import { Hero } from "@/sections/hero";
import { Marquee } from "@/sections/marquee";
import { About } from "@/sections/about";
import { Experience } from "@/sections/experience";
import { Skills } from "@/sections/skills";
import { Bento } from "@/sections/bento";
import { Projects } from "@/sections/projects";
import { Certs } from "@/sections/certs";
import { Contact } from "@/sections/contact";
import { Footer } from "@/sections/footer";
import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      <main className="relative">
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgress />
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Skills />
        <Bento />
        <Projects />
        <Certs />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
