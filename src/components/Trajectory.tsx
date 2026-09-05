import { useRef } from "react";
import gsap from "gsap";
import { trajectory } from "../content";
import { useGsap } from "../lib/animation";
import { TypingTitle } from "./TypingTitle";
import agmLogo from "../../logos/AGM LOGO.png";
import estLogo from "../../logos/EST LOGO.png";

const educationLogos = [agmLogo, agmLogo, estLogo];

/** Editorial education timeline using only the existing experience and project material. */
export function Trajectory() {
  const scope = useRef<HTMLElement>(null);

  useGsap(({ scope: el }) => {
    gsap.from(el.querySelectorAll(".typing-title-value"), {
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

      const node = row.querySelector<HTMLElement>(".education-number");
      if (node) {
        gsap.fromTo(
          node,
          { boxShadow: "0 0 0 5px rgba(255, 88, 22, 0.04), 0 0 8px rgba(255, 88, 22, 0.12)" },
          {
            boxShadow: "0 0 0 7px rgba(255, 88, 22, 0.1), 0 0 24px rgba(255, 88, 22, 0.5)",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          },
        );
      }
    });
  }, scope);

  return (
    <section className="education" id="track" ref={scope} aria-labelledby="education-title">
      <div className="education-head">
        <TypingTitle
          id="education-title"
          className="education-title"
          title={"My Education\nJourney"}
          expression="Q = U × I × sinφ"
          accentLines={[1]}
        />
      </div>

      <div className="education-layout">
        <div className="education-content">
          <ol className="education-list">
          {trajectory.map((item) => (
            <li className="education-row" key={item.index}>
              <span className="education-number">{item.index}</span>
              <div className="education-card">
                <div className="education-main">
                  <p className="education-period">{item.period}</p>
                  <h3>{item.title}</h3>
                  <p className="education-org">{item.org}</p>
                </div>
                <span
                  className="education-logo"
                  aria-label={educationLogos[Number(item.index) - 1] ? `${item.org} logo` : undefined}
                >
                  {educationLogos[Number(item.index) - 1] && (
                    <img src={educationLogos[Number(item.index) - 1]} alt="" />
                  )}
                </span>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
