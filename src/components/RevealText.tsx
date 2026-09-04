import { useEffect, useRef, type ElementType } from "react";
import { prefersReducedMotion } from "../lib/animation";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  /** Opacity of a word that has not been reached yet. */
  dim?: number;
};

/**
 * Word-by-word statement reveal, keyed to each word's own position in the
 * viewport rather than to a one-shot trigger.
 *
 * The reference does two things a plain scroll-trigger cannot: it scrubs (drag
 * the page back and the words dim again) and it fades words out once more as
 * they approach the top edge, so the lit band always sits in the middle of the
 * screen. Word offsets are measured once, so a frame costs one rect per block
 * rather than one per word.
 */
export function RevealText({ children, as: Tag = "p", className, dim = 0.26 }: Props) {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scope.current;
    if (!el || prefersReducedMotion()) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>(".rv-word"));
    let offsets: number[] = [];
    let frame = 0;

    const measure = () => {
      const base = el.getBoundingClientRect().top;
      offsets = words.map((word) => word.getBoundingClientRect().top - base);
      paint();
    };

    const paint = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      // Lit between ~18% and ~52% of the viewport; ramps in from below, and back
      // out again in the top ~18% so the reading band stays central.
      const rise = vh * 0.34;
      const exit = vh * 0.18;

      for (let i = 0; i < words.length; i += 1) {
        const y = top + offsets[i];
        const enter = 1 - Math.min(Math.max((y - vh * 0.52) / rise, 0), 1);
        const leave = Math.min(Math.max((y - vh * 0.02) / exit, 0), 1);
        const lit = Math.min(enter, leave);
        words[i].style.opacity = (dim + (1 - dim) * lit).toFixed(3);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(measure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [children, dim]);

  return (
    <Tag className={`reveal-text${className ? ` ${className}` : ""}`} ref={scope}>
      {children.split(" ").map((word, i) => (
        <span className="rv-word" key={`${word}-${i}`}>
          {word}{" "}
        </span>
      ))}
    </Tag>
  );
}
