"use client";

import { useEffect, useState, useRef } from "react";
import { Header } from "@/app/components/luxury/Header";
import GlbRingScene from "@/app/three/scenes/GlbRingScene";
import { Spiral3DSlider } from "@/app/components/ui/spiral-3d-slider";
import { setupLenis } from "@/app/animations/scroll/lenis";
import { gsap } from "gsap";
import { ShieldCheck, Truck, Clock, PhoneCall, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [entered, setEntered] = useState(true);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const statusSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const lenis = setupLenis();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const vini = document.querySelector(".brand-group-vini");
      const vici = document.querySelector(".brand-group-vici");
      const vidi = document.querySelector(".brand-group-vidi");
      const heroNote = document.querySelector(".hero-note");

      if (vini && vici && vidi) {
        gsap.to(vini, {
          y: scrollY * 0.18,
          opacity: Math.max(0, 1 - scrollY / (windowHeight * 0.75)),
          duration: 0.25,
          overwrite: "auto",
        });
        gsap.to(vici, {
          scale: Math.max(0.85, 1 - (scrollY / windowHeight) * 0.16),
          opacity: Math.max(0, 1 - scrollY / (windowHeight * 0.65)),
          duration: 0.25,
          overwrite: "auto",
        });
        gsap.to(vidi, {
          y: -scrollY * 0.14,
          opacity: Math.max(0, 1 - scrollY / (windowHeight * 0.75)),
          duration: 0.25,
          overwrite: "auto",
        });
      }

      if (heroNote) {
        gsap.to(heroNote, {
          opacity: Math.max(0, 1 - scrollY / (windowHeight * 0.5)),
          y: scrollY * 0.2,
          duration: 0.2,
          overwrite: "auto",
        });
      }

      if (statusSectionRef.current) {
        const rect = statusSectionRef.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
          gsap.to(statusSectionRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="luxury-page">
      <div className="showroom-shell is-entered">
        {/* Header with Deep Emerald accents */}
        <header className="site-header sticky top-0 z-40 px-[3.2vw] pt-5">
          <nav className="flex items-center justify-between gap-6 px-6 py-4 border border-[#C6C9CC] bg-[#FFFFFF]/90 backdrop-blur-md uppercase text-[0.64rem] text-[#0B4A3B] shadow-sm rounded-xl">
            <div className="font-bold tracking-[0.08em]" style={{ wordSpacing: "0.6em" }}>VINI VICI VIDI</div>
            <div className="hidden md:flex items-center gap-8 text-[#2B2B2E]">
              <a href="#collection" className="hover:text-[#1F7A5C] transition-colors">Collections</a>
              <a href="#heritage" className="hover:text-[#1F7A5C] transition-colors">Atelier</a>
              <a href="#contact" className="hover:text-[#1F7A5C] transition-colors">Concierge</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block text-[#9CA0A6]">WhatsApp</span>
              <button type="button" className="px-5 py-2.5 rounded-full bg-[#0B4A3B] text-[#FFFFFF] hover:bg-[#1F7A5C] transition-all tracking-[0.25em] shadow-md">
                Cart (0)
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section ref={heroSectionRef} className="relative flex items-start justify-center min-h-[92vh] px-[3vw] pt-2">
          <div className="relative w-full max-w-[1700px] min-h-[90vh] flex items-start justify-center pt-4">
            <div className="absolute left-[4.5%] bottom-[16%] flex flex-col gap-2 max-w-[14rem] text-[#2B2B2E] uppercase tracking-[0.35em] text-[0.6rem] z-5">
              <span className="font-semibold text-[#0B4A3B] tracking-[0.4em]">925 STERLING SILVER</span>
              <span className="text-[0.68rem] tracking-[0.28em] text-[#9CA0A6]">FACETED ONYX & DIAMOND</span>
            </div>

            {/* VINI VICI VIDI Branding in Deep Emerald */}
            <div className="absolute inset-0 z-2 w-full h-full uppercase pointer-events-none font-display">
              <div className="absolute top-[3%] left-[3%] flex flex-col items-start gap-1.5 z-1">
                <div className="flex items-center gap-3 text-[0.65rem] tracking-[0.25em] text-[#0B4A3B]">
                  <span className="font-serif italic text-sm text-[#1F7A5C]">I</span>
                  <span>INCEPTION</span>
                  <div className="w-10 h-[1px] bg-gradient-to-r from-[#0B4A3B] to-transparent" />
                </div>
                <span className="text-[clamp(5.5rem,13vw,19rem)] font-extrabold leading-[0.88] tracking-normal text-[#0B4A3B]">VINI</span>
                <span className="text-[0.62rem] tracking-[0.32em] text-[#9CA0A6]">ÉDITION STERLING</span>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-1">
                <span className="text-[clamp(10rem,24vw,36rem)] font-extrabold leading-[0.88] tracking-normal text-[#0B4A3B]/95">VICI</span>
                <div className="absolute w-[140%] h-[140%] rounded-full bg-radial from-[#1F7A5C]/15 via-[#0B4A3B]/5 to-transparent blur-[50px] pointer-events-none -z-1" />
              </div>

              <div className="absolute bottom-[5%] right-[3%] flex flex-col items-end gap-1.5 z-1">
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
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(65rem,90vw,120rem)] h-[clamp(40rem,65vh,70rem)] flex items-center justify-center z-20 pointer-events-none">
              <GlbRingScene />
            </div>

            {/* Deep Emerald CTA Button in Hero */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
              <a href="#contact" className="btn-emerald inline-flex items-center gap-3">
                <span>Contact Concierge</span>
                <ArrowRight className="w-4 h-4 text-[#E6F2EA]" />
              </a>
            </div>
          </div>
        </section>

        {/* Spiral 3D Slider Section showcasing product pictures with motion animation */}
        <section id="collection" className="relative w-full overflow-hidden">
          <Spiral3DSlider autoRotate autoSpeed={0.15} />
        </section>

        {/* Status & Trust Bar */}
        <section
          ref={statusSectionRef}
          id="contact"
          className="relative w-full py-16 px-6 bg-[#E6F2EA] border-t border-[#C6C9CC] opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-[#2B2B2E]">
            <div className="flex items-center gap-4 p-6 bg-[#FFFFFF] rounded-xl border border-[#C6C9CC] shadow-sm">
              <ShieldCheck className="w-8 h-8 text-[#0B4A3B] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1">Certified 925 Silver</h4>
                <p className="text-[0.7rem] text-[#9CA0A6]">Guaranteed authenticity & hallmarks</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-[#FFFFFF] rounded-xl border border-[#C6C9CC] shadow-sm">
              <Truck className="w-8 h-8 text-[#0B4A3B] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1">Insured Express Shipping</h4>
                <p className="text-[0.7rem] text-[#9CA0A6]">Dispatched securely worldwide</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-[#FFFFFF] rounded-xl border border-[#C6C9CC] shadow-sm">
              <Clock className="w-8 h-8 text-[#0B4A3B] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1">Atelier Warranty</h4>
                <p className="text-[0.7rem] text-[#9CA0A6]">Lifetime complimentary polishing</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-[#FFFFFF] rounded-xl border border-[#C6C9CC] shadow-sm">
              <PhoneCall className="w-8 h-8 text-[#0B4A3B] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1">WhatsApp Concierge</h4>
                <p className="text-[0.7rem] text-[#9CA0A6]">Direct assistance 24/7</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative w-full py-16 px-6 bg-[#2B2B2E] text-[#F8F7F4] border-t border-[#C6C9CC]/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-[#FFFFFF] text-sm uppercase mb-4 tracking-[0.08em]" style={{ wordSpacing: "0.6em" }}>VINI VICI VIDI</h3>
              <p className="text-xs text-[#9CA0A6] font-serif italic leading-relaxed mb-4">
                The pinnacle of modern silver haute joaillerie. Crafted with precision in Paris, cherished worldwide.
              </p>
              <span className="text-[0.65rem] text-[#1F7A5C] tracking-widest uppercase font-semibold">
                Paris • London • Mumbai
              </span>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FFFFFF] mb-4">Collections</h4>
              <ul className="space-y-2 text-xs text-[#9CA0A6]">
                <li><a href="#contact" className="hover:text-[#1F7A5C] transition-colors">Helio & Rings</a></li>
                <li><a href="#contact" className="hover:text-[#1F7A5C] transition-colors">Lune Pendants</a></li>
                <li><a href="#contact" className="hover:text-[#1F7A5C] transition-colors">Aether Cuffs</a></li>
                <li><a href="#contact" className="hover:text-[#1F7A5C] transition-colors">Solstice Earrings</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FFFFFF] mb-4">Client Care</h4>
              <ul className="space-y-2 text-xs text-[#9CA0A6]">
                <li><a href="#contact" className="hover:text-[#1F7A5C] transition-colors">WhatsApp Concierge</a></li>
                <li><a href="#contact" className="hover:text-[#1F7A5C] transition-colors">Shipping & Returns</a></li>
                <li><a href="#contact" className="hover:text-[#1F7A5C] transition-colors">Ring Size Guide</a></li>
                <li><a href="#contact" className="hover:text-[#1F7A5C] transition-colors">Atelier Care</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FFFFFF] mb-4">Atelier Newsletter</h4>
              <p className="text-xs text-[#9CA0A6] mb-4 font-serif italic">
                Receive private invitations to seasonal silver drops.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-[#121212] border border-[#C6C9CC]/40 rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#1F7A5C] flex-grow"
                />
                <button type="button" className="px-5 py-2.5 rounded-full bg-[#0B4A3B] text-[#FFFFFF] text-xs uppercase tracking-widest hover:bg-[#1F7A5C] transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-8 border-t border-[#C6C9CC]/20 flex flex-col sm:flex-row items-center justify-between text-[0.65rem] text-[#9CA0A6] tracking-widest uppercase">
            <p>© 2026 Vini Vici Vidi Maison. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#privacy" className="hover:text-[#FFFFFF] transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-[#FFFFFF] transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
