"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface ParallaxGalleryItem {
  image: string;
  title: string;
  href?: string;
}

interface ParallaxGalleryProps {
  items: ParallaxGalleryItem[];
}

// Column configs: each column gets different vertical offsets and 3D tilt angles
const COLUMNS = [
  { offsetY: [-80, 80], rotateX: [6, -6], rotateY: [-4, 4], rotateZ: [-2, 2], delay: 0 },
  { offsetY: [60, -60], rotateX: [-5, 5], rotateY: [5, -5], rotateZ: [1.5, -1.5], delay: 0.05 },
  { offsetY: [-100, 100], rotateX: [8, -8], rotateY: [-3, 3], rotateZ: [-3, 3], delay: 0.1 },
  { offsetY: [40, -40], rotateX: [-4, 4], rotateY: [6, -6], rotateZ: [2, -2], delay: 0.15 },
];

function ParallaxColumn({
  images,
  colConfig,
  containerRef,
}: {
  images: ParallaxGalleryItem[];
  colConfig: (typeof COLUMNS)[0];
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], colConfig.offsetY);
  const rawRotX = useTransform(scrollYProgress, [0, 1], colConfig.rotateX);
  const rawRotY = useTransform(scrollYProgress, [0, 1], colConfig.rotateY);
  const rawRotZ = useTransform(scrollYProgress, [0, 1], colConfig.rotateZ);

  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.8 });
  const rotateX = useSpring(rawRotX, { stiffness: 50, damping: 18 });
  const rotateY = useSpring(rawRotY, { stiffness: 50, damping: 18 });
  const rotateZ = useSpring(rawRotZ, { stiffness: 50, damping: 18 });

  return (
    <motion.div
      className="flex flex-col gap-4"
      style={{ y, rotateX, rotateY, rotateZ, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: colConfig.delay }}
    >
      {images.map((item, i) => (
        <GalleryCard key={i} item={item} />
      ))}
    </motion.div>
  );
}

function GalleryCard({ item }: { item: ParallaxGalleryItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={item.href ?? "#"}
      className="relative block overflow-hidden rounded-xl cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
      animate={{ scale: hovered ? 1.03 : 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-4"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <p className="text-white text-sm font-medium tracking-wide leading-snug"
           style={{ fontFamily: "var(--font-editorial), serif" }}>
          {item.title}
        </p>
      </motion.div>

      {/* Shimmer border on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

export function ParallaxUnfurlingGallery({ items }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Distribute items across 4 columns
  const columns = COLUMNS.map((_, colIdx) =>
    items.filter((_, i) => i % 4 === colIdx)
  );

  // If any column is empty, duplicate from items
  const filled = columns.map((col, colIdx) =>
    col.length > 0 ? col : items.slice(colIdx, colIdx + 2)
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}
    >
      {/* Ambient gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-3 md:px-0 py-8">
        {filled.map((colItems, colIdx) => (
          <ParallaxColumn
            key={colIdx}
            images={colItems}
            colConfig={COLUMNS[colIdx]}
            containerRef={containerRef}
          />
        ))}
      </div>
    </div>
  );
}
