"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

export interface InfiniteCanvasProps {
  imageSize?: string;
  numberOfImages?: number;
  imageRootPath?: string;
  gap?: string;
  className?: string;
  images?: string[];
  columns?: number;
  friction?: number;
  autoPanSpeedX?: number;
  autoPanSpeedY?: number;
}

export function InfiniteCanvas({
  imageSize = "20vw",
  numberOfImages = 20,
  imageRootPath = "/images/custom",
  gap = "8vw",
  className = "",
  images: customImages,
  columns = 5,
  friction = 0.92,
  autoPanSpeedX = 0.2,
  autoPanSpeedY = 0.1,
}: InfiniteCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const targetOffsetRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Generate image paths from root path or custom array
  const imageList = React.useMemo(() => {
    if (customImages && customImages.length > 0) return customImages;
    const list: string[] = [];
    for (let i = 1; i <= numberOfImages; i++) {
      list.push(`${imageRootPath}/img${i}.jpeg`);
    }
    return list;
  }, [customImages, numberOfImages, imageRootPath]);

  // Repeat images to create an expansive infinite field
  const repeatCount = 4;
  const totalTiles = imageList.length * repeatCount;
  const rows = Math.ceil(totalTiles / columns);

  // Parse CSS size/gap to numeric approximation for wrapping calculations
  const [unitSize, setUnitSize] = useState({ width: 320, height: 400, gap: 100 });

  const calculateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    // Convert vw / px / rem to pixels
    let sizePx = 300;
    if (imageSize.endsWith("vw")) {
      sizePx = (parseFloat(imageSize) / 100) * containerWidth;
    } else if (imageSize.endsWith("px")) {
      sizePx = parseFloat(imageSize);
    } else if (imageSize.endsWith("rem")) {
      sizePx = parseFloat(imageSize) * 16;
    }

    let gapPx = 60;
    if (gap.endsWith("vw")) {
      gapPx = (parseFloat(gap) / 100) * containerWidth;
    } else if (gap.endsWith("px")) {
      gapPx = parseFloat(gap);
    } else if (gap.endsWith("rem")) {
      gapPx = parseFloat(gap) * 16;
    }

    // Aspect ratio 4:5 for luxury jewelry photos
    const width = Math.max(160, sizePx);
    const height = width * 1.25;

    setUnitSize({ width, height, gap: gapPx });
  }, [imageSize, gap]);

  useEffect(() => {
    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [calculateDimensions]);

  // Main render and inertia loop
  useEffect(() => {
    const gridWidth = columns * (unitSize.width + unitSize.gap);
    const gridHeight = rows * (unitSize.height + unitSize.gap);

    if (gridWidth <= 0 || gridHeight <= 0) return;

    const update = () => {
      if (!isDraggingRef.current) {
        // Apply inertia
        offsetRef.current.x += velocityRef.current.x;
        offsetRef.current.y += velocityRef.current.y;

        // Apply friction
        velocityRef.current.x *= friction;
        velocityRef.current.y *= friction;

        // Subtle idle drift
        offsetRef.current.x -= autoPanSpeedX;
        offsetRef.current.y -= autoPanSpeedY;
      }

      // Seamless toroidal wrapping
      let currentX = offsetRef.current.x % gridWidth;
      let currentY = offsetRef.current.y % gridHeight;

      if (currentX > 0) currentX -= gridWidth;
      if (currentY > 0) currentY -= gridHeight;

      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [columns, rows, unitSize, friction, autoPanSpeedX, autoPanSpeedY]);

  // Pointer & Touch handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;

    offsetRef.current.x += dx;
    offsetRef.current.y += dy;

    // Smooth velocity calculation for momentum
    velocityRef.current = {
      x: dx * 0.8 + velocityRef.current.x * 0.2,
      y: dy * 0.8 + velocityRef.current.y * 0.2,
    };

    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  // Mouse wheel interaction
  const handleWheel = (e: React.WheelEvent) => {
    offsetRef.current.x -= e.deltaX * 0.7;
    offsetRef.current.y -= e.deltaY * 0.7;
    velocityRef.current = {
      x: -e.deltaX * 0.15,
      y: -e.deltaY * 0.15,
    };
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      className={`relative h-full w-full overflow-hidden select-none cursor-grab active:cursor-grabbing bg-[#080c09] ${className}`}
      style={{ touchAction: "none" }}
    >
      {/* 2x2 tiled grid container for infinite wrap */}
      <div
        ref={gridRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns * 2}, ${unitSize.width}px)`,
          gap: `${unitSize.gap}px`,
          padding: `${unitSize.gap}px`,
        }}
      >
        {Array.from({ length: totalTiles * 4 }).map((_, index) => {
          const imageSrc = imageList[index % imageList.length];
          const itemNumber = (index % numberOfImages) + 1;

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-neutral-900 border border-emerald-950/40 shadow-2xl transition-transform duration-500 ease-out hover:scale-105 hover:z-20 hover:border-emerald-500/50"
              style={{
                width: `${unitSize.width}px`,
                height: `${unitSize.height}px`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={`Product item ${itemNumber}`}
                draggable={false}
                loading="lazy"
                onError={(e) => {
                  // Fallback to jpg or default if not found
                  const target = e.currentTarget;
                  if (target.src.endsWith(".jpeg")) {
                    target.src = target.src.replace(".jpeg", ".png");
                  }
                }}
                className="h-full w-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Luxury Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

              {/* Card Label */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-80 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[0.65rem] tracking-[0.22em] text-emerald-400 font-semibold uppercase block">
                  VICI ATELIER
                </span>
                <span className="text-sm font-medium text-white/90 truncate block mt-0.5">
                  Piece No. {String(itemNumber).padStart(2, "0")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Canvas UI hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 backdrop-blur-md">
        <p className="text-[0.65rem] tracking-[0.2em] text-white/60 uppercase">
          Drag or scroll to explore archive
        </p>
      </div>
    </div>
  );
}

export default InfiniteCanvas;
