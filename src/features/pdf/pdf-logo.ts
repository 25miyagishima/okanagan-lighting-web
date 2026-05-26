import { PDFPage } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function drawPdfLogo(page: PDFPage) {
  const logoPath = path.resolve("./public/brand/okanagan-lighting-logo.png");
  const logoBytes = fs.readFileSync(logoPath);

  const pngImage = await page.doc.embedPng(logoBytes);
  const { width, height } = page.getSize();

  const logoWidth = 120;
  const logoHeight = (pngImage.height / pngImage.width) * logoWidth;

  page.drawImage(pngImage, {
    x: 48,
    y: height - logoHeight - 24,
    width: logoWidth,
    height: logoHeight,
  });
}