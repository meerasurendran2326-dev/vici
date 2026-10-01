"use client";

import { useEffect, useState, useRef } from "react";
import { SiteHeader } from "@/app/components/ui/SiteHeader";
import { FooterColumn } from "@/app/components/ui/FooterColumn";
import GlbRingScene from "@/app/three/scenes/GlbRingScene";
import dynamic from "next/dynamic";

import CarouselStacked from "@/components/ui/carousel-07";
const InfiniteGallery = dynamic(() => import("@/components/ui/3d-gallery-photography"), { ssr: false });
import { ShaderBackground } from "@/components/ui/adisyon-shader";
import { setupLenis } from "@/app/animations/scroll/lenis";
import { gsap } from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import { MetallicSilverCorner } from "@/app/components/ui/MetallicSilverCorner";

const galleryImages = [
  { src: "/images/custom/img1.jpeg", alt: "Vici Obsidian Signet Ring" },
  { src: "/images/custom/img2.jpeg", alt: "Celestial Emerald Pendant" },
  { src: "/images/custom/img3.jpeg", alt: "Aura Silver Choker" },
  { src: "/images/custom/img4.jpeg", alt: "Lumina Eternity Band" },
  { src: "/images/custom/img5.jpeg", alt: "Verdant Royal Solitaire" },
  { src: "/images/custom/img6.jpeg", alt: "Sovereign Sculpted Cuff" },
  { src: "/images/custom/img7.jpeg", alt: "Imperial Drop Earrings" },
  { src: "/images/custom/img8.jpeg", alt: "Midnight Filigree Stud" },
  { src: "/images/custom/img9.jpeg", alt: "Dew Droplet Aquamarine" },
  { src: "/images/custom/img10.jpeg", alt: "Lumina Tennis Bracelet" },
  { src: "/images/custom/img11.jpeg", alt: "Helio Noir Ring" },
  { src: "/images/custom/img12.jpeg", alt: "Stella Link Choker" },
  { src: "/images/custom/img13.jpeg", alt: "Astral Emerald Pendant" },
  { src: "/images/custom/img14.jpeg", alt: "Solstice Geometric Drops" },
  { src: "/images/custom/img15.jpeg", alt: "Bespoke Sculpted Band" },
  { src: "/images/custom/img16.jpeg", alt: "Vici Signature Signet" },
  { src: "/images/custom/img17.jpeg", alt: "Chrono Geometric Signet" },
  { src: "/images/custom/img18.jpeg", alt: "Solstice Radiant Studs" },
  { src: "/images/custom/img19.jpeg", alt: "Nova Eternity Band" },
  { src: "/images/custom/img20.jpeg", alt: "Zenith Statement Pendant" },
];

