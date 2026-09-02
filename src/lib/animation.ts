import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

let activeLenis: Lenis | null = null;
let scrollLocked = false;

/**
 * Freezes the page while an overlay owns the screen. Toggles a class for the
 * native path and pauses Lenis when it is running.
 *
 * The lock can be requested before Lenis exists — child effects run before the
 * parent's — so the state is remembered and applied when the instance is made.
 */
export function setScrollLocked(locked: boolean) {
  scrollLocked = locked;
  if (typeof document === "undefined") return;

  document.documentElement.classList.toggle("is-scroll-locked", locked);
  if (locked) activeLenis?.stop();
  else activeLenis?.start();
}

/**
 * Drives the page with Lenis and hands scroll control to ScrollTrigger so both
 * read the same position. Mount once, at the app root.
 *
 * Skipped entirely under reduced-motion so the page keeps native scrolling.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      // Long, gentle ease-out — the scroll settles instead of stopping dead.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    activeLenis = lenis;
    if (scrollLocked) lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);

    // Let GSAP's ticker run Lenis so there is a single rAF loop on the page.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Lenis owns the scroll position, so in-page anchors have to be routed
    // through it — otherwise nav links jump instantly instead of gliding.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

      const anchor = (event.target as Element | null)?.closest?.('a[href^="#"]');
      const href = anchor?.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.25 });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      activeLenis = null;
    };
  }, []);
}

/**
 * Registers ScrollTrigger and runs `build` inside a scoped gsap.context so every
 * tween and trigger it creates is reverted on unmount.
 */
export function useGsap(
  build: (context: { scope: HTMLElement }) => void,
  scopeRef: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => build({ scope }), scope);
    return () => ctx.revert();
    // `build` is redefined each render by design; the scope element is the real dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopeRef]);
}

/** Splits a string into words wrapped for line-mask reveals. */
export function toWords(text: string) {
  return text.split(" ");
}
