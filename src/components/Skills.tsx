import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { TypingTitle } from "./TypingTitle";
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
        <TypingTitle
          id="skills-title"
          className="skills-title"
          title="My Skills"
          expression="V = I × R"
          accentSuffix="Skills"
        />
      </div>

      <div
        className="slider"
        style={{ "--width": "120px", "--height": "120px", "--quantity": allSkills.length } as CSSProperties}
        aria-label="Technology skills"
      >
        <div className="list">
          {allSkills.map(([name, icon], index) => {
            const whiteBadge = name === "GitHub" || name === "Vercel";
            return (
              <div className="item" key={name} style={{ "--position": index + 1 } as CSSProperties}>
                <div className="card" title={name}>
                  <div className={whiteBadge ? "card-icon card-icon-white" : "card-icon"}>
                    <img src={`https://cdn.simpleicons.org/${icon}`} alt={name} width="34" height="34" />
                  </div>
                  <span>{name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}