import { useRef } from "react";
import gsap from "gsap";
import { profile } from "../content";
import { Reveal } from "./Reveal";
import { useGsap } from "../lib/animation";

export function Contact() {
  const scope = useRef<HTMLElement>(null);

  useGsap(({ scope: el }) => {
    // The oversized address slides across as the footer is read.
    gsap.fromTo(
      el.querySelector(".address-inner"),
      { xPercent: 6 },
      {
        xPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
      },
    );

    // The figure rises into place, a touch slower than the copy beside it.
    gsap.fromTo(
      el.querySelector(".contact-figure"),
      { yPercent: 12, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.6,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      },
    );

    const exit = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "bottom 92%",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    exit.to(
      el.querySelectorAll(".contact-grid, .contact-address, .contact-base"),
      { opacity: 0, yPercent: -12, ease: "none" },
      0,
    );
    exit.to(
      el.querySelector(".contact-figure"),
      {
        xPercent: -28,
        yPercent: -8,
        scale: 1.35,
        filter: "blur(8px) contrast(1.06) saturate(0.95)",
        ease: "none",
      },
      0,
    );
  }, scope);

  return (
    <footer className="contact" id="contact" ref={scope} aria-label="Contact">
      <img
        className="contact-figure"
        src="/footer-portrait.webp"
        alt="Ayoub Aznag"
        width="900"
        height="1350"
        loading="lazy"
        decoding="async"
      />

      <div className="contact-grid">
        <div className="contact-links">
          <p className="section-label">Reach me</p>
          <ul>
            <li>
              <a href={`mailto:${profile.email}`}>Email</a>
            </li>
            <li>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>Phone</a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div className="contact-copy">
          <Reveal as="p" className="contact-statement">
            I am looking to continue into an engineering cycle in electrical engineering — and
            open to work where hardware, maintenance and embedded software meet.
          </Reveal>
          <Reveal as="p" className="contact-statement contact-statement-muted">
            Based in {profile.location}. Available for internships, engineering programmes and
            collaboration.
          </Reveal>
        </div>

        <div className="contact-cta">
          <p className="section-label">Let&apos;s build</p>
          <a className="contact-big-link" href={`mailto:${profile.email}`}>
            something real
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <a className="contact-address" href={`mailto:${profile.email}`} aria-label="Email Ayoub Aznag">
        <span className="address-inner">
          ayoub.aznag<span className="address-at">@</span>edu.uiz.ac.ma
        </span>
      </a>

      <div className="contact-base">
        <span>
          © {profile.year} {profile.name}
        </span>
        <span>{profile.location}</span>
        <span>Built with React, GSAP &amp; Lenis</span>
      </div>
    </footer>
  );
}
