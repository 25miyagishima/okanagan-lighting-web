import { PDFPage, rgb, type Color } from "pdf-lib";
import { pdfTheme } from "./pdf-theme";

// Draw a section header
export function drawSectionHeader(
  page: PDFPage,
  x: number,
  y: number,
  title: string,
) {
  page.drawText(title, {
    x,
    y,
    size: pdfTheme.typography.sectionTitle,
    color: rgb(0.85, 0.60, 0.09),
  });
}

// Draw a divider line
export function drawDivider(
  page: PDFPage,
  x: number,
  y: number,
  width: number,
) {
  page.drawLine({
    start: { x, y },
    end: { x: x + width, y },
    thickness: 1,
    color: rgb(0.86, 0.86, 0.86),
  });
}

// Draw a card background
export function drawCardBackground(
  page: PDFPage,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  page.drawRectangle({
    x,
    y: y - height,
    width,
    height,
    color: rgb(0.96, 0.94, 0.91),
    borderColor: rgb(0.86, 0.86, 0.86),
    borderWidth: 1,
  });
}

// Draw body text
export function drawBodyText(
  page: PDFPage,
  x: number,
  y: number,
  text: string,
  fontSize: number = pdfTheme.typography.body,
  color: Color = rgb(0.09, 0.09, 0.09),
) {
  page.drawText(text, {
    x,
    y,
    size: fontSize,
    color,
  });
}

// Draw status pill
export function drawStatusPill(
  page: PDFPage,
  x: number,
  y: number,
  text: string,
  type: "success" | "warning" | "danger",
) {
  const padding = 4;
  const width = 6 * text.length + padding * 2;
  const height = 12;

  const statusColor =
    type === "success"
      ? rgb(0.13, 0.55, 0.28)
      : type === "warning"
        ? rgb(0.85, 0.60, 0.09)
        : rgb(0.77, 0.19, 0.19);

  page.drawRectangle({
    x,
    y: y - height,
    width,
    height,
    color: statusColor,
  });

  page.drawText(text, {
    x: x + padding,
    y: y - height + 2,
    size: 10,
    color: rgb(1, 1, 1),
  });
}