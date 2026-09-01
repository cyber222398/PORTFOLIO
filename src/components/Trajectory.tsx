import { useRef } from "react";
import gsap from "gsap";
import { trajectory } from "../content";
import { Reveal } from "./Reveal";
import { useGsap } from "../lib/animation";

export function Trajectory() {
  const scope = useRef<HTMLElement>(null);

  useGsap(({ scope: el }) => {
    gsap.from(el.querySelectorAll(".track-word"), {
      yPercent: 110,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.07,
      scrollTrigger: { trigger: el, start: "top 72%", once: true },
    });

    // Each row's hairline draws left-to-right as it enters.
    el.querySelectorAll<HTMLElement>(".track-row").forEach((row) => {
      gsap.from(row, {
        opacity: 0,
        y: 30,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 90%", once: true },
      });
      gsap.from(row.querySelector(".track-rule"), {
        scaleX: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: row, start: "top 90%", once: true },
      });
    });
  }, scope);

  return (
    <section className="track" id="track" ref={scope} aria-label="Track record">
      <div className="track-head">
        <Reveal as="p" className="section-label">
          (Track record)
        </Reveal>
        <h2 className="track-title">
          <span className="track-word">Where</span> <span className="track-word">I</span>{" "}
          <span className="track-word">have</span>{" "}
          <span className="track-word track-word-accent">been</span>
        </h2>
      </div>

      <ol className="track-list">
        {trajectory.map((item) => (
          <li className="track-row" key={item.index}>
            <span className="track-rule" aria-hidden="true" />
            <span className="track-index">{item.index}.</span>
            <div className="track-main">
              <h3 className="track-role">{item.title}</h3>
              <p className="track-org">{item.org}</p>
            </div>
            <p className="track-period">{item.period}</p>
            <p className="track-detail">{item.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
