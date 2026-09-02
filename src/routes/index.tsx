import { createFileRoute, HeadContent } from "@tanstack/react-router";
import "../styles.css";
import { useSmoothScroll } from "../lib/animation";
import { Intro } from "../components/Intro";
import { SiteNav } from "../components/SiteNav";
import { Hero } from "../components/Hero";
import { Profile } from "../components/Profile";
import { Ribbon } from "../components/Ribbon";
import { Work } from "../components/Work";
import { Trajectory } from "../components/Trajectory";
import { Contact } from "../components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Electrical Engineering & Embedded Systems" },
      {
        name: "description",
        content:
          "Electrical engineering graduate from EST Guelmim working across industrial installations, electrical maintenance and Arduino-driven embedded systems.",
      },
      { name: "theme-color", content: "#080808" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      // The hero portrait is the first thing on screen — fetch it with the document.
      { rel: "preload", as: "image", href: "/hero-portrait.webp" },
    ],
  }),
  component: Home,
});

function Home() {
  useSmoothScroll();

  return (
    <>
      <HeadContent />
      <Intro />
      <a className="skip-link" href="#profile">
        Skip to content
      </a>
      <SiteNav />
      <main>
        <Hero />
        <Profile />
        <Ribbon />
        <Work />
        <Trajectory />
        <Contact />
      </main>
    </>
  );
}
