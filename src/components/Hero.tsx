import { useEffect, useRef } from "react";
import { profile } from "../content";

/**
 * Opening scene. Scroll drives a single `--progress` custom property and the whole
 * composition (portrait clip, title, side panel) is keyframed off it in CSS, so the
 * heavy work stays on the compositor rather than in JS.
 */
export function Hero() {
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
    <section className="hero-sequence" ref={sequence} id="top">
      <div className="hero-stage" aria-label="Introduction">
        <div className="stage-grain" aria-hidden="true" />
        <div className="technical-grid" aria-hidden="true" />
        <div className="stage-wash" aria-hidden="true" />

        <p className="closed-prompt">01 / 01 &nbsp;—&nbsp; Scroll to initiate</p>

        <div className="portrait-wrap" aria-hidden="true">
          <img className="portrait" src="/hero-portrait.webp" alt="" width="1600" height="900" />
        </div>

        <h1 className="hero-title">
          <span className="title-line title-engineer">Engineer</span>
          <span className="title-line title-developer">Developer</span>
        </h1>

        <div className="hero-connector" aria-hidden="true">
          <span className="connector-node" />
          <span className="connector-line" />
        </div>

        <aside className="hero-detail">
          <p className="detail-label">
            {profile.name} / {profile.year}
          </p>
          <div className="detail-rule" />
          <p className="detail-copy">
            Electrical engineering, industrial installations, embedded systems and
            Arduino-driven machines.
          </p>
          <a href={`mailto:${profile.email}`} className="detail-link">
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </aside>

        <div className="corner-data corner-left">
          {profile.location.toUpperCase().replace(", ", " / ")}
        </div>
        <div className="corner-data corner-right">SYSTEM / ONLINE</div>
      </div>
    </section>
  );
}
