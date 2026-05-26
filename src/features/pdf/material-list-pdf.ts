import {
  type PDFDocument,
  type PDFPage,
  type PDFFont,
  type PDFImage,
  rgb,
} from "pdf-lib";
import fs from "node:fs";
import path from "node:path";
import { createPdfDocument } from "./pdf-builder";
import {
  drawBodyText,
  drawCardBackground,
  drawSectionHeader,
} from "./pdf-components";
import { drawPdfBrandHeader, drawPdfFooter } from "./pdf-branding";
import { pdfTheme } from "./pdf-theme";
import type { QuoteWithClient } from "@/features/quotes/quote-actions";
import type { QuoteItem } from "@/types/database";
import { formatCurrency } from "@/lib/utils";

export type MaterialListPdfInput = {
  quote: QuoteWithClient;
  quoteItems: QuoteItem[];
};

function drawPageBackground(page: PDFPage) {
  page.drawRectangle({
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
    color: rgb(1, 1, 1),
  });
}

function addPage(pdf: PDFDocument) {
  const page = pdf.addPage([792, 612]);
  drawPageBackground(page);
  return page;
}

async function embedPdfLogo(pdf: PDFDocument) {
  try {
    const logoPath = path.join(
      process.cwd(),
      "public",
      "brand",
      "okanagan-lighting-logo.png",
    );

    if (!fs.existsSync(logoPath)) {
      return null;
    }

    const logoBytes = fs.readFileSync(logoPath);

    return await pdf.embedPng(logoBytes);
  } catch {
    return null;
  }
}

function drawPdfLogo({
  page,
  logoImage,
  width = 138,
}: {
  page: PDFPage;
  logoImage: PDFImage | null;
  width?: number;
}) {
  if (!logoImage) {
    return;
  }

  const height = (logoImage.height / logoImage.width) * width;

  page.drawImage(logoImage, {
    x: page.getWidth() - pdfTheme.spacing.pageX - width,
    y: page.getHeight() - 44 - height,
    width,
    height,
  });
}

function drawHeader({
  page,
  quote,
  font,
  boldFont,
  logoImage,
}: {
  page: PDFPage;
  quote: QuoteWithClient;
  font: PDFFont;
  boldFont: PDFFont;
  logoImage: PDFImage | null;
}) {
  drawPdfBrandHeader({
    page,
    title: "Internal Material List",
    subtitle: `${quote.quoteNumber} Rev ${quote.revisionNumber} · ${quote.clientName}`,
    font,
    boldFont,
  });

  drawPdfLogo({
    page,
    logoImage,
  });

  drawPdfFooter({
    page,
    font,
    text: "Internal use only · Material planning, ordering, and install preparation.",
  });
}

function ensureSpace({
  pdf,
  page,
  cursorY,
  needed,
  quote,
  font,
  boldFont,
  logoImage,
}: {
  pdf: PDFDocument;
  page: PDFPage;
  cursorY: number;
  needed: number;
  quote: QuoteWithClient;
  font: PDFFont;
  boldFont: PDFFont;
  logoImage: PDFImage | null;
}) {
  if (cursorY - needed > 60) {
    return { page, cursorY };
  }

  const nextPage = addPage(pdf);

  drawHeader({
    page: nextPage,
    quote,
    font,
    boldFont,
    logoImage,
  });

  return {
    page: nextPage,
    cursorY: nextPage.getHeight() - 140,
  };
}

export async function generateMaterialListPdf({
  quote,
  quoteItems,
}: MaterialListPdfInput) {
  const { pdf, page: firstPage, font, boldFont } = await createPdfDocument();

  const logoImage = await embedPdfLogo(pdf);

  drawPageBackground(firstPage);

  drawHeader({
    page: firstPage,
    quote,
    font,
    boldFont,
    logoImage,
  });

  let page = firstPage;
  let cursorY = page.getHeight() - 140;

  const groupedItems = Object.entries(
    quoteItems.reduce<Record<string, QuoteItem[]>>((acc, item) => {
      const key = item.quoteGroupSnapshot || "other";

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);

      return acc;
    }, {}),
  );

  groupedItems.forEach(([groupName, items]) => {
    const sectionHeight = 44 + items.length * 30;

    const next = ensureSpace({
      pdf,
      page,
      cursorY,
      needed: sectionHeight,
      quote,
      font,
      boldFont,
      logoImage,
    });

    page = next.page;
    cursorY = next.cursorY;

    drawCardBackground(page, 42, cursorY, page.getWidth() - 84, sectionHeight);

    drawSectionHeader(page, 58, cursorY - 26, groupName.toUpperCase());

    let itemY = cursorY - 56;

    items.forEach((item) => {
      const lineTotal = item.quantity * item.sellPriceSnapshot;

      page.drawText(`${item.quantity} × ${item.nameSnapshot}`, {
        x: 68,
        y: itemY,
        size: pdfTheme.typography.body,
        font: boldFont,
        color: rgb(0.09, 0.09, 0.09),
        maxWidth: 420,
      });

      page.drawText(formatCurrency(lineTotal), {
        x: page.getWidth() - 150,
        y: itemY,
        size: pdfTheme.typography.body,
        font,
        color: rgb(0.37, 0.39, 0.41),
      });

      drawBodyText(
        page,
        68,
        itemY - 13,
        item.unitTypeSnapshot || "unit",
        8,
        rgb(0.54, 0.56, 0.60),
      );

      itemY -= 30;
    });

    cursorY -= sectionHeight + 18;
  });

  const pdfBytes = await pdf.save();

  return pdfBytes;
}