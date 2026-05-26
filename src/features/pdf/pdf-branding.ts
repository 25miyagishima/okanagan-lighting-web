import { rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { pdfTheme } from "./pdf-theme";
import { drawDivider } from "./pdf-components";

type PdfBrandHeaderProps = {
  page: PDFPage;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  font: PDFFont;
  boldFont: PDFFont;
};

export function drawPdfBrandHeader({
  page,
  title,
  subtitle,
  eyebrow = "Okanagan Lighting",
  font,
  boldFont,
}: PdfBrandHeaderProps) {
  const height = page.getHeight();

  page.drawText(eyebrow, {
    x: 48,
    y: height - 42,
    size: 10,
    font: boldFont,
    color: rgb(0.85, 0.60, 0.09),
  });

  page.drawText(title, {
    x: 48,
    y: height - 70,
    size: 26,
    font: boldFont,
    color: rgb(0.09, 0.09, 0.09),
  });

  if (subtitle) {
    page.drawText(subtitle, {
      x: 48,
      y: height - 94,
      size: 10,
      font,
      color: rgb(0.54, 0.56, 0.60),
      maxWidth: page.getWidth() - 96,
    });
  }

  drawDivider(page, 48, height - 110, 180);
}

export function drawPdfFooter({
  page,
  font,
  text = "Okanagan Lighting · Premium lighting design, installation, and project delivery.",
}: {
  page: PDFPage;
  font: PDFFont;
  text?: string;
}) {
  page.drawText(text, {
    x: 48,
    y: 34,
    size: 8,
    font,
    color: rgb(0.54, 0.56, 0.60),
    maxWidth: page.getWidth() - 96,
  });
}