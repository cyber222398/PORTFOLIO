import type { ReactNode } from "react";

export type DisplayLine = {
  text?: string;
  node?: ReactNode;
  /** white | red — the single accent line. Everything else stays dim grey. */
  accent?: "white" | "red";
};

type Props = {
  lines: DisplayLine[];
  /** Which edge the staircase grows from. */
  align?: "left" | "right";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
};

/**
 * The site's display heading: oversized uppercase grotesque, ~0.86 line-height,
 * each successive line stepped further right, and exactly one accent line in
 * white or red while the rest sits at the dim grey.
 */
export function DisplayHeading({ lines, align = "left", className, as: Tag = "h2", id }: Props) {
  return (
    <Tag className={`display display--${align}${className ? ` ${className}` : ""}`} id={id}>
      {lines.map((line, i) => (
        <span
          className={`display-line${line.accent ? ` is-${line.accent}` : ""}`}
          key={i}
          style={{ "--i": i } as React.CSSProperties}
        >
          {line.node ?? line.text}
        </span>
      ))}
    </Tag>
  );
}
