import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../lib/animation";

type Props = {
  title: string;
  expression: string;
  className?: string;
  as?: "h1" | "h2";
  id?: string;
  accentLines?: number[];
  accentSuffix?: string;
};

export function TypingTitle({
  title,
  expression,
  className = "",
  as: Tag = "h2",
  id,
  accentLines = [],
  accentSuffix,
}: Props) {
  const [value, setValue] = useState(title);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let timeoutId: number | undefined;
    let intervalId: number | undefined;
    let phase: "pause-title" | "erase-title" | "type-expression" | "pause-expression" | "erase-expression" | "type-title" = "pause-title";
    let index = title.length;

    const clearTimers = () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };

    const schedule = (delay: number, next: () => void) => {
      timeoutId = window.setTimeout(next, delay);
    };

    const type = (text: string, done: () => void) => {
      index = 0;
      intervalId = window.setInterval(() => {
        index += 1;
        setValue(text.slice(0, index));
        if (index === text.length) {
          window.clearInterval(intervalId);
          intervalId = undefined;
          done();
        }
      }, 48);
    };

    const erase = (length: number, done: () => void) => {
      index = length;
      intervalId = window.setInterval(() => {
        index -= 1;
        setValue((current) => current.slice(0, index));
        if (index === 0) {
          window.clearInterval(intervalId);
          intervalId = undefined;
          done();
        }
      }, 34);
    };

    const tick = () => {
      if (phase === "pause-title") {
        phase = "erase-title";
        erase(title.length, () => {
          phase = "type-expression";
          type(expression, () => {
            phase = "pause-expression";
            schedule(1200, tick);
          });
        });
        return;
      }

      if (phase === "pause-expression") {
        phase = "erase-expression";
        erase(expression.length, () => {
          phase = "type-title";
          type(title, () => {
            phase = "pause-title";
            schedule(5000, tick);
          });
        });
      }
    };

    schedule(5000, tick);
    return () => clearTimers();
  }, [expression, title]);

  const titleLines = title.split("\n");
  const valueLines = value.split("\n");
  const renderLine = (line: string, lineIndex: number) => {
    const expectedLine = titleLines[lineIndex] ?? "";
    const suffixStart = accentSuffix && expectedLine.endsWith(accentSuffix)
      ? expectedLine.length - accentSuffix.length
      : -1;
    const splitAt = suffixStart >= 0 ? Math.min(line.length, suffixStart) : line.length;
    const normal = line.slice(0, splitAt);
    const accent = suffixStart >= 0 ? line.slice(splitAt) : "";
    const lineIsAccent = accentLines.includes(lineIndex);

    return (
      <span className={`typing-title-line${lineIsAccent ? " is-accent" : ""}`} key={lineIndex}>
        {normal}
        {accent && <span className="typing-title-accent">{accent}</span>}
      </span>
    );
  };

  return (
    <Tag id={id} className={`typing-title ${className}`} aria-label={title}>
      <span className="typing-title-placeholder" aria-hidden="true">
        {titleLines.map((line, lineIndex) => renderLine(line, lineIndex))}
      </span>
      <span className="typing-title-value">
        {valueLines.map(renderLine)}
      </span>
      <span className="typing-title-cursor" aria-hidden="true" />
    </Tag>
  );
}
