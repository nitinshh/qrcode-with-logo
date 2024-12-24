const QRCode = require('qrcode');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas'); // For custom text

async function generateStyledQRCode(qrText, logoPath, outputPath) {
  try {
    // Generate QR code with a high error correction level
    const qrBuffer = await QRCode.toBuffer(qrText, {
      errorCorrectionLevel: 'H',
      width: 500,
      margin: 1,
      color: {
        dark: '#ffffff', // White QR code elements
        light: '#00FF00', // Bright green background
      },
    });

    // Create a canvas to customize the QR code
    const qrImage = await loadImage(qrBuffer);
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    // Draw the QR code on the canvas
    ctx.drawImage(qrImage, 0, 0);

    // Load the logo
    const logoWidth = 220; // Wider logo
    const logoHeight = 80; // Shorter height for logo
    const logo = await loadImage(logoPath);

    // Center the logo on the QR code
    const logoX = (canvas.width - logoWidth) / 2;
    const logoY = (canvas.height - logoHeight) / 2;
    ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);

    // Save the final QR code
    const finalBuffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, finalBuffer);

    console.log(`Styled QR code generated at: ${outputPath}`);
  } catch (err) {
    console.error('Error generating styled QR code:', err);
  }
}

// Usage
const qrText = 'https://flow-app.com'; // Replace with your URL or text
const logoPath = 'Group 37053.png'; // Replace with the path to your logo file
const outputPath = './styled_qr_code1.png'; // Output file path

generateStyledQRCode(qrText, logoPath, outputPath);
