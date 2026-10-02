"use client";

import React, { useId } from "react";

interface GreenSilverWordProps {
  word: "VINI" | "VICI" | "VIDI" | string;
  isCenterpiece?: boolean;
  className?: string;
  showCorners?: boolean;
}

export function GreenSilverWord({
  word,
  isCenterpiece = false,
  className = "",
  showCorners = true,
}: GreenSilverWordProps) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9-_]/g, "");

  // Tight, maximized dimensions so typography fills the viewBox with monumental scale
  const vbWidth = isCenterpiece ? 620 : 500;
  const vbHeight = isCenterpiece ? 165 : 140;
  const fontSize = isCenterpiece ? 168 : 140;
  const strokeWidth = isCenterpiece ? 3.8 : 3.0;

  // Snug corner bracket coordinates wrapping the letters tightly with prestige jewelry hallmark proportions
  const padX = isCenterpiece ? 10 : 8;
  const padY = isCenterpiece ? 8 : 6;
  const left = padX;
  const right = vbWidth - padX;
  const top = padY;
  const bottom = vbHeight - padY;
  const armLen = isCenterpiece ? 28 : 24;
  const cornerRadius = 4;

  // Unique image offset for each word to sample distinct flowing ribbons from the liquid emerald & chrome texture
  const imgOffset =
    word === "VINI"
      ? { x: "-5%", y: "-10%", scale: "120%" }
      : word === "VICI"
      ? { x: "-10%", y: "-5%", scale: "125%" }
      : { x: "-15%", y: "-15%", scale: "130%" };

  const corners = [
    // Top-Left
    {
      path: `M ${left} ${top + armLen} L ${left} ${top + cornerRadius} Q ${left} ${top} ${left + cornerRadius} ${top} L ${left + armLen} ${top}`,
      starX: left + 1.5,
      starY: top + 1.5,
    },
    // Top-Right
    {
      path: `M ${right - armLen} ${top} L ${right - cornerRadius} ${top} Q ${right} ${top} ${right} ${top + cornerRadius} L ${right} ${top + armLen}`,
      starX: right - 1.5,
      starY: top + 1.5,
    },
    // Bottom-Left
    {
      path: `M ${left} ${bottom - armLen} L ${left} ${bottom - cornerRadius} Q ${left} ${bottom} ${left + cornerRadius} ${bottom} L ${left + armLen} ${bottom}`,
      starX: left + 1.5,
      starY: bottom - 1.5,
    },
    // Bottom-Right
    {
      path: `M ${right - armLen} ${bottom} L ${right - cornerRadius} ${bottom} Q ${right} ${bottom} ${right} ${bottom - cornerRadius} L ${right} ${bottom - armLen}`,
      starX: right - 1.5,
      starY: bottom - 1.5,
    },
  ];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-label={word}
    >
      <svg
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        className="w-full h-auto overflow-visible drop-shadow-[0_25px_40px_rgba(1,26,19,0.7)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ======================================================== */}
          {/* 1. MASK DEFINITION: CLIPS DIRECTLY TO THE LETTER BOUNDARY */}
          {/* ======================================================== */}
          <mask id={`${id}-letter-boundary-mask`}>
            {/* White fill means 100% visible inside the letter boundaries */}
            <text
              x="50%"
              y="56%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFFFFF"
              className="font-black"
              style={{
                fontFamily: "var(--font-display), 'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: `${fontSize}px`,
                letterSpacing: isCenterpiece ? "-0.04em" : "-0.035em",
              }}
            >
              {word}
            </text>
          </mask>

          {/* ======================================================== */}
          {/* 2. LIQUID METALLIC CHROME & 925 STERLING SILVER GRADIENT */}
          {/* ======================================================== */}
          <linearGradient
            id={`${id}-silver-chrome`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="12%" stopColor="#F1F5F9" />
            <stop offset="26%" stopColor="#CBD5E1" />
            <stop offset="42%" stopColor="#475569" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="58%" stopColor="#94A3B8" />
            <stop offset="74%" stopColor="#E2E8F0" />
            <stop offset="88%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Razor Specular Sheen for Beveled Chrome Rims */}
          <linearGradient
            id={`${id}-silver-specular`}
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="28%" stopColor="#F8FAFC" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#94A3B8" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#E2E8F0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          {/* Diamond Sparkle Starburst Radial Gradient */}
          <radialGradient id={`${id}-star-glint`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#F1F5F9" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#94A3B8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>

          {/* Deep Emerald Glaze to enhance obsidian & jade shadows */}
          <linearGradient
            id={`${id}-emerald-glaze`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0B4A3B" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#022C22" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#011710" stopOpacity="0.5" />
          </linearGradient>

          {/* Radiant Glass Caustic Overlay */}
          <radialGradient
            id={`${id}-glass-caustic`}
            cx="40%"
            cy="25%"
            r="60%"
          >
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.65" />
            <stop offset="40%" stopColor="#059669" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#012217" stopOpacity="0" />
          </radialGradient>

          {/* 3D Liquid Glass Convex Lighting Filter */}
          <filter
            id={`${id}-liquid-convex`}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation="3.0" result="blur" />
            <feSpecularLighting
              in="blur"
              surfaceScale="5"
              specularConstant="2.0"
              specularExponent="28"
              lightingColor="#FFFFFF"
              result="specLight"
            >
              <fePointLight x="160" y="-60" z="240" />
            </feSpecularLighting>
            <feComposite in="specLight" in2="SourceAlpha" operator="in" result="cutSpec" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="cutSpec" />
            </feMerge>
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* INTERIOR: LIQUID DARK GREEN EMERALD GLASS & SILVER CHROME */}
        {/* Masked precisely inside the boundary of each letter       */}
        {/* ======================================================== */}
        <g mask={`url(#${id}-letter-boundary-mask)`}>
          {/* 1. High-Resolution Liquid Emerald Glass & Chrome Ribbon Texture */}
          <image
            href="/images/liquid-emerald-chrome.jpg"
            x={imgOffset.x}
            y={imgOffset.y}
            width={imgOffset.scale}
            height={imgOffset.scale}
            preserveAspectRatio="xMidYMid slice"
          />

          {/* 2. Deep Emerald Jewel Tint & Glass Depth Blend */}
          <rect
            x="0"
            y="0"
            width={vbWidth}
            height={vbHeight}
            fill={`url(#${id}-emerald-glaze)`}
            style={{ mixBlendMode: "multiply" }}
            opacity="0.4"
          />

          {/* 3. Radiant Emerald Caustic Highlight */}
          <rect
            x="0"
            y="0"
            width={vbWidth}
            height={vbHeight}
            fill={`url(#${id}-glass-caustic)`}
            style={{ mixBlendMode: "screen" }}
            opacity="0.55"
          />

          {/* 4. Diagonal Glass Horizon Reflection Light Line */}
          <line
            x1="0"
            y1={vbHeight * 0.32}
            x2={vbWidth}
            y2={vbHeight * 0.42}
            stroke="#FFFFFF"
            strokeWidth="3.5"
            opacity="0.35"
            filter="blur(1.5px)"
          />
        </g>

        {/* ======================================================== */}
        {/* OUTER BOUNDARY: SHINY METALLIC STERLING SILVER CHROME RIM */}
        {/* ======================================================== */}
        <text
          x="50%"
          y="56%"
          textAnchor="middle"
          dominantBaseline="central"
          fill="none"
          stroke={`url(#${id}-silver-chrome)`}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="font-black"
          style={{
            fontFamily: "var(--font-display), 'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: `${fontSize}px`,
            letterSpacing: isCenterpiece ? "-0.04em" : "-0.035em",
          }}
        >
          {word}
        </text>

        {/* Secondary fine inner specular hairline for genuine 3D beveled metallic silver sheen */}
        <text
          x="50%"
          y="56%"
          textAnchor="middle"
          dominantBaseline="central"
          fill="none"
          stroke={`url(#${id}-silver-specular)`}
          strokeWidth={strokeWidth * 0.45}
          strokeLinejoin="round"
          className="font-black opacity-90"
          style={{
            fontFamily: "var(--font-display), 'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: `${fontSize}px`,
            letterSpacing: isCenterpiece ? "-0.04em" : "-0.035em",
          }}
          aria-hidden="true"
        >
          {word}
        </text>

        {/* ======================================================== */}
        {/* LITTLE METALLIC SHINY SILVER CORNERS WITH DIAMOND GLINT */}
        {/* ======================================================== */}
        {showCorners && (
          <g className="little-silver-corners" aria-hidden="true">
            {corners.map((c, i) => (
              <g key={i}>
                {/* Corner Soft Drop Shadow */}
                <path
                  d={c.path}
                  fill="none"
                  stroke="#011A13"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  opacity="0.5"
                  transform="translate(0, 1.6)"
                />
                {/* Chiseled Metallic Sterling Silver Corner Bracket */}
                <path
                  d={c.path}
                  fill="none"
                  stroke={`url(#${id}-silver-chrome)`}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Razor Specular Reflection Line */}
                <path
                  d={c.path}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                {/* Micro Diamond Sparkle Star at Apex */}
                <g transform={`translate(${c.starX}, ${c.starY})`}>
                  <circle cx="0" cy="0" r="4.5" fill={`url(#${id}-star-glint)`} />
                  {/* 4-point Diamond Star */}
                  <path
                    d="M 0 -4.5 Q 0 0 4.5 0 Q 0 0 0 4.5 Q 0 0 -4.5 0 Q 0 0 0 -4.5 Z"
                    fill="#FFFFFF"
                  />
                  <circle cx="0" cy="0" r="1.1" fill="#FFFFFF" />
                </g>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
