"use client";

import React from "react";

interface LetterSilverCornerProps {
  position: "tl" | "tr" | "bl" | "br" | "v-bottom";
  className?: string;
  isCenterpiece?: boolean; // For larger VICI letters
}

export function LetterSilverCorner({
  position,
  className = "",
  isCenterpiece = false,
}: LetterSilverCornerProps) {
  // Size classes: compact and hugging letter corners, avoiding any background clutter
  const sizeClasses = isCenterpiece
    ? position === "v-bottom"
      ? "w-[46%] max-w-[90px] h-[36%] max-h-[70px]"
      : "w-[36%] max-w-[70px] h-[36%] max-h-[70px]"
    : position === "v-bottom"
      ? "w-[44%] max-w-[50px] h-[34%] max-h-[40px]"
      : "w-[34%] max-w-[42px] h-[34%] max-h-[42px]";

  // Snug placement hugging the letter's bounding box
  const positionClasses = {
    tl: "-top-[5%] -left-[6%]",
    tr: "-top-[5%] -right-[6%]",
    bl: "-bottom-[5%] -left-[6%]",
    br: "-bottom-[5%] -right-[6%]",
    "v-bottom": "-bottom-[8%] left-1/2 -translate-x-1/2",
  }[position];

  // Flip transforms for standard corners
  const transformStyle = {
    tl: "",
    tr: "scaleX(-1)",
    bl: "scaleY(-1)",
    br: "scale(-1, -1)",
    "v-bottom": "",
  }[position];

  const uniqueId = `letter-silver-${position}-${isCenterpiece ? "center" : "norm"}`;

  if (position === "v-bottom") {
    return (
      <div
        className={`absolute ${positionClasses} ${sizeClasses} pointer-events-none select-none z-15 ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 60 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
        >
          <defs>
            <linearGradient id={`${uniqueId}-vGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="20%" stopColor="#E2E8F0" />
              <stop offset="45%" stopColor="#64748B" />
              <stop offset="55%" stopColor="#FFFFFF" />
              <stop offset="80%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <radialGradient id={`${uniqueId}-vGlow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="30%" stopColor="#E0F2FE" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* V-Chevron Sheath */}
          <path
            d="M 6 6 L 30 42 L 54 6"
            stroke={`url(#${uniqueId}-vGrad)`}
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner Specular Highlight Line */}
          <path
            d="M 12 12 L 30 36 L 48 12"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />

          {/* Terminal Beads */}
          <circle cx="6" cy="6" r="3.5" fill={`url(#${uniqueId}-vGrad)`} stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="5" cy="5" r="1.2" fill="#FFFFFF" />
          <circle cx="54" cy="6" r="3.5" fill={`url(#${uniqueId}-vGrad)`} stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="53" cy="5" r="1.2" fill="#FFFFFF" />

          {/* Apex Faceted Diamond Star */}
          <g transform="translate(30, 42)">
            <circle cx="0" cy="0" r="9" fill={`url(#${uniqueId}-vGlow)`} />
            <path
              d="M 0 -8 Q 0 0 8 0 Q 0 0 0 8 Q 0 0 -8 0 Q 0 0 0 -8 Z"
              fill={`url(#${uniqueId}-vGrad)`}
              stroke="#FFFFFF"
              strokeWidth="0.6"
            />
            <path
              d="M 0 -4 Q 0 0 4 0 Q 0 0 0 4 Q 0 0 -4 0 Q 0 0 0 -4 Z"
              fill="#FFFFFF"
              transform="rotate(45)"
            />
            <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`absolute ${positionClasses} ${sizeClasses} pointer-events-none select-none z-15 ${className}`}
      style={{ transform: transformStyle }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
      >
        <defs>
          <linearGradient id={`${uniqueId}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="18%" stopColor="#F8FAFC" />
            <stop offset="35%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#64748B" />
            <stop offset="55%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#94A3B8" />
            <stop offset="90%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <radialGradient id={`${uniqueId}-glint`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="35%" stopColor="#E0F2FE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Main Beveled Solid Sterling Silver L-Bracket */}
        <path
          d="M 5 44 L 5 15 C 5 9.48 9.48 5 15 5 L 44 5"
          stroke={`url(#${uniqueId}-grad)`}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 2. Inner Razor-Sharp Chrome Specular Line */}
        <path
          d="M 11 38 L 11 17 C 11 13.68 13.68 11 17 11 L 38 11"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* 3. Outer Hairline Accent */}
        <path
          d="M 2 28 L 2 13 C 2 6.92 6.92 2 13 2 L 28 2"
          stroke={`url(#${uniqueId}-grad)`}
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* 4. Terminal Spherical Chrome Beads */}
        <circle cx="44" cy="5" r="3.2" fill={`url(#${uniqueId}-grad)`} stroke="#FFFFFF" strokeWidth="0.6" />
        <circle cx="43.2" cy="4.2" r="1.2" fill="#FFFFFF" />

        <circle cx="5" cy="44" r="3.2" fill={`url(#${uniqueId}-grad)`} stroke="#FFFFFF" strokeWidth="0.6" />
        <circle cx="4.2" cy="43.2" r="1.2" fill="#FFFFFF" />

        {/* 5. Centerpiece 4-Point Faceted Diamond Star Hallmark at Apex */}
        <g transform="translate(13, 13)">
          <circle cx="0" cy="0" r="7.5" fill={`url(#${uniqueId}-glint)`} />
          <path
            d="M 0 -7 Q 0 0 7 0 Q 0 0 0 7 Q 0 0 -7 0 Q 0 0 0 -7 Z"
            fill={`url(#${uniqueId}-grad)`}
            stroke="#FFFFFF"
            strokeWidth="0.5"
          />
          <path
            d="M 0 -3.5 Q 0 0 3.5 0 Q 0 0 0 3.5 Q 0 0 -3.5 0 Q 0 0 0 -3.5 Z"
            fill="#FFFFFF"
            transform="rotate(45)"
          />
          <circle cx="0" cy="0" r="1.2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
