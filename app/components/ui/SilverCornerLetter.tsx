"use client";

import React from "react";

interface SilverCornerLetterProps {
  char: "V" | "I" | "N" | "C" | "D" | string;
  className?: string;
  isCenterpiece?: boolean;
}

export function SilverCornerLetter({
  char,
  className = "",
  isCenterpiece = false,
}: SilverCornerLetterProps) {
  // High-precision metallic silver corner gradients tailored to each letter glyph
  // Applied strictly TO THE LETTER via background-clip: text (zero background spill)
  const getLetterStyle = (c: string): React.CSSProperties => {
    // Liquid chrome & 925 sterling silver corner gradient formula:
    // Specular White (#FFFFFF) -> Platinum (#F1F5F9) -> Silver (#CBD5E1) -> Titanium Chrome (#475569) -> Bevel Reflection (#FFFFFF) -> Cutoff
    const silverCorner = (x: string, y: string, size: string = "26%") =>
      `radial-gradient(circle at ${x} ${y}, #FFFFFF 0%, #FFFFFF 6%, #F1F5F9 12%, #CBD5E1 20%, #475569 27%, #94A3B8 31%, #FFFFFF 33%, transparent ${size})`;

    const emeraldBase = `linear-gradient(175deg, #0F5E4B 0%, #0B4A3B 45%, #063327 100%)`;

    let gradients: string[] = [];

    switch (c.toUpperCase()) {
      case "V":
        gradients = [
          silverCorner("6%", "4%", isCenterpiece ? "28%" : "25%"), // Top-Left tip
          silverCorner("94%", "4%", isCenterpiece ? "28%" : "25%"), // Top-Right tip
          silverCorner("50%", "97%", isCenterpiece ? "30%" : "27%"), // Bottom V-vertex
        ];
        break;

      case "I":
        gradients = [
          silverCorner("10%", "5%", isCenterpiece ? "26%" : "24%"), // Top-Left
          silverCorner("90%", "5%", isCenterpiece ? "26%" : "24%"), // Top-Right
          silverCorner("10%", "95%", isCenterpiece ? "26%" : "24%"), // Bottom-Left
          silverCorner("90%", "95%", isCenterpiece ? "26%" : "24%"), // Bottom-Right
        ];
        break;

      case "N":
        gradients = [
          silverCorner("6%", "4%", isCenterpiece ? "26%" : "24%"), // Top-Left
          silverCorner("6%", "96%", isCenterpiece ? "26%" : "24%"), // Bottom-Left
          silverCorner("94%", "4%", isCenterpiece ? "26%" : "24%"), // Top-Right
          silverCorner("94%", "96%", isCenterpiece ? "26%" : "24%"), // Bottom-Right
        ];
        break;

      case "C":
        gradients = [
          silverCorner("88%", "10%", isCenterpiece ? "28%" : "25%"), // Top-Right open terminal
          silverCorner("88%", "90%", isCenterpiece ? "28%" : "25%"), // Bottom-Right open terminal
          silverCorner("12%", "16%", isCenterpiece ? "24%" : "22%"), // Top-Left outer shoulder
          silverCorner("12%", "84%", isCenterpiece ? "24%" : "22%"), // Bottom-Left outer shoulder
        ];
        break;

      case "D":
        gradients = [
          silverCorner("6%", "4%", isCenterpiece ? "26%" : "24%"), // Top-Left
          silverCorner("6%", "96%", isCenterpiece ? "26%" : "24%"), // Bottom-Left
          silverCorner("88%", "25%", isCenterpiece ? "28%" : "25%"), // Top-Right curve corner
          silverCorner("88%", "75%", isCenterpiece ? "28%" : "25%"), // Bottom-Right curve corner
        ];
        break;

      default:
        gradients = [
          silverCorner("8%", "6%"),
          silverCorner("92%", "6%"),
          silverCorner("8%", "94%"),
          silverCorner("92%", "94%"),
        ];
        break;
    }

    return {
      backgroundImage: [...gradients, emeraldBase].join(", "),
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
      display: "inline-block",
      filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.45)) drop-shadow(0 0 1px rgba(255,255,255,0.3))",
    };
  };

  return (
    <span
      className={`relative inline-block font-black select-none ${className}`}
      style={getLetterStyle(char)}
      aria-label={char}
    >
      {char}
    </span>
  );
}
