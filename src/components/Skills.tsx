import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { Reveal } from "./Reveal";
import { useGsap } from "../lib/animation";

const skillGroups = [
  {
    label: "Languages",
    skills: [
      ["TypeScript", "typescript"],
      ["JavaScript", "javascript"],
      ["HTML5", "html5"],
      ["CSS3", "css"],
      ["C / C++", "cplusplus"],
    ],
  },
  {
    label: "Build & ship",
    skills: [
      ["React", "react"],
      ["Vite", "vite"],
      ["TanStack", "tanstack"],
      ["Tailwind CSS", "tailwindcss"],
      ["Vercel", "vercel"],
    ],
  },
  {
    label: "Motion & 3D",
    skills: [
      ["GSAP", "greensock"],
      ["Blender", "blender"],
    ],
  },
  {
    label: "Systems & tools",
    skills: [
      ["Bash", "gnubash"],
      ["Linux", "linux"],
      ["Git", "git"],
      ["GitHub", "github"],
      ["Arduino", "arduino"],
      ["Proteus", "proteus"],
    ],
  },
] as const;

const allSkills = skillGroups.flatMap((group) => group.skills);

export function Skills() {
  const scope = useRef<HTMLElement>(null);

  useGsap(({ scope: el }) => {
    gsap.from(el.querySelectorAll(".skill-node"), {
      opacity: 0,
      scale: 0.75,
      y: 18,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.045,
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
    });
  }, scope);

  return (
    <section className="skills" id="skills" ref={scope} aria-labelledby="skills-title">
      <div className="skills-head">
        <Reveal as="p" className="section-label">
          The stack behind the work
        </Reveal>
        <h2 id="skills-title" className="skills-title">
          <span>SKILLS</span>
          <span className="skills-title-accent">/</span>
        </h2>
      </div>

      <div className="skills-carousel" aria-label="Technology skills">
        <div
          className="skills-carousel-inner"
          style={{ "--quantity": allSkills.length } as CSSProperties}
        >
          {allSkills.map(([name, icon], index) => (
            <div
              className="skills-carousel-card"
              key={name}
              style={{ "--index": index } as CSSProperties}
              title={name}
            >
              <img src={`https://cdn.simpleicons.org/${icon}`} alt={name} width="48" height="48" />
              <span className="skills-carousel-label">{name}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}