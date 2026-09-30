"use client";

import { useEffect, useState, useRef } from "react";
import { SiteHeader } from "@/app/components/ui/SiteHeader";
import { FooterColumn } from "@/app/components/ui/FooterColumn";
import GlbRingScene from "@/app/three/scenes/GlbRingScene";
import dynamic from "next/dynamic";

const InfiniteGallery = dynamic(() => import("@/components/ui/3d-gallery-photography"), { ssr: false });
import { setupLenis } from "@/app/animations/scroll/lenis";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop", alt: "Vici Obsidian Signet Ring" },
  { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop", alt: "Celestial Emerald Pendant" },
  { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop", alt: "Aura Silver Choker" },
  { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop", alt: "Lumina Eternity Band" },
  { src: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=800&auto=format&fit=crop", alt: "Verdant Royal Solitaire" },
  { src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop", alt: "Sovereign Sculpted Cuff" },
  { src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop", alt: "Imperial Drop Earrings" },
  { src: "https://images.unsplash.com/photo-1583946099379-f9c9cb8bc030?q=80&w=800&auto=format&fit=crop", alt: "Midnight Filigree Stud" },
  { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop", alt: "Dew Droplet Aquamarine" },
  { src: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=800&auto=format&fit=crop", alt: "Lumina Tennis Bracelet" },
];

export default function HomePage() {
  const [entered, setEntered] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const lenis = setupLenis();

    // Smooth inertia scroll handler linked directly to Lenis RAF
    lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      const scrollY = scroll;
      const windowHeight = window.innerHeight;

      // 1. Update Scroll Progress bar
      if (limit > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / limit) * 100)));
      }

      // 2. Multi-depth Parallax on Hero elements
      const vini = document.querySelector(".brand-group-vini");
      const vici = document.querySelector(".brand-group-vici");
      const vidi = document.querySelector(".brand-group-vidi");
      const heroNote = document.querySelector(".hero-note");
      const heroRing = document.querySelector(".hero-ring-container");
      const heroCta = document.querySelector(".hero-cta-container");

      if (vini) {
        gsap.to(vini, {
          y: scrollY * 0.28,
          x: -scrollY * 0.08,
          opacity: Math.max(0, 1 - scrollY / (windowHeight * 0.65)),
          duration: 0.15,
          ease: "none",
          overwrite: "auto",
        });
      }

      if (vici) {
        gsap.to(vici, {
          scale: Math.max(0.82, 1 - (scrollY / windowHeight) * 0.2),
          y: scrollY * 0.12,
          opacity: Math.max(0, 1 - scrollY / (windowHeight * 0.55)),
          duration: 0.15,
          ease: "none",
          overwrite: "auto",
        });
      }

      if (vidi) {
        gsap.to(vidi, {
          y: -scrollY * 0.18,
          x: scrollY * 0.08,
          opacity: Math.max(0, 1 - scrollY / (windowHeight * 0.65)),
          duration: 0.15,
          ease: "none",
          overwrite: "auto",
        });
      }

      if (heroNote) {
        gsap.to(heroNote, {
          opacity: Math.max(0, 1 - scrollY / (windowHeight * 0.45)),
          y: scrollY * 0.25,
          duration: 0.15,
          overwrite: "auto",
        });
      }

      if (heroRing) {
        gsap.to(heroRing, {
          y: scrollY * 0.16,
          scale: Math.max(0.92, 1 - (scrollY / windowHeight) * 0.12),
          duration: 0.18,
          ease: "none",
          overwrite: "auto",
        });
      }

      if (heroCta) {
        gsap.to(heroCta, {
          opacity: Math.max(0, 1 - scrollY / (windowHeight * 0.38)),
          y: scrollY * 0.22,
          duration: 0.15,
          overwrite: "auto",
        });
      }

      // 3. Carousel Showcase header subtle elevation on approach
      const carouselHeader = document.querySelector(".carousel-header");
      if (carouselHeader) {
        const rect = carouselHeader.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9) {
          gsap.to(carouselHeader, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }

    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="luxury-page">
      {/* Sleek Luminous Scroll Progress Indicator */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent"
      >
        <div 
          className="h-full bg-gradient-to-r from-[#0B4A3B] via-[#1fe0bb] to-[#E6F2EA] shadow-[0_0_12px_#1fe0bb] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="showroom-shell is-entered">
        <SiteHeader />

        {/* Hero Section */}
        <section
          ref={heroSectionRef}
          className="relative flex items-start justify-center min-h-[92vh] px-[3vw] pt-2 overflow-hidden"
        >
          {/* Light Green Pattern & Gradient Atelier Backdrop for VINI VICI VIDI */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background: `
                radial-gradient(ellipse 95% 75% at 50% 48%, rgba(230, 242, 234, 0.9) 0%, rgba(215, 235, 225, 0.55) 45%, rgba(248, 247, 244, 0.95) 100%),
                radial-gradient(circle at 18% 25%, rgba(31, 122, 92, 0.14) 0%, transparent 45%),
                radial-gradient(circle at 82% 70%, rgba(11, 74, 59, 0.12) 0%, transparent 45%),
                repeating-linear-gradient(45deg, rgba(11, 74, 59, 0.035) 0, rgba(11, 74, 59, 0.035) 1px, transparent 0, transparent 28px),
                repeating-linear-gradient(-45deg, rgba(11, 74, 59, 0.035) 0, rgba(11, 74, 59, 0.035) 1px, transparent 0, transparent 28px)
              `,
            }}
          >
            {/* Fine emerald radial wash */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#E6F2EA]/20 to-[#F8F7F4]/70 pointer-events-none" />
          </div>

          <div className="relative w-full max-w-[1700px] min-h-[90vh] flex items-start justify-center pt-4">
            <div className="hero-note absolute left-[4.5%] bottom-[16%] flex flex-col gap-2 max-w-[14rem] text-[#2B2B2E] uppercase tracking-[0.35em] text-[0.6rem] z-5">
              <span className="font-semibold text-[#0B4A3B] tracking-[0.4em]">925 STERLING SILVER</span>
              <span className="text-[0.68rem] tracking-[0.28em] text-[#9CA0A6]">FACETED ONYX & DIAMOND</span>
            </div>

            {/* VINI VICI VIDI Branding in Deep Emerald */}
            <div className="absolute inset-0 z-2 w-full h-full uppercase pointer-events-none font-display">
              <div className="brand-group-vini absolute top-[3%] left-[3%] flex flex-col items-start gap-1.5 z-1">
                <div className="flex items-center gap-3 text-[0.65rem] tracking-[0.25em] text-[#0B4A3B]">
                  <span className="font-serif italic text-sm text-[#1F7A5C]">I</span>
                  <span>INCEPTION</span>
                  <div className="w-10 h-[1px] bg-gradient-to-r from-[#0B4A3B] to-transparent" />
                </div>
                <span className="text-[clamp(5.5rem,13vw,19rem)] font-extrabold leading-[0.88] tracking-normal text-[#0B4A3B]">VINI</span>
                <span className="text-[0.62rem] tracking-[0.32em] text-[#9CA0A6]">ÉDITION STERLING</span>
              </div>

              <div className="brand-group-vici absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-1">
                <span className="text-[clamp(10rem,24vw,36rem)] font-extrabold leading-[0.88] tracking-normal text-[#0B4A3B]/95">VICI</span>
                <div className="absolute w-[140%] h-[140%] rounded-full bg-radial from-[#1F7A5C]/15 via-[#0B4A3B]/5 to-transparent blur-[50px] pointer-events-none -z-1" />
              </div>

              <div className="brand-group-vidi absolute bottom-[5%] right-[3%] flex flex-col items-end gap-1.5 z-1">
                <div className="flex items-center gap-3 text-[0.65rem] tracking-[0.25em] text-[#0B4A3B]">
                  <div className="w-10 h-[1px] bg-gradient-to-l from-[#0B4A3B] to-transparent" />
                  <span>APOGÉE</span>
                  <span className="font-serif italic text-sm text-[#1F7A5C]">III</span>
                </div>
                <span className="text-[clamp(5.5rem,13vw,19rem)] font-extrabold leading-[0.88] tracking-normal text-[#0B4A3B]">VIDI</span>
                <span className="text-[0.62rem] tracking-[0.32em] text-[#9CA0A6] text-right">
                  PARIS • 48.8566° N, 2.3522° E
                </span>
              </div>
            </div>

            {/* 3D Ring Hero Model - Made significantly larger */}
            <div className="hero-ring-container absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(65rem,90vw,120rem)] h-[clamp(40rem,65vh,70rem)] flex items-center justify-center z-20 pointer-events-none will-change-transform">
              <GlbRingScene />
            </div>

            {/* Deep Emerald CTA Button in Hero */}
            <div className="hero-cta-container absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
              <a href="#contact" className="btn-emerald inline-flex items-center gap-3">
                <span>Contact Concierge</span>
                <ArrowRight className="w-4 h-4 text-[#E6F2EA]" />
              </a>
            </div>
          </div>
        </section>

        {/* 3D Infinite Photography Gallery */}
        <section
          id="collection"
          className="relative w-full bg-[#050505] border-t border-b border-[#1fe0bb]/20 overflow-hidden"
        >
          {/* Ambient emerald glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1100px] h-[500px] bg-gradient-to-r from-[#00ffc4]/8 via-[#00c9a7]/18 to-[#008e76]/8 blur-[100px] rounded-full pointer-events-none z-0"
          />

          {/* Full-screen 3D Gallery Canvas */}
          <InfiniteGallery
            images={galleryImages}
            speed={1.2}
            visibleCount={12}
            className="h-screen w-full"
          />

          {/* Overlay Text */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center px-4 z-20 mix-blend-exclusion">
            <span className="text-[0.65rem] tracking-[0.3em] font-bold text-[#1fe0bb] uppercase mb-3 drop-shadow-[0_0_12px_rgba(31,224,187,0.4)]">
              Atelier Creations
            </span>
            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Collection
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-3 italic" style={{ fontFamily: "var(--font-editorial), serif" }}>
              Scroll or drag to explore the atelier in infinite 3D depth
            </p>
          </div>

          {/* Navigation hint */}
          <div className="absolute bottom-8 left-0 right-0 text-center z-20 pointer-events-none">
            <p className="text-[0.6rem] tracking-[0.15em] uppercase text-white/40 font-medium">
              Use mouse wheel, arrow keys, or touch to navigate
            </p>
          </div>
        </section>

        {/* 4-Column Footer in Green-White Combo */}
        <FooterColumn />
      </div>
    </main>
  );
}
