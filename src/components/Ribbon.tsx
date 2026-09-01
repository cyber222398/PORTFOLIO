import { useRef } from "react";
import gsap from "gsap";
import { marqueeItems } from "../content";
import { useGsap } from "../lib/animation";

/** One repeat of the track; duplicated so the translate can loop seamlessly. */
function Track() {
  return (
    <div className="ribbon-track" aria-hidden="true">
      {marqueeItems.map((item) => (
        <span className="ribbon-item" key={item}>
          {item}
          <i className="ribbon-star">✳</i>
        </span>
      ))}
    </div>
  );
}

/**
 * Two crossed ribbons. Each drifts on its own constant loop, and scrolling adds or
 * subtracts speed so the bands react to the reader without ever fully stopping.
 */
export function Ribbon() {
  const scope = useRef<HTMLDivElement>(null);

  useGsap(({ scope: el }) => {
    el.querySelectorAll<HTMLElement>(".ribbon-band").forEach((band, i) => {
      const forward = i === 0;
      const inner = band.querySelector<HTMLElement>(".ribbon-inner");
      if (!inner) return;

      const loop = gsap.to(inner, {
        xPercent: forward ? -50 : 50,
        duration: 26,
        ease: "none",
        repeat: -1,
      });

      // Scroll velocity nudges the loop's timescale, then it eases back to rest.
      gsap.to(loop, {
        timeScale: forward ? 3.2 : -3.2,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => {
            const dir = self.direction === 1 ? 1 : -1;
            loop.timeScale((forward ? 1 : -1) * dir * (1 + Math.abs(self.getVelocity()) / 2200));
          },
          onLeave: () => loop.timeScale(forward ? 1 : -1),
        },
      });
    });
  }, scope);

  return (
    <div className="ribbon-zone" ref={scope} aria-hidden="true">
      <div className="ribbon-band ribbon-a">
        <div className="ribbon-inner">
          <Track />
          <Track />
        </div>
      </div>
      <div className="ribbon-band ribbon-b">
        <div className="ribbon-inner">
          <Track />
          <Track />
        </div>
      </div>
    </div>
  );
}
