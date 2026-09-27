const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../pdt');
const dstDir = path.resolve(__dirname, './public/images/custom');

if (!fs.existsSync(dstDir)) {
  fs.mkdirSync(dstDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));

files.forEach((file, index) => {
  const num = index + 1;
  const srcPath = path.join(srcDir, file);
  
  // Copy original
  fs.copyFileSync(srcPath, path.join(dstDir, file));
  
  // Copy sequential variants
  ['.jpeg', '.jpg', '.png'].forEach(ext => {
    fs.copyFileSync(srcPath, path.join(dstDir, `img${num}${ext}`));
    fs.copyFileSync(srcPath, path.join(dstDir, `${num}${ext}`));
  });
});

console.log(`Successfully copied ${files.length} images into ${dstDir}`);
