import { useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion, useGsap } from "../lib/animation";

type Props = {
  words: string[];
  className?: string;
  /** Seconds the word rests before the next one takes over. */
  hold?: number;
};

/**
 * The rotating last word of a display heading.
 *
 * Measured off the reference: the outgoing and incoming words travel upward
 * together by about a third of their height, crossfading *through* each other —
 * there is no clipping mask, both are briefly visible — and both carry a slight
 * skew that eases back to zero. ~400ms, then a ~1.5s hold.
 *
 * Every word is rendered into the same grid cell so the box is as wide as the
 * longest word and nothing reflows mid-swap.
 */
export function RotatingWord({ words, className, hold = 1.5 }: Props) {
  const scope = useRef<HTMLSpanElement>(null);
  const reduced = prefersReducedMotion();

  useGsap(({ scope: el }) => {
    const items = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".rot-word"));
    if (items.length < 2) return;

    gsap.set(items, { yPercent: 38, skewX: -9, opacity: 0 });
    gsap.set(items[0], { yPercent: 0, skewX: 0, opacity: 1 });

    const tl = gsap.timeline({ repeat: -1, defaults: { duration: 0.4 } });

    items.forEach((current, i) => {
      const next = items[(i + 1) % items.length];

      tl.to(current, { yPercent: -38, skewX: -9, opacity: 0, ease: "power2.inOut" }, `+=${hold}`)
        .fromTo(
          next,
          { yPercent: 38, skewX: -9, opacity: 0 },
          { yPercent: 0, skewX: 0, opacity: 1, ease: "power2.out" },
          "<",
        )
        // Park the outgoing word below the line, ready for its next turn.
        .set(current, { yPercent: 38 });
    });
  }, scope);

  if (reduced) return <span className={className}>{words[0]}</span>;

  return (
    <span className={`rot${className ? ` ${className}` : ""}`} ref={scope}>
      {words.map((word, i) => (
        <span className="rot-word" key={word} aria-hidden={i > 0 ? "true" : undefined}>
          {word}
        </span>
      ))}
    </span>
  );
}
