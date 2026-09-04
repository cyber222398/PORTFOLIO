import { useEffect, useState } from "react";
import { profile } from "../content";

const sections = [
  { label: "Index", href: "#top" },
  { label: "Profile", href: "#profile" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Track", href: "#track" },
];

/**
 * Fixed masthead. Goes solid once the hero scene is behind us, and tracks which
 * section is currently in view.
 */
export function SiteNav() {
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = sections
      .map(({ href }) => document.querySelector(href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-nav${lifted ? " is-lifted" : ""}`}>
      <nav className="nav-index" aria-label="Sections">
        {sections.map(({ label, href }, i) => (
          <span className="nav-item" key={href}>
            {i > 0 && <span className="nav-sep" aria-hidden="true">/</span>}
            <a
              href={href}
              className={active === href ? "is-current" : undefined}
              aria-current={active === href ? "true" : undefined}
            >
              {label}
            </a>
          </span>
        ))}
      </nav>

      <a className="nav-cta" href={`mailto:${profile.email}`}>
        Let&apos;s connect <i aria-hidden="true">↗</i>
      </a>
    </header>
  );
}
