import { useRef } from "react";
import gsap from "gsap";
import { capabilities, credentials, intro, languages } from "../content";
import { Reveal } from "./Reveal";
import { useGsap } from "../lib/animation";

export function Profile() {
  const scope = useRef<HTMLElement>(null);

  useGsap(({ scope: el }) => {
    // Capability tiles settle in on a soft diagonal.
    gsap.from(el.querySelectorAll(".cap-tile"), {
      opacity: 0,
      y: 26,
      duration: 0.7,
      ease: "power3.out",
      stagger: { each: 0.045, from: "start" },
      scrollTrigger: { trigger: el.querySelector(".cap-grid"), start: "top 82%", once: true },
    });

    // Rule under each credential row draws itself.
    gsap.from(el.querySelectorAll(".cred-row"), {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: el.querySelector(".cred-table"), start: "top 85%", once: true },
    });
  }, scope);

  return (
    <section className="profile" id="profile" ref={scope} aria-label="Profile">
      <div className="profile-grid">
        <div className="profile-left">
          <Reveal as="p" className="section-label">
            What I work on
          </Reveal>

          <div className="cap-grid">
            {capabilities.map((cap, index) => (
              <span className="cap-tile" key={cap}>
                <span className="cap-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{cap}</span>
              </span>
            ))}
          </div>

          <div className="lang-strip">
            {languages.map(({ name, level }) => (
              <div className="lang-row" key={name}>
                <span className="lang-name">{name}</span>
                <span className="lang-level">{level}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-right">
          <div className="intro-copy">
            {intro.map((paragraph, i) => (
              <Reveal as="p" className="intro-line" key={i} delay={i * 0.05}>
                {i === 0 && <span className="intro-tag">(Profile)</span>}
                {paragraph}
              </Reveal>
            ))}
          </div>

          <div className="cred-table">
            <Reveal as="h2" className="cred-heading">
              Credentials
            </Reveal>
            {credentials.map(({ title, place, year }) => (
              <div className="cred-row" key={title}>
                <span className="cred-title">{title}</span>
                <span className="cred-place">{place}</span>
                <span className="cred-year">{year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
