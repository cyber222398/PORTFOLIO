import { useRef } from "react";
import gsap from "gsap";
import { trajectory } from "../content";
import { useGsap } from "../lib/animation";

/** Editorial education timeline using only the existing experience and project material. */
export function Trajectory() {
  const scope = useRef<HTMLElement>(null);

  useGsap(({ scope: el }) => {
    gsap.from(el.querySelectorAll(".education-word"), {
      yPercent: 110,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 72%", once: true },
    });
    el.querySelectorAll<HTMLElement>(".education-row").forEach((row) => {
      gsap.from(row, {
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 88%", once: true },
      });
    });
  }, scope);

  return (
    <section className="education" id="track" ref={scope} aria-labelledby="education-title">
      <aside className="education-aside">
        <p className="education-kicker">
          <i /> Education
        </p>
        <h2 id="education-title" className="education-title">
          <span className="education-word">MY</span>
          <span className="education-word">EDUCATION</span>
          <span className="education-word is-accent">JOURNEY</span>
        </h2>
        <p className="education-subtitle">FROM CURIOSITY TO ENGINEERING REAL SOLUTIONS.</p>
        <p className="education-aside-note">
          Electrical engineering
          <br />
          Embedded systems
          <br />
          Automation and beyond
        </p>
      </aside>

      <div className="education-content">
        <p className="education-status">
          Learning <b>—</b> Building <b>—</b> Evolving
        </p>
        <ol className="education-list">
          {trajectory.map((item, index) => (
            <li className="education-row" key={item.index}>
              <span className="education-number">{item.index}</span>
              <div className="education-main">
                <p className="education-period">{item.period}</p>
                <h3>{item.title}</h3>
                <p className="education-org">{item.org}</p>
                <small>
                  {index === 0
                    ? "Research / conception / implementation"
                    : index === 1
                      ? "Discovery / learning / fieldwork"
                      : index === 2
                        ? "Foundation / projects / technical"
                        : "Continuity / specialisation / ambition"}
                </small>
              </div>
              <p className="education-detail">{item.detail}</p>
            </li>
          ))}
        </ol>
        <p className="education-caption">More than a diploma — a continuous progress</p>
      </div>
    </section>
  );
}
