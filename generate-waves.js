const fs = require('fs');
const path = require('path');

const width = 1440;
const height = 2600;

// Looking closely at the user's reference image:
// 1. It consists of alternating fluid bands of roughly equal width (~36px - 44px each).
// 2. The bands undulate vertically across the screen, bowing out towards the left in an organic curve.
// 3. For the light green design, the bands alternate between a soft pale mint/sage green (#D4EAE0 / #C2E4D2) and soft ivory/white (#F8F7F4).
// 4. Using filled strokes with stroke-width = 38-42 on a step of 76 creates the exact alternating ribbon effect from the image!

const bands = [];
const numBands = 44;

// Left-hand curved center
const focalX = -120;
const focalY = 1150;

for (let b = 1; b <= numBands; b++) {
  const baseDist = b * 46;
  const strokeWidth = 34 + Math.sin(b * 0.3) * 6;
  
  const points = [];
  const steps = 160;
  
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const y = -120 + t * (height + 240);
    const dy = (y - focalY) / 800;
    
    // Smooth belly curve to the left like in reference image
    const bend = Math.exp(-dy * dy * 0.75) * (baseDist * 0.48);
    
    // Multi-harmonic gentle liquid wave ripples
    const wave1 = Math.sin(t * Math.PI * 3.8 + b * 0.22) * 44;
    const wave2 = Math.cos(t * Math.PI * 1.9 - b * 0.14) * 32;
    const wave3 = Math.sin(t * Math.PI * 5.8) * 14;
    
    const x = focalX + baseDist + bend + wave1 + wave2 + wave3;
    points.push({ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
  }
  
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let p = 1; p < points.length - 2; p++) {
    const xc = Number(((points[p].x + points[p + 1].x) / 2).toFixed(1));
    const yc = Number(((points[p].y + points[p + 1].y) / 2).toFixed(1));
    d += ` Q ${points[p].x} ${points[p].y} ${xc} ${yc}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  
  // Alternating dark green and light green gradient ribbons
  const isAlt = b % 2 === 0;
  const strokeColor = isAlt ? "url(#lightGreenLine)" : "url(#darkGreenLine)";
  const opacity = isAlt ? 0.32 : 0.24;
  
  bands.push(
    `<path d="${d}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}" />`
  );
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="mintCenter" cx="30%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#EAF5EF" stop-opacity="1" />
      <stop offset="60%" stop-color="#F2F8F5" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#F8F7F4" stop-opacity="0.8" />
    </radialGradient>
    <linearGradient id="softEmeraldFade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2F2E8" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#F8F7F4" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#DBEFE3" stop-opacity="0.6" />
    </linearGradient>
    <linearGradient id="darkGreenLine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#042F24" />
      <stop offset="40%" stop-color="#0B4A3B" />
      <stop offset="70%" stop-color="#0E5E4A" />
      <stop offset="100%" stop-color="#021A12" />
    </linearGradient>
    <linearGradient id="lightGreenLine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1F7A5C" />
      <stop offset="35%" stop-color="#34D399" />
      <stop offset="65%" stop-color="#2FE4B6" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#mintCenter)" />
  <rect width="100%" height="100%" fill="url(#softEmeraldFade)" />
  <g>
    ${bands.join('\n    ')}
  </g>
</svg>`;

const outPath = path.resolve(__dirname, 'public/images/green-fluid-waves.svg');
fs.writeFileSync(outPath, svg, 'utf8');
console.log('Regenerated SVG at', outPath, 'Bytes:', svg.length);
