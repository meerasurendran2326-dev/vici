const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const input = 'public/images/liquid-silver-frame.png';
  const output = 'public/images/liquid-silver-corners-transparent.png';

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    // Perceptual brightness
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    
    // Smooth thresholding for pure dark removal
    let alpha = 0;
    if (brightness > 12) {
      alpha = Math.min(255, Math.round(((brightness - 12) / (255 - 12)) * 255 * 1.35));
    }

    out[idx] = r;
    out[idx + 1] = g;
    out[idx + 2] = b;
    out[idx + 3] = alpha;
  }

  await sharp(out, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile(output);

  console.log('Successfully generated transparent molten silver corners:', fs.statSync(output).size, 'bytes');
}

processImage().catch(console.error);
