import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import "../styles.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ayoub Aznag — Engineer & Developer" },
      {
        name: "description",
        content: "Electrical engineering, embedded systems, software, AI and cybersecurity.",
      },
    ],
  }),
  component: Hero,
});

function Hero() {
  const sequence = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sequence.current;
    if (!element) return;

    let frame = 0;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const distance = Math.max(element.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / distance, 0), 1);
      element.style.setProperty("--progress", progress.toFixed(4));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="hero-sequence" ref={sequence}>
      <HeadContent />
      <section className="hero-stage" aria-label="Introduction">
        <div className="stage-grain" aria-hidden="true" />
        <div className="technical-grid" aria-hidden="true" />
        <div className="stage-wash" aria-hidden="true" />

        <nav className="hero-nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="Ayoub Aznag home">
            AY<span>O</span>UB AZNAG
          </a>
          <div className="nav-index" aria-label="Sections">
            <span className="is-current">Index</span>
            <span>/</span>
            <span>Profile</span>
            <span>/</span>
            <span>Work</span>
            <span>/</span>
            <a href="https://github.com/cyber222398/PORTFOLIO" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <a className="nav-cta" href="mailto:ayoub.aznag.47@edu.uiz.ac.ma">
            Let&apos;s connect <i aria-hidden="true">↗</i>
          </a>
        </nav>

        <p className="closed-prompt">01 / 01 &nbsp;—&nbsp; Scroll to initiate</p>

        <div className="portrait-wrap" aria-hidden="true">
          <img className="portrait" src="/hero-portrait.png" alt="" />
        </div>

        <div className="hero-title" aria-label="Engineer Developer">
          <span className="title-line title-engineer">Engineer</span>
          <span className="title-line title-developer">Developer</span>
        </div>

        <div className="hero-connector" aria-hidden="true">
          <span className="connector-node" />
          <span className="connector-line" />
        </div>

        <aside className="hero-detail">
          <p className="detail-label">AYOUB AZNAG / 2026</p>
          <div className="detail-rule" />
          <p className="detail-copy">
            Electrical engineering, embedded systems, software development, AI / APIs and
            cybersecurity.
          </p>
          <a href="mailto:ayoub.aznag.47@edu.uiz.ac.ma" className="detail-link">
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </aside>

        <div className="corner-data corner-left">CASABLANCA / MOROCCO</div>
        <div className="corner-data corner-right">SYSTEM / ONLINE</div>
      </section>
    </main>
  );
}
