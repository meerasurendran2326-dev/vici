"use client";

import gsap from "gsap";

export function runEntrySequence() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const overlay = document.querySelector("[data-entry-overlay]");
  const logo = document.querySelector("[data-entry-logo]");
  const title = document.querySelector("[data-entry-title]");
  const button = document.querySelector("[data-entry-button]");

  if (!overlay || !logo || !title || !button) return;

  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (reducedMotion) {
    gsap.set([logo, title, button], { autoAlpha: 1, y: 0, filter: "blur(0px)" });
    gsap.to(overlay, { autoAlpha: 0, duration: 0.35, delay: 0.15 });
    return;
  }

  timeline
    .set([logo, title, button], { autoAlpha: 0, y: 36, filter: "blur(18px)" })
    .to(overlay, { autoAlpha: 1, duration: 0.2 })
    .to(logo, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.1 }, 0.6)
    .to(title, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.5, scale: 1 }, 1.15)
    .to(button, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9 }, 1.9)
    .to(overlay, { autoAlpha: 0, duration: 1.1, delay: 0.6 }, 2.7);

  return timeline;
}
