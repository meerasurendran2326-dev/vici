"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { cn } from "@/app/lib/utils";
import { Sparkles, Gem, ArrowRight } from "lucide-react";

export interface Spiral3DSlide {
  src?: string;
  image?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  price?: string;
}

const defaultSlides: Spiral3DSlide[] = [
  { src: "/images/custom/img1.jpeg", alt: "Helio Ring", title: "Helio Ring", subtitle: "925 Sterling Silver & Onyx", badge: "Collection 01", price: "$1,420" },
  { src: "/images/custom/img2.jpeg", alt: "Lune Pendant", title: "Lune Pendant", subtitle: "Artisanal Lunar Silver", badge: "Collection 02", price: "$980" },
  { src: "/images/custom/img3.jpeg", alt: "Aether Cuff", title: "Aether Cuff", subtitle: "Fluid Sculptural Silver", badge: "Bespoke", price: "$1,860" },
  { src: "/images/custom/img4.jpeg", alt: "Solstice Earrings", title: "Solstice Earrings", subtitle: "Geometric Parisian Drop", badge: "Limited", price: "$1,220" },
  { src: "/images/custom/img5.jpeg", alt: "Mira Chain", title: "Mira Chain", subtitle: "Interlocking Polished Links", badge: "Signature", price: "$1,345" },
  { src: "/images/custom/img6.jpeg", alt: "Vortex Ring", title: "Vortex Ring", subtitle: "Pavé Diamond Silver", badge: "Haute Joaillerie", price: "$2,100" },
  { src: "/images/custom/img7.jpeg", alt: "Astral Band", title: "Astral Band", subtitle: "Brushed 925 Silver", badge: "Classic", price: "$850" },
  { src: "/images/custom/img8.jpeg", alt: "Stella Pendant", title: "Stella Pendant", subtitle: "Onyx & Silver Masterpiece", badge: "Exquisite", price: "$1,650" },
];

export interface Spiral3DSliderProps {
  slides?: Spiral3DSlide[];
  items?: Spiral3DSlide[];
  autoRotate?: boolean;
  autoSpeed?: number;
  className?: string;
}

export function Spiral3DSlider({
  slides,
  items,
  className = "",
}: Spiral3DSliderProps) {
  const dataList = slides || items || defaultSlides;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full py-32 bg-[#F8F7F4] overflow-hidden flex flex-col items-center justify-center select-none border-t border-[#C6C9CC]",
        className
      )}
    >
      <div className="text-center mb-20 px-4 z-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B4A3B]/10 text-[#0B4A3B] text-[0.65rem] uppercase tracking-[0.35em] font-semibold mb-3 border border-[#0B4A3B]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#1F7A5C]" />
          Spiral Orbit Collection
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-[#2B2B2E] tracking-[0.25em] font-display uppercase">
          Cinematic Spiral 3D
        </h2>
        <p className="text-xs text-[#9CA0A6] font-serif italic tracking-[0.15em] mt-2">
          Explore our masterworks in a rotating spatial 3D spiral wave
        </p>
      </div>

      <div className="relative w-full max-w-7xl h-[650px] sm:h-[750px] flex items-center justify-center [perspective:1600px] overflow-visible">
        <div className="absolute w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
          {dataList.map((slide, index) => {
            const total = dataList.length;
            const progressOffset = index / total;
            const imageUrl = slide.src || slide.image || `/images/custom/img${(index % 15) + 1}.jpeg`;
            const titleText = slide.title || slide.alt || "Masterpiece";
            const subText = slide.subtitle || slide.alt || "";
            const badgeText = slide.badge || "Collection";
            const priceText = slide.price || "$1,250";

            // Spiral wave mathematical mapping across scroll progress
            const x = useTransform(smoothProgress, [0, 1], [
              Math.sin(progressOffset * Math.PI * 2) * 350 + (index - total / 2) * 70,
              Math.cos(progressOffset * Math.PI * 2 + Math.PI) * 400 + (total / 2 - index) * 60
            ]);

            const y = useTransform(smoothProgress, [0, 1], [
              Math.cos(progressOffset * Math.PI * 2) * 180 + ((index % 2 === 0 ? 1 : -1) * 60),
              Math.sin(progressOffset * Math.PI * 2 + Math.PI) * 200 + ((index % 2 === 0 ? -1 : 1) * 80)
            ]);

            const z = useTransform(smoothProgress, [0, 1], [
              Math.sin(progressOffset * Math.PI * 4) * 250 - (index * 25),
              Math.cos(progressOffset * Math.PI * 4) * 300 + (index * 20)
            ]);

            const rotateY = useTransform(smoothProgress, [0, 1], [
              progressOffset * 360 - 45,
              progressOffset * 360 + 220
            ]);

            const rotateZ = useTransform(smoothProgress, [0, 1], [
              (index % 2 === 0 ? 1 : -1) * 12,
              (index % 2 === 0 ? -1 : 1) * 15
            ]);

            return (
              <motion.div
                key={index}
                style={{
                  x,
                  y,
                  z,
                  rotateY,
                  rotateZ,
                  transformStyle: "preserve-3d",
                }}
                className="absolute w-56 sm:w-72 h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border border-[#C6C9CC]/80 bg-[#FFFFFF] cursor-pointer group hover:border-[#0B4A3B] transition-colors duration-300"
              >
                <div className="relative w-full h-full bg-[#FFFFFF]">
                  <img
                    src={imageUrl}
                    alt={titleText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2E]/95 via-[#2B2B2E]/20 to-transparent" />

                  <div className="absolute top-4 right-4 px-3 py-1 text-[0.65rem] font-semibold rounded-full bg-[#0B4A3B] text-[#FFFFFF] uppercase tracking-widest shadow flex items-center gap-1.5">
                    <Gem className="w-3 h-3 text-[#E6F2EA]" />
                    {priceText}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-[#FFFFFF]">
                    <p className="text-base sm:text-lg font-bold uppercase tracking-wider font-display mb-1">
                      {titleText}
                    </p>
                    <p className="text-xs text-[#9CA0A6] font-serif italic mb-3">
                      {subText}
                    </p>
                    <div className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-[#E6F2EA] font-semibold">
                      <span>{badgeText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Gallery() {
  const slides = defaultSlides;
  return (
    <Spiral3DSlider
      items={slides}
      className="min-h-[900px]"
    />
  );
}

export default Spiral3DSlider;
