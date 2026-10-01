"use client";

import React from "react";

interface MetallicSilverCornerProps {
  position: "tl" | "tr" | "bl" | "br";
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "chiseled" | "molten";
}

export function MetallicSilverCorner({
  position,
  size = "md",
  className = "",
  variant = "chiseled",
}: MetallicSilverCornerProps) {
  // Dimensions based on size prop
  const sizeClasses = {
    sm: "w-10 h-10 md:w-14 md:h-14",
    md: "w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24",
    lg: "w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36",
  }[size];

  // Precise corner placement
  const positionClasses = {
    tl: "top-0 left-0 -translate-x-3 -translate-y-3 md:-translate-x-5 md:-translate-y-5",
    tr: "top-0 right-0 translate-x-3 -translate-y-3 md:translate-x-5 md:-translate-y-5",
    bl: "bottom-0 left-0 -translate-x-3 translate-y-3 md:-translate-x-5 md:translate-y-5",
    br: "bottom-0 right-0 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5",
  }[position];

  // Rotations / Flips
  const transformStyle = {
    tl: "",
    tr: "scaleX(-1)",
    bl: "scaleY(-1)",
    br: "scale(-1, -1)",
  }[position];

  const uniqueId = `silver-corner-${position}-${size}`;

  return (
    <div
      className={`absolute ${positionClasses} ${sizeClasses} pointer-events-none select-none z-15 ${className}`}
      style={{ transform: transformStyle }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)] drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] transition-all duration-300 hover:scale-105"
      >
        <defs>
          {/* High-Gloss Liquid Chrome & 925 Sterling Silver Gradient */}
          <linearGradient
            id={`${uniqueId}-chrome`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="15%" stopColor="#F8FAFC" stopOpacity="1" />
            <stop offset="30%" stopColor="#CBD5E1" stopOpacity="1" />
            <stop offset="48%" stopColor="#64748B" stopOpacity="1" />
            <stop offset="52%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="70%" stopColor="#94A3B8" stopOpacity="1" />
            <stop offset="85%" stopColor="#E2E8F0" stopOpacity="1" />
            <stop offset="100%" stopColor="#475569" stopOpacity="1" />
          </linearGradient>

          {/* Pure Specular Rim Lighting Gradient */}
          <linearGradient
            id={`${uniqueId}-specular`}
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.3" />
          </linearGradient>

          {/* Diamond Flare Radial Glint */}
          <radialGradient
            id={`${uniqueId}-diamondGlint`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#E2E8F0" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#94A3B8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>

          {/* Subtle Outer Glow Filter */}
          <filter id={`${uniqueId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Main Beveled Sterling Silver Bracket Arm */}
        <path
          d="M 6 88 L 6 28 C 6 15.85 15.85 6 28 6 L 88 6"
          stroke={`url(#${uniqueId}-chrome)`}
          strokeWidth="4.5"
          strokeLinecap="round"
          filter={`url(#${uniqueId}-glow)`}
        />

        {/* 2. Razor-Thin Mirror Chrome Specular Accent Line (Inner Hairline) */}
        <path
          d="M 14 80 L 14 32 C 14 22.06 22.06 14 32 14 L 80 14"
          stroke={`url(#${uniqueId}-specular)`}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="40 4 10 4"
          opacity="0.9"
        />

        {/* 3. Outer Fine Atelier Filigree Border */}
        <path
          d="M 2 55 L 2 24 C 2 11.85 11.85 2 24 2 L 55 2"
          stroke={`url(#${uniqueId}-chrome)`}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* 4. Terminal Polished Silver Spherical Rivets / Beads */}
        {/* Horizontal Terminal Bead */}
        <circle
          cx="88"
          cy="6"
          r="4.5"
          fill={`url(#${uniqueId}-chrome)`}
          stroke="#FFFFFF"
          strokeWidth="1"
        />
        <circle cx="86.8" cy="4.8" r="1.5" fill="#FFFFFF" opacity="0.95" />

        {/* Vertical Terminal Bead */}
        <circle
          cx="6"
          cy="88"
          r="4.5"
          fill={`url(#${uniqueId}-chrome)`}
          stroke="#FFFFFF"
          strokeWidth="1"
        />
        <circle cx="4.8" cy="86.8" r="1.5" fill="#FFFFFF" opacity="0.95" />

        {/* 5. Central Faceted 925 Hallmark Diamond Star at the Apex (Vertex) */}
        <g transform="translate(18, 18)">
          {/* Soft Diamond Star Flare Glow */}
          <circle cx="0" cy="0" r="12" fill={`url(#${uniqueId}-diamondGlint)`} />

          {/* 4-Point Faceted Diamond Star in Solid Silver */}
          <path
            d="M 0 -11 Q 0 0 11 0 Q 0 0 0 11 Q 0 0 -11 0 Q 0 0 0 -11 Z"
            fill={`url(#${uniqueId}-chrome)`}
            stroke="#FFFFFF"
            strokeWidth="0.8"
          />

          {/* Secondary Diagonal Micro Flare */}
          <path
            d="M 0 -6 Q 0 0 6 0 Q 0 0 0 6 Q 0 0 -6 0 Q 0 0 0 -6 Z"
            fill="#FFFFFF"
            transform="rotate(45)"
            opacity="0.85"
          />

          {/* Core Brilliant Specular Center Sparkle */}
          <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
        </g>

        {/* 6. Engraved Atelier Notches */}
        <line x1="42" y1="3" x2="42" y2="9" stroke="#CBD5E1" strokeWidth="1.2" opacity="0.8" />
        <line x1="62" y1="3" x2="62" y2="9" stroke="#CBD5E1" strokeWidth="1.2" opacity="0.8" />
        <line x1="3" y1="42" x2="9" y2="42" stroke="#CBD5E1" strokeWidth="1.2" opacity="0.8" />
        <line x1="3" y1="62" x2="9" y2="62" stroke="#CBD5E1" strokeWidth="1.2" opacity="0.8" />
      </svg>
    </div>
  );
}
