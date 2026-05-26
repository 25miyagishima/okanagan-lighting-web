import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

export async function createPdfDocument() {
  const pdf = await PDFDocument.create();

  const page = pdf.addPage([792, 612]);

  const width = page.getWidth();
  const height = page.getHeight();

  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.05, 0.055, 0.065),
  });

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(
    StandardFonts.HelveticaBold,
  );

  page.drawText("Okanagan Lighting", {
    x: 48,
    y: height - 60,
    size: 28,
    font: boldFont,
    color: rgb(0.95, 0.95, 0.94),
  });

  page.drawText("Premium Landscape & Architectural Lighting", {
    x: 48,
    y: height - 88,
    size: 12,
    font,
    color: rgb(0.62, 0.64, 0.67),
  });

  return {
    pdf,
    page,
    font,
    boldFont,
    width,
    height,
  };
}