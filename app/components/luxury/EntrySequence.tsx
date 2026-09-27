"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function EntrySequence({ onEnter }: { onEnter?: () => void }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.set(cardRef.current, {
      opacity: 0,
      scale: 0.94,
      filter: "blur(20px)",
      y: 30,
    })
      .set([logoRef.current, titleRef.current, descRef.current, buttonRef.current], {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
      })
      .to(cardRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.4,
        delay: 0.2,
      })
      .to(
        logoRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.0,
        },
        "-=0.8"
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
        },
        "-=0.7"
      )
      .to(
        descRef.current,
        {
          opacity: 0.85,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
        },
        "-=0.6"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.0,
        },
        "-=0.5"
      );
  }, []);

  const handleEnter = () => {
    if (isClosing) return;
    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onEnter?.();
      },
    });

    tl.to(cardRef.current, {
      scale: 1.06,
      opacity: 0,
      filter: "blur(30px)",
      y: -40,
      duration: 0.9,
      ease: "power3.inOut",
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.5"
    );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#071912]/95 backdrop-blur-3xl px-4 select-none"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 30%, rgba(216, 184, 166, 0.18), transparent 55%),
          radial-gradient(circle at 20% 80%, rgba(14, 60, 38, 0.4), transparent 50%),
          linear-gradient(180deg, rgba(7, 25, 18, 0.96) 0%, rgba(4, 14, 10, 0.98) 100%)
        `,
      }}
    >
      {/* Ambient ethereal glow orb */}
      <div className="pointer-events-none absolute w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute w-[350px] h-[350px] rounded-full bg-[#E4C7B8]/10 blur-[100px] -translate-y-20" />

      {/* Glassmorphic Luxury Reveal Card */}
      <div
        ref={cardRef}
        className="relative max-w-xl w-full mx-auto p-10 md:p-16 rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.6)] flex flex-col items-center text-center overflow-hidden"
        style={{
          boxShadow: "0 30px 100px -20px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 1px rgba(216,184,166,0.15)",
        }}
      >
        {/* Subtle top edge shimmer */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Brand Insignia */}
        <div ref={logoRef} className="mb-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 bg-white/[0.03]">
            <span className="text-white font-serif text-lg tracking-widest">V</span>
          </div>
          <p className="text-[0.65rem] tracking-[0.45em] text-[#D8B8A6] font-semibold uppercase">
            Maison de Haute Joaillerie
          </p>
        </div>

        {/* Luxury Title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-light text-white font-display tracking-[0.22em] uppercase leading-tight mb-4"
        >
          VINI VICI VIDI
        </h1>

        {/* Ethereal Subtitle */}
        <p
          ref={descRef}
          className="text-sm md:text-base text-white/80 font-serif italic tracking-[0.14em] max-w-md mb-10 leading-relaxed"
        >
          Fine 925 sterling silver jewelry refined at the bench, capturing quiet architectural luminosity.
        </p>

        {/* Sleek Glass CTA Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleEnter}
          className="group relative inline-flex items-center justify-center px-9 py-4 rounded-full border border-[#D8B8A6]/40 bg-[#0B3C26]/60 backdrop-blur-md text-white text-[0.72rem] tracking-[0.32em] uppercase font-semibold transition-all duration-500 ease-out hover:bg-white hover:text-[#0B3C26] hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-3">
            ENTER SHOWROOM
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600/30 to-[#D8B8A6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        </button>
      </div>
    </div>
  );
}
