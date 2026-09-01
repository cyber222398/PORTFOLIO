import { useRef } from "react";
import gsap from "gsap";
import { projects } from "../content";
import { Reveal } from "./Reveal";
import { useGsap } from "../lib/animation";

/**
 * Generated blueprint plate. Each project gets a deterministic schematic instead of a
 * stock photograph — it suits the subject matter and keeps the page asset-light.
 */
function Plate({ seed }: { seed: number }) {
  const traces = Array.from({ length: 5 }, (_, i) => {
    const y = 18 + i * 16;
    const bend = 30 + ((seed * 17 + i * 23) % 40);
    return `M 4 ${y} H ${bend} L ${bend + 8} ${y + (i % 2 ? 9 : -9)} H 96`;
  });

  return (
    <svg className="plate" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={`grid-${seed}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,88,22,.16)" strokeWidth=".4" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#grid-${seed})`} />
      {traces.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="rgba(255,88,22,.5)"
          strokeWidth=".7"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {traces.map((_, i) => (
        <circle key={i} cx="96" cy={18 + i * 16} r="1.4" fill="#ff5816" />
      ))}
    </svg>
  );
}

export function Work() {
  const scope = useRef<HTMLElement>(null);

  useGsap(({ scope: el }) => {
    // Heading words rise on a stagger as the section arrives.
    gsap.from(el.querySelectorAll(".work-word"), {
      yPercent: 110,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 70%", once: true },
    });

    // Plates drift slower than the text beside them.
    el.querySelectorAll<HTMLElement>(".project-visual").forEach((visual) => {
      gsap.fromTo(
        visual.querySelector(".plate-inner"),
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: visual,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    gsap.from(el.querySelectorAll(".project-row"), {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: el.querySelector(".project-list"), start: "top 78%", once: true },
    });
  }, scope);

  return (
    <section className="work" id="work" ref={scope} aria-label="Selected work">
      <div className="work-head">
        <Reveal as="p" className="section-label section-label-right">
          (Selected work)
        </Reveal>
        <h2 className="work-title">
          <span className="work-line">
            <span className="work-word">Things</span> <span className="work-word">I</span>
          </span>
          <span className="work-line work-line-2">
            <span className="work-word">built</span>{" "}
            <span className="work-word work-word-accent">
              24—26<sup>®</sup>
            </span>
          </span>
        </h2>
      </div>

      <div className="project-list">
        {projects.map((project, i) => (
          <article className="project-row" key={project.index}>
            <div className="project-visual">
              <div className="plate-inner">
                <Plate seed={i + 1} />
              </div>
              <span className="project-index-big">{project.index}</span>
            </div>

            <div className="project-body">
              <h3 className="project-name">{project.name}</h3>
              <dl className="project-meta">
                <div>
                  <dt>Year</dt>
                  <dd>{project.year}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>Context</dt>
                  <dd>{project.context}</dd>
                </div>
              </dl>
              <p className="project-copy">{project.description}</p>
              <ul className="project-stack">
                {project.stack.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
