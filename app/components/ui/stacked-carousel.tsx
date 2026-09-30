"use client";

import * as React from "react";
import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "motion/react";
import { cn } from "@/app/lib/utils";
import { Sparkles, Gem, ArrowRight } from "lucide-react";

export interface Slide {
  image: string;
  title: string;
  description: string;
  badge: string;
}

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
  opacityReduction: number;
  zIndexMultiplier: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 20,
      rotationMultiplier: 8,
      scaleReduction: 0.08,
      opacityReduction: 0.2,
      zIndexMultiplier: 10,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 150,
    yMultiplier: 35,
    rotationMultiplier: 10,
    scaleReduction: 0.06,
    opacityReduction: 0.15,
    zIndexMultiplier: 10,
  };
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
}

const Card = ({ slide, index, total, progress, config }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const offset = useTransform(progress, (val) => {
    let diff = index - val;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    const baseScale = Math.max(0.65, 1 - absO * config.scaleReduction);
    return isHovered && absO < 0.2 ? baseScale * 1.15 : baseScale;
  });
  const opacity = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO > 2.5) return 0;
    return Math.max(0.25, 1 - absO * config.opacityReduction);
  });
  const zIndex = useTransform(offset, (o) => {
    return isHovered ? 100 : Math.round((total - Math.abs(o)) * config.zIndexMultiplier);
  });

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "absolute rounded-2xl overflow-hidden bg-[#0f6a52] border border-[#3aa982]/40 shadow-2xl cursor-pointer transition-shadow duration-300",
        "w-48 h-64 sm:w-64 sm:h-88 lg:w-76 lg:h-[26rem]",
        isHovered ? "shadow-[0_25px_60px_-15px_rgba(15,106,82,0.4)] ring-2 ring-[#3aa982]" : ""
      )}
    >
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={slide.image}
          alt={slide.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f6a52]/95 via-[#0f6a52]/40 to-transparent" />

        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 px-3 py-1 text-xs font-semibold rounded-full bg-[#0f6a52]/85 text-[#f7f0f2] backdrop-blur-md uppercase tracking-widest border border-[#3aa982]/40 flex items-center gap-1.5 shadow-lg">
          <Gem className="w-3.5 h-3.5 text-[#3aa982]" />
          {slide.badge}
        </div>

        <div className="absolute bottom-5 left-4 right-4 sm:bottom-8 sm:left-6 sm:right-6 text-[#f7f0f2] text-center sm:text-left">
          <motion.p
            style={{
              opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
            }}
            className="text-base sm:text-xl font-bold leading-tight mb-1 tracking-wider uppercase font-display text-[#f7f0f2]"
          >
            {slide.title}
          </motion.p>
          <motion.p
            style={{
              opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
            }}
            className="hidden sm:block text-xs text-[#f7f0f2]/80 font-serif italic tracking-wide line-clamp-2 mb-3"
          >
            {slide.description}
          </motion.p>
          <div className="flex items-center gap-2 text-[0.655rem] tracking-[0.25em] text-[#3aa982] uppercase font-semibold">
            <span>Explore Piece</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export interface StackedCarouselProps {
  slides?: Slide[];
  className?: string;
}

const defaultSlides: Slide[] = [
  {
    image: "/images/custom/img1.jpeg",
    title: "Helio Ring",
    description: "925 Sterling Silver with faceted onyx and pavé diamond details.",
    badge: "Collection 01",
  },
  {
    image: "/images/custom/img2.jpeg",
    title: "Lune Pendant",
    description: "Handcrafted lunar silhouette suspended on a classic silver chain.",
    badge: "Collection 02",
  },
  {
    image: "/images/custom/img3.jpeg",
    title: "Aether Cuff",
    description: "Architectural sculpture capturing the fluidity of liquid silver.",
    badge: "Bespoke",
  },
  {
    image: "/images/custom/img4.jpeg",
    title: "Solstice Earrings",
    description: "Radiant geometric drops reflecting artisanal Parisian heritage.",
    badge: "Limited",
  },
  {
    image: "/images/custom/img5.jpeg",
    title: "Mira Chain",
    description: "Interlocking links of mirror-polished sterling silver.",
    badge: "Signature",
  },
];

export function StackedCarousel({
  slides = defaultSlides,
  className = "",
}: StackedCarouselProps) {
  const [windowWidth, setWindowWidth] = useState(1200);
  const scrollProgress = useMotionValue(0);
  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = getCarouselConfig(windowWidth);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const current = scrollProgress.get();
    const distanceShift = -info.offset.x / config.distanceDivisor;
    const velocityShift = -info.velocity.x / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    let target = Math.round(current + totalShift);

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 25,
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full py-16 bg-[#FAF8F5] overflow-hidden select-none border-t border-[#0f6a52]/15",
        className
      )}
    >
      <div className="text-center mb-8 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f6a52]/10 text-[#0f6a52] text-[0.65rem] uppercase tracking-[0.35em] font-semibold mb-3">
          <Sparkles className="w-3 h-3 text-[#3aa982]" />
          Curated Archival Vault
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-[#0f6a52] tracking-[0.25em] font-display uppercase">
          Masterpiece Gallery
        </h2>
      </div>

      <div className="relative w-full max-w-7xl h-80 sm:h-[30rem] lg:h-[34rem] flex items-center justify-center cursor-grab active:cursor-grabbing">
        {/* Transparent Drag Surface */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-50 w-full h-full touch-pan-y"
        />

        {slides.map((slide, i) => (
          <Card
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
          />
        ))}
      </div>
    </div>
  );
}

export default StackedCarousel;
