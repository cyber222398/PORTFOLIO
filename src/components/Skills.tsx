import { useRef } from "react";
import gsap from "gsap";
import { capabilities } from "../content";
import { Reveal } from "./Reveal";
import { useGsap } from "../lib/animation";

export function Skills() {
  const scope = useRef<HTMLElement>(null);

  useGsap(({ scope: el }) => {
    gsap.from(el.querySelectorAll(".skill-tile"), {
      opacity: 0,
      y: 24,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.05,
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
    });
  }, scope);

  return (
    <section className="skills" id="skills" ref={scope} aria-labelledby="skills-title">
      <div className="skills-head">
        <Reveal as="p" className="section-label">
          Tools, systems &amp; practice
        </Reveal>
        <h2 id="skills-title" className="skills-title">
          <span>SKILLS</span>
          <span className="skills-title-accent">/</span>
        </h2>
      </div>

      <div className="skills-grid">
        {capabilities.map((skill, index) => (
          <div className="skill-tile" key={skill}>
            <span className="skill-index">{String(index + 1).padStart(2, "0")}</span>
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </section>
  );
}