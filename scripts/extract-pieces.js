const sharp = require('sharp');

async function extractPieces() {
  const input = 'public/images/liquid-silver-corners-transparent.png';

  // 1. Top-Left Loop: x:0, y:0, w:280, h:240
  await sharp(input)
    .extract({ left: 0, top: 0, width: 280, height: 240 })
    .png()
    .toFile('public/images/silver-corner-tl.png');

  // 2. Top-Right Drip: x:380, y:0, w:196, h:420
  await sharp(input)
    .extract({ left: 380, top: 0, width: 196, height: 420 })
    .png()
    .toFile('public/images/silver-corner-tr.png');

  // 3. Mid-Left Wave: x:0, y:380, w:190, h:300
  await sharp(input)
    .extract({ left: 0, top: 380, width: 190, height: 300 })
    .png()
    .toFile('public/images/silver-corner-ml.png');

  // 4. Bottom-Left Drop: x:0, y:640, w:260, h:384
  await sharp(input)
    .extract({ left: 0, top: 640, width: 260, height: 384 })
    .png()
    .toFile('public/images/silver-corner-bl.png');

  // 5. Bottom-Right Swirl: x:420, y:760, w:156, h:264
  await sharp(input)
    .extract({ left: 420, top: 760, width: 156, height: 264 })
    .png()
    .toFile('public/images/silver-corner-br.png');

  console.log('Successfully extracted individual liquid silver corner pieces!');
}

extractPieces().catch(console.error);
