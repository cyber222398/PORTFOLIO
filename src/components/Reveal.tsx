import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { useGsap } from "../lib/animation";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds of delay before this element starts. */
  delay?: number;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
};

/**
 * Masked upward reveal, fired once when the element scrolls into view.
 * Under reduced-motion `useGsap` no-ops and the content is simply visible.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = false,
}: RevealProps) {
  const scope = useRef<HTMLElement>(null);

  useGsap(({ scope: el }) => {
    const targets = stagger ? Array.from(el.children) : [el];

    gsap.from(targets, {
      y: 28,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      delay,
      stagger: stagger ? 0.07 : 0,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  }, scope);

  return (
    <Tag className={className} ref={scope}>
      {children}
    </Tag>
  );
}