export default function HomePage() {
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

      // 3. Carousel Showcase header elevation on approach
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
    <main className="luxury-page bg-[#050505]">
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
          className="relative flex items-start justify-center min-h-[96vh] px-[3vw] pt-2 overflow-hidden"
        >
          {/* Dynamic Layered WebGL Shader & Architectural Diamond Lattice Backdrop */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
          >
            {/* Live Animated WebGL Fluid Shader Background */}
            <div className="absolute inset-0 opacity-85">
              <ShaderBackground
                className="w-full h-full"
                colors={[
                  [0.92, 0.97, 0.94], // Luminous Ivory / Mint
                  [0.78, 0.92, 0.86], // Pale Emerald Soft Mint
                  [0.42, 0.76, 0.62], // Soft Jade Green
                  [0.10, 0.45, 0.32], // Deep Emerald Green
                  [0.03, 0.18, 0.12], // Dark Forest Green
                  [0.95, 0.98, 0.96], // Pure Silver White
                  [1.00, 1.00, 1.00],
                  [1.00, 1.00, 1.00],
                ]}
                colorCount={6}
              />
            </div>

            {/* Glowing Pulsating Emerald Aurora Flares */}
            <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#1fe0bb]/25 to-emerald-600/10 blur-[100px] animate-pulse pointer-events-none" />
            <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#0B4A3B]/30 via-emerald-500/15 to-transparent blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-white/40 blur-[90px] pointer-events-none" />

            {/* High-Definition Diamond Lattice Filigree SVG Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hero-jewelry-lattice" width="80" height="80" patternUnits="userSpaceOnUse">
                  <polygon points="40,4 76,40 40,76 4,40" fill="none" stroke="#0B4A3B" strokeWidth="1.2" opacity="0.35" />
                  <polygon points="40,18 62,40 40,62 18,40" fill="none" stroke="#0B4A3B" strokeWidth="0.8" opacity="0.25" />
                  <line x1="0" y1="0" x2="80" y2="80" stroke="#0B4A3B" strokeWidth="0.5" opacity="0.2" />
                  <line x1="80" y1="0" x2="0" y2="80" stroke="#0B4A3B" strokeWidth="0.5" opacity="0.2" />
                  <line x1="40" y1="28" x2="40" y2="52" stroke="#0B4A3B" strokeWidth="1.4" opacity="0.4" />
                  <line x1="28" y1="40" x2="52" y2="40" stroke="#0B4A3B" strokeWidth="1.4" opacity="0.4" />
                  <circle cx="40" cy="40" r="2.5" fill="#0B4A3B" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-jewelry-lattice)" />
            </svg>

            {/* Soft Radial Vignette for Perfect Contrast */}
            <div className="absolute inset-0 bg-radial from-transparent via-emerald-950/5 to-black/35 pointer-events-none" />
          </div>

          <div className="relative w-full max-w-[1700px] min-h-[90vh] flex items-start justify-center pt-4">
            {/* Pure VINI VICI VIDI Branding with Shiny Metallic Silver Corners */}
            <div className="absolute inset-0 z-2 w-full h-full uppercase pointer-events-none font-display">
              {/* VINI (Top Left) */}
              <div className="brand-group-vini absolute top-[4%] left-[4%] flex items-center z-1 text-[clamp(6rem,14vw,20rem)] font-black leading-[0.88] tracking-tight text-[#0B4A3B] select-none">
                <div className="relative inline-flex items-center px-4 py-1">
                  <MetallicSilverCorner position="tl" size="md" />
                  <MetallicSilverCorner position="tr" size="md" />
                  <MetallicSilverCorner position="bl" size="md" />
                  <MetallicSilverCorner position="br" size="md" />
                  <span>VINI</span>
                </div>
              </div>

              {/* VICI (Centerpiece) */}
              <div className="brand-group-vici absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-1 text-[clamp(10rem,24vw,36rem)] font-black leading-[0.88] tracking-tight text-[#0B4A3B] select-none">
                <div className="relative inline-flex items-center justify-center px-8 py-2">
                  <MetallicSilverCorner position="tl" size="lg" />
                  <MetallicSilverCorner position="tr" size="lg" />
                  <MetallicSilverCorner position="bl" size="lg" />
                  <MetallicSilverCorner position="br" size="lg" />
                  <span>VICI</span>
                  <div className="absolute w-[150%] h-[150%] rounded-full bg-radial from-[#1F7A5C]/20 via-[#0B4A3B]/8 to-transparent blur-[70px] pointer-events-none -z-1" />
                </div>
              </div>

              {/* VIDI (Bottom Right) */}
              <div className="brand-group-vidi absolute bottom-[6%] right-[4%] flex items-center z-1 text-[clamp(6rem,14vw,20rem)] font-black leading-[0.88] tracking-tight text-[#0B4A3B] select-none">
                <div className="relative inline-flex items-center px-4 py-1">
                  <MetallicSilverCorner position="tl" size="md" />
                  <MetallicSilverCorner position="tr" size="md" />
                  <MetallicSilverCorner position="bl" size="md" />
                  <MetallicSilverCorner position="br" size="md" />
                  <span>VIDI</span>
                </div>
              </div>
            </div>

            {/* 3D Ring Hero Model - Interactive & Centered */}
            <div className="hero-ring-container absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(65rem,90vw,120rem)] h-[clamp(40rem,65vh,70rem)] flex items-center justify-center z-20 pointer-events-none will-change-transform">
              <GlbRingScene />
            </div>

            {/* Deep Emerald CTA Button in Hero */}
            <div className="hero-cta-container absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
              <a
                href="#showcase"
                className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#0B4A3B] text-white font-semibold text-xs tracking-[0.22em] uppercase shadow-2xl shadow-[#0B4A3B]/45 hover:bg-[#1F7A5C] hover:scale-105 transition-all duration-300 border border-[#E6F2EA]/30"
              >
                <Sparkles className="w-4 h-4 text-[#1fe0bb] animate-pulse" />
                <span>Explore Showcase</span>
                <ArrowRight className="w-4 h-4 text-[#E6F2EA] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* 3D Stacked Card Carousel Section */}
        <section id="showcase" className="relative w-full overflow-hidden">
          <CarouselStacked />
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
