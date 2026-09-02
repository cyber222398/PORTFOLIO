import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, setScrollLocked } from "../lib/animation";

/** A letter plus the offset it flies in from. Values feed CSS custom properties. */
type Letter = { char: string; x: string; y: string; r: string; d: string };

const NAME: Letter[] = [
  { char: "A", x: "-7rem", y: "-6rem", r: "-42deg", d: "0.06s" },
  { char: "Y", x: "-3.5rem", y: "7rem", r: "28deg", d: "0.20s" },
  { char: "O", x: "0rem", y: "-8rem", r: "-14deg", d: "0.10s" },
  { char: "U", x: "3.5rem", y: "6.5rem", r: "52deg", d: "0.30s" },
  { char: "B", x: "7rem", y: "-5rem", r: "-26deg", d: "0.16s" },
];

const SURNAME: Letter[] = [
  { char: "A", x: "-5.5rem", y: "4.5rem", r: "18deg", d: "0.34s" },
  { char: "Z", x: "-3rem", y: "-4rem", r: "-28deg", d: "0.44s" },
  { char: "N", x: "-0.5rem", y: "5rem", r: "40deg", d: "0.38s" },
  { char: "A", x: "2.5rem", y: "-5rem", r: "-16deg", d: "0.48s" },
  { char: "G", x: "5rem", y: "4.5rem", r: "32deg", d: "0.42s" },
];

/** Must match the CSS: curtain delay (1.92s) + curtain duration (0.72s). */
const SEQUENCE_MS = 2640;
/** Length of the shortened exit used when the visitor skips ahead. */
const SKIP_MS = 460;

function Word({ letters, className }: { letters: Letter[]; className: string }) {
  return (
    <span className={className} aria-hidden="true">
      {letters.map((letter, i) => (
        <span
          key={`${letter.char}-${i}`}
          className="intro-letter"
          data-char={letter.char}
          style={
            {
              "--x": letter.x,
              "--y": letter.y,
              "--r": letter.r,
              "--d": letter.d,
            } as React.CSSProperties
          }
        >
          {letter.char}
        </span>
      ))}
    </span>
  );
}

/**
 * Opening curtain. Letters scatter in, the rules draw, then the whole panel
 * lifts to reveal the hero.
 *
 * The sequence is pure CSS with `forwards` fill, so it still completes if the
 * JavaScript never runs — React only unmounts the panel afterwards and handles
 * the scroll lock and the skip gesture.
 */
export function Intro() {
  const [finished, setFinished] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Nothing to reveal if the visitor asked for less motion — drop it at once.
    if (prefersReducedMotion()) {
      setFinished(true);
      return;
    }

    setScrollLocked(true);
    // A refresh can restore a deep scroll position behind the curtain.
    window.scrollTo(0, 0);

    let exitTimer = 0;
    const end = () => {
      setFinished(true);
      setScrollLocked(false);
    };

    // Any deliberate input cuts the intro short.
    const skip = () => {
      if (exitTimer) return;
      setSkipping(true);
      exitTimer = window.setTimeout(end, SKIP_MS);
    };

    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((type) => window.addEventListener(type, skip, { passive: true }));

    const full = window.setTimeout(end, SEQUENCE_MS);

    return () => {
      events.forEach((type) => window.removeEventListener(type, skip));
      window.clearTimeout(full);
      window.clearTimeout(exitTimer);
      setScrollLocked(false);
    };
  }, []);

  if (finished) return null;

  return (
    <div
      className={`intro${skipping ? " intro--skip" : ""}`}
      ref={root}
      role="status"
      aria-live="polite"
    >
      <p className="sr-only">Ayoub Aznag — portfolio loading</p>

      <div className="intro-glow" aria-hidden="true" />
      <div className="intro-noise" aria-hidden="true" />
      <div className="intro-dust" aria-hidden="true" />

      <div className="intro-marks" aria-hidden="true">
        <i className="intro-mark intro-mark-spark" style={{ top: "17%", left: "19%" }} />
        <i className="intro-mark intro-mark-scratch" style={{ top: "74%", left: "78%" }} />
        <i className="intro-mark intro-mark-dot" style={{ top: "26%", left: "76%" }} />
        <i className="intro-mark intro-mark-spark" style={{ top: "79%", left: "24%" }} />
        <i className="intro-mark intro-mark-dot" style={{ top: "54%", left: "89%" }} />
      </div>

      <div className="intro-stage">
        <p className="intro-eyebrow" aria-hidden="true">
          Welcome
        </p>

        <span className="intro-rule" aria-hidden="true">
          <i />
        </span>

        <Word letters={NAME} className="intro-name" />
        <Word letters={SURNAME} className="intro-surname" />

        <span className="intro-rule intro-rule-bottom" aria-hidden="true">
          <i />
        </span>

        <p className="intro-caption" aria-hidden="true">
          Loading
          <span className="intro-dots">
            <i>.</i>
            <i>.</i>
            <i>.</i>
          </span>
        </p>
      </div>
    </div>
  );
}
