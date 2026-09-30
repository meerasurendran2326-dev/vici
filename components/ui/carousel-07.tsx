"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export interface Slide {
  image: string;
  title: string;
  description: string;
  badge: string;
  price?: string;
}

export const defaultSlides: Slide[] = [
  {
    image: "/images/custom/img1.jpeg",
    title: "Helio Noir Ring",
    description: "Solid 925 Sterling Silver with faceted black onyx & pavé brilliant diamond.",
    badge: "Masterpiece",
    price: "$1,420",
  },
  {
    image: "/images/custom/img2.jpeg",
    title: "Lune Astral Pendant",
    description: "Hand-sculpted lunar silver talisman reflecting Parisian atelier heritage.",
    badge: "Haute Joaillerie",
    price: "$980",
  },
  {
    image: "/images/custom/img3.jpeg",
    title: "Aether Fluid Cuff",
    description: "Ergonomic sterling cuff sculpted to flow seamlessly around the wrist.",
    badge: "Bespoke",
    price: "$1,860",
  },
  {
    image: "/images/custom/img4.jpeg",
    title: "Solstice Drop Earrings",
    description: "Architectural geometric earrings finished in mirror-polished silver.",
    badge: "Édition Limitée",
    price: "$1,220",
  },
  {
    image: "/images/custom/img5.jpeg",
    title: "Vortex Pavé Band",
    description: "Interlocking dual bands set with scintillating pavé lab diamonds.",
    badge: "Signature",
    price: "$1,345",
  },
  {
    image: "/images/custom/img6.jpeg",
    title: "Sovereign Signet",
    description: "Substantial 925 signet bearing the deep emerald atelier seal.",
    badge: "Prestige",
    price: "$2,100",
  },
  {
    image: "/images/custom/img7.jpeg",
    title: "Stella Link Choker",
    description: "Chunky tactile silver link necklace with custom hand-carved clasp.",
    badge: "Atelier Drop",
    price: "$1,650",
  },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
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
      scaleReduction: 0.06,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 130,
      yMultiplier: 30,
      rotationMultiplier: 10,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

export interface CarouselStackedProps {
  slides?: Slide[];
  className?: string;
  autoPlay?: boolean;
}

export const CarouselStacked = ({
  slides = defaultSlides,
  className = "",
  autoPlay = true,
}: CarouselStackedProps) => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const isHovered = React.useRef(false);
  const lastHoverIndex = React.useRef<number | null>(null);

  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update current active index for indicator
  React.useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      const normalized = Math.round(latest) % total;
      setCurrentIndex((normalized + total) % total);
    });
    return () => unsubscribe();
  }, [scrollProgress, total]);

  // Gentle ambient drift when idle (pauses on hover or drag)
  React.useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      if (!isHovered.current && !isDragging.current) {
        const current = Math.round(scrollProgress.get());
        animate(scrollProgress, current + 1, {
          type: "spring",
          stiffness: 35,
          damping: 22,
          mass: 1.5,
        });
      }
    }, 5500);
    return () => clearInterval(interval);
  }, [autoPlay, scrollProgress]);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const handleDragStart = () => {
    isDragging.current = true;
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setTimeout(() => {
      isDragging.current = false;
    }, 60);

    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-2, Math.min(2, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 55,
      damping: 20,
      mass: 1.2,
    });
  };

  const handleCardFocus = (index: number) => {
    if (isDragging.current) return;
    lastHoverIndex.current = index;
    const current = scrollProgress.get();
    let diff = (index - (current % total)) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    animate(scrollProgress, current + diff, {
      type: "spring",
      stiffness: 50,
      damping: 20,
      mass: 1.2,
    });
  };

  const handlePrev = () => {
    const current = Math.round(scrollProgress.get());
    animate(scrollProgress, current - 1, {
      type: "spring",
      stiffness: 50,
      damping: 20,
      mass: 1.2,
    });
  };

  const handleNext = () => {
    const current = Math.round(scrollProgress.get());
    animate(scrollProgress, current + 1, {
      type: "spring",
      stiffness: 50,
      damping: 20,
      mass: 1.2,
    });
  };

  // Interactive mouse movement scrubbing across container with gentle smoothing
  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) return;
    isHovered.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width; // 0.0 to 1.0

    // Only steer towards a slide if moving cursor across zones
    const targetIndex = Math.min(
      total - 1,
      Math.max(0, Math.floor(relativeX * total)),
    );

    if (targetIndex !== lastHoverIndex.current) {
      lastHoverIndex.current = targetIndex;
      const current = scrollProgress.get();
      let diff = (targetIndex - (current % total)) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      animate(scrollProgress, current + diff, {
        type: "spring",
        stiffness: 42,
        damping: 22,
        mass: 1.4,
      });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full py-16 bg-[#F8F7F4] overflow-hidden select-none border-t border-b border-[#C6C9CC]/40",
        className,
      )}
    >
      {/* Header section above carousel */}
      <div className="flex flex-col items-center text-center max-w-xl px-4 mb-8">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F2EA] text-[#0B4A3B] text-[0.65rem] tracking-[0.25em] uppercase font-bold mb-3 border border-[#0B4A3B]/20">
          <Sparkles className="w-3 h-3 text-[#1F7A5C]" />
          <span>Atelier Showcase</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#0B4A3B]">
          Curated Silver Creations
        </h2>
        <p className="text-xs sm:text-sm text-[#9CA0A6] mt-2 font-serif italic">
          Hover over any card or move your cursor across the showcase to browse smoothly.
        </p>
      </div>

      {/* Main Stack Container with Drag & Hover Motion */}
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDrag={(_, info) => {
          isDragging.current = true;
          const delta = -info.delta.x / config.sensitivity;
          scrollProgress.set(scrollProgress.get() + delta);
        }}
        onDragEnd={handleDragEnd}
        onMouseEnter={() => {
          isHovered.current = true;
        }}
        onMouseLeave={() => {
          isHovered.current = false;
          lastHoverIndex.current = null;
        }}
        onMouseMove={handleContainerMouseMove}
        className="relative w-full max-w-7xl h-80 sm:h-112 lg:h-128 flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {slides.map((slide, i) => (
          <Card
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
            onSelect={() => handleCardFocus(i)}
            onHover={() => handleCardFocus(i)}
          />
        ))}
      </motion.div>

      {/* Navigation Controls & Dot Indicators (Responsive to Click AND Hover) */}
      <div className="relative z-30 flex items-center gap-6 mt-8">
        <button
          type="button"
          onClick={handlePrev}
          onMouseEnter={handlePrev}
          aria-label="Previous slide"
          className="p-3 rounded-full bg-[#FFFFFF] border border-[#C6C9CC] text-[#0B4A3B] hover:bg-[#0B4A3B] hover:text-[#FFFFFF] transition-all duration-300 shadow-sm hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleCardFocus(i)}
              onMouseEnter={() => handleCardFocus(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 transition-all duration-300 rounded-full cursor-pointer",
                currentIndex === i
                  ? "w-8 bg-[#0B4A3B]"
                  : "w-2 bg-[#C6C9CC] hover:bg-[#9CA0A6] hover:w-4",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          onMouseEnter={handleNext}
          aria-label="Next slide"
          className="p-3 rounded-full bg-[#FFFFFF] border border-[#C6C9CC] text-[#0B4A3B] hover:bg-[#0B4A3B] hover:text-[#FFFFFF] transition-all duration-300 shadow-sm hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
  onSelect?: () => void;
  onHover?: () => void;
}

const Card = ({
  slide,
  index,
  total,
  progress,
  config,
  onSelect,
  onHover,
}: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
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
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0],
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );

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
      className={cn(
        "absolute rounded-2xl pointer-events-auto",
        "w-44 h-56 sm:w-56 sm:h-80 lg:w-64 lg:h-96",
      )}
    >
      {/* Inner card container: hover enlargement and hover focus trigger */}
      <div
        onClick={onSelect}
        onMouseEnter={onHover}
        className={cn(
          "relative w-full h-full rounded-2xl overflow-hidden bg-muted group cursor-pointer",
          "transition-all duration-700 ease-out",
          "hover:scale-108 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(11,74,59,0.35)]",
          "border border-white/20 hover:border-[#1F7A5C]/70 hover:ring-2 hover:ring-[#1F7A5C]/60",
        )}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-115 pointer-events-none"
        />

        <motion.div
          style={{
            opacity: useTransform(
              offset,
              [-2, -0.5, 0, 0.5, 2],
              [0.5, 0.2, 0, 0.2, 0.5],
            ),
          }}
          className="absolute inset-0 bg-black pointer-events-none group-hover:opacity-10 transition-opacity duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        <Badge className="absolute top-3 right-3 sm:top-5 sm:right-5 lg:top-6 lg:right-6 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-[0.62rem] sm:text-xs font-bold uppercase tracking-widest text-[#0B4A3B] shadow-md border border-white/40 pointer-events-none">
          {slide.badge}
        </Badge>

        <div className="absolute bottom-5 left-3 right-3 sm:bottom-8 sm:left-5 sm:right-5 lg:bottom-10 lg:left-6 lg:right-6 text-white text-center sm:text-left pointer-events-none">
          {slide.price && (
            <span className="inline-block text-[0.68rem] tracking-[0.2em] font-semibold text-[#1F7A5C] bg-white/90 px-2 py-0.5 rounded mb-1">
              {slide.price}
            </span>
          )}
          <motion.p
            style={{
              opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
            }}
            className="text-sm sm:text-lg lg:text-xl font-bold leading-tight mb-0.5 sm:mb-1 drop-shadow-md text-white font-display"
          >
            {slide.title}
          </motion.p>
          <motion.p
            style={{
              opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
            }}
            className="hidden sm:block text-xs text-white/80 line-clamp-2 italic font-serif leading-relaxed"
          >
            {slide.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default CarouselStacked;
