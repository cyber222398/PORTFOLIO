import { useRef } from "react";
import gsap from "gsap";
import { projects } from "../content";
import { TypingTitle } from "./TypingTitle";
import { useGsap } from "../lib/animation";

export function Work() {
  const scope = useRef<HTMLElement>(null);

  useGsap(({ scope: el }) => {
    // Heading words rise on a stagger as the section arrives.
    gsap.from(el.querySelectorAll(".typing-title-value"), {
      yPercent: 110,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 70%", once: true },
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
        <TypingTitle
          className="work-title"
          title={"Things I\nbuilt 24—26®"}
          expression="E = P × t"
          accentSuffix="24—26®"
        />
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <article className="project-row" key={project.index}>
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

              {project.link && (
                <a
                  className="project-link"
                  href={project.link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="project-link-label">
                    {project.link.label}
                    <span aria-hidden="true">↗</span>
                  </span>
                  <span className="project-link-note">{project.link.note}</span>
                </a>
              )}

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
