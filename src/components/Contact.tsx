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
              <a className="contact-social-button email-button" href={`mailto:${profile.email}`}>
                <img src="https://cdn.simpleicons.org/gmail/ffffff" alt="" aria-hidden="true" />
                <span>Email</span>
              </a>
            </li>
            <li>
              <a
                className="contact-social-button whatsapp-button"
                href={`https://wa.me/${profile.phone.replace(/\s/g, "").replace(/^\+/, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" aria-hidden="true" />
                <span>Phone</span>
              </a>
            </li>
            <li>
              <a
                className="linkedin-button"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Ayoub Aznag's LinkedIn profile"
              >
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <path d="M92.86,0H7.12A7.17,7.17,0,0,0,0,7.21V92.79A7.17,7.17,0,0,0,7.12,100H92.86A7.19,7.19,0,0,0,100,92.79V7.21A7.19,7.19,0,0,0,92.86,0ZM30.22,85.71H15.4V38H30.25V85.71ZM22.81,31.47a8.59,8.59,0,1,1,8.6-8.59A8.6,8.6,0,0,1,22.81,31.47Zm63,54.24H71V62.5c0-5.54-.11-12.66-7.7-12.66s-8.91,6-8.91,12.26V85.71H39.53V38H53.75v6.52H54c2-3.75,6.83-7.7,14-7.7,15,0,17.79,9.89,17.79,22.74Z" />
                </svg>
                <span>LinkedIn</span>
                <span className="linkedin-tooltip">See my profile!</span>
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
