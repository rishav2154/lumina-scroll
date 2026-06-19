import { createFileRoute } from "@tanstack/react-router";
import "@fontsource-variable/inter/index.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";

import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/cursor";
import { ScrollProgress } from "@/components/scroll-progress";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Himanshi Chawla — Founder, Operator, Technologist" },
      {
        name: "description",
        content:
          "The personal site of Himanshi Chawla — founder, product strategist, and engineer building category-defining tools at the edge of AI and craft.",
      },
      { property: "og:title", content: "Himanshi Chawla — Founder · Operator · Technologist" },
      {
        property: "og:description",
        content:
          "A premium interactive portfolio: cinematic scroll, 3D skills galaxy, real work, real numbers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
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
  );
}
