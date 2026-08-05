const sharp = require('sharp');
const fs = require('fs');

const svgBuffer = Buffer.from(`
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(64, 128) scale(4.36)">
    <!-- 88 * 4.36 = 383, 512-383 = 128 / 2 = 64 (X padding) -->
    <!-- 66 * 4.36 = 287, 512-287 = 225 / 2 = 112 (Y padding) -->
    <g transform="translate(-52, -42)">
        <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/>
        <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/>
        <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/>
        <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/>
        <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/>
    </g>
  </g>
</svg>
`);

async function generate() {
    await sharp(svgBuffer)
        .resize(512, 512)
        .png()
        .toFile('icon-512.png');
    
    await sharp(svgBuffer)
        .resize(512, 512)
        .png()
        .toFile('icon-512-maskable.png');
        
    await sharp(svgBuffer)
        .resize(192, 192)
        .png()
        .toFile('icon-192.png');
        
    console.log("Images generated!");
}

generate().catch(console.error);
