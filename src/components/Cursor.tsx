import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../lib/animation";

/**
 * The signature interaction of the reference: a small red dot replaces the
 * pointer and swells into a labelled disc over anything interactive. The label
 * is declared by the element itself through `data-cursor`, so sections stay
 * unaware of the cursor.
 *
 * Mouse only. Touch and reduced-motion visitors keep their native pointer.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    setActive(true);
    document.documentElement.classList.add("has-cursor");

    return () => document.documentElement.classList.remove("has-cursor");
  }, []);

  useEffect(() => {
    const el = dot.current;
    if (!active || !el) return;

    // quickTo keeps the follow on GSAP's ticker: one lerp per frame, no churn.
    const moveX = gsap.quickTo(el, "x", { duration: 0.32, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.32, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      setVisible(true);

      const target = (event.target as Element | null)?.closest?.("[data-cursor]");
      const next = target?.getAttribute("data-cursor")?.trim();
      setLabel(next ? next : null);
    };

    const onLeave = () => setVisible(false);
    const onDown = () => el.classList.add("is-press");
    const onUp = () => el.classList.remove("is-press");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className={`cursor${label ? " is-labelled" : ""}${visible ? " is-visible" : ""}`}
      ref={dot}
      aria-hidden="true"
    >
      <span className="cursor-label">{label}</span>
    </div>
  );
}
