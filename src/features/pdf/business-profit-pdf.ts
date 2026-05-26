import {
  rgb,
  type PDFDocument,
  type PDFImage,
  type PDFPage,
  type PDFFont,
} from "pdf-lib";
import fs from "fs";
import path from "path";
import { createPdfDocument } from "./pdf-builder";
import { drawCardBackground } from "./pdf-components";
import { drawPdfBrandHeader, drawPdfFooter } from "./pdf-branding";
import { pdfTheme } from "./pdf-theme";
import type { QuoteWithClient } from "@/features/quotes/quote-actions";
import type { QuoteTotals } from "@/features/quotes/quote-totals";
import { formatCurrency } from "@/lib/utils";

export type BusinessProfitPdfInput = {
  quote: QuoteWithClient;
  totals: QuoteTotals;
};

const PDF_COLORS = {
  background: rgb(0.969, 0.953, 0.929), // #F7F3ED
  primaryText: rgb(0.09, 0.09, 0.09), // #171717
  mutedText: rgb(0.373, 0.388, 0.408), // #5F6368
  gold: rgb(0.886, 0.694, 0.353), // #E2B15A
};

function drawPageBackground(page: PDFPage) {
  page.drawRectangle({
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
    color: PDF_COLORS.background,
  });
}

async function getPdfLogo(pdf: PDFDocument): Promise<PDFImage | null> {
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

  return pdf.embedPng(logoBytes);
}

function drawPdfLogo({
  page,
  logo,
}: {
  page: PDFPage;
  logo: PDFImage | null;
}) {
  if (!logo) {
    return;
  }

  const logoWidth = 120;
  const logoHeight = (logo.height / logo.width) * logoWidth;
  const height = page.getHeight();

  page.drawImage(logo, {
    x: page.getWidth() - logoWidth - 48,
    y: height - logoHeight - 34,
    width: logoWidth,
    height: logoHeight,
  });
}

function drawCard({
  page,
  x,
  y,
  width,
  height,
}: {
  page: PDFPage;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  drawCardBackground(page, x, y + height, width, height);
}

function drawMetric({
  page,
  label,
  value,
  x,
  y,
  font,
  boldFont,
  highlight = false,
}: {
  page: PDFPage;
  label: string;
  value: string;
  x: number;
  y: number;
  font: PDFFont;
  boldFont: PDFFont;
  highlight?: boolean;
}) {
  page.drawText(label, {
    x,
    y,
    size: pdfTheme.typography.body,
    font,
    color: PDF_COLORS.mutedText,
  });

  page.drawText(value, {
    x,
    y: y - 18,
    size: highlight ? 18 : 14,
    font: boldFont,
    color: highlight ? PDF_COLORS.gold : PDF_COLORS.primaryText,
  });
}

export async function generateBusinessProfitPdf({
  quote,
  totals,
}: BusinessProfitPdfInput) {
  const { pdf, page, font, boldFont, width, height } =
    await createPdfDocument();

  drawPageBackground(page);

  const logo = await getPdfLogo(pdf);

  drawPdfBrandHeader({
    page,
    title: "Business Profit Report",
    subtitle: `${quote.quoteNumber} Rev ${quote.revisionNumber} · ${quote.clientName}`,
    font,
    boldFont,
  });

  drawPdfLogo({
    page,
    logo,
  });

  drawPdfFooter({
    page,
    font,
    text: "Internal use only · Business analysis, margin review, and quote performance reporting.",
  });

  const labourTotal =
    totals.zoneLabourSubtotal + totals.quoteLevelLabourSubtotal;

  const revenue = totals.materialSubtotal + labourTotal;

  const estimatedProfit = totals.total - totals.materialSubtotal;

  const estimatedMargin =
    totals.total > 0 ? (estimatedProfit / totals.total) * 100 : 0;

  drawCard({
    page,
    x: 48,
    y: height - 300,
    width: width - 96,
    height: 210,
  });

  drawMetric({
    page,
    label: "Material Revenue",
    value: formatCurrency(totals.materialSubtotal),
    x: 72,
    y: height - 132,
    font,
    boldFont,
  });

  drawMetric({
    page,
    label: "Labour Revenue",
    value: formatCurrency(labourTotal),
    x: 320,
    y: height - 132,
    font,
    boldFont,
  });

  drawMetric({
    page,
    label: "Subtotal Revenue",
    value: formatCurrency(revenue),
    x: 568,
    y: height - 132,
    font,
    boldFont,
  });

  drawMetric({
    page,
    label: "Tax",
    value: formatCurrency(totals.taxAmount),
    x: 72,
    y: height - 220,
    font,
    boldFont,
  });

  drawMetric({
    page,
    label: "Discount",
    value: formatCurrency(totals.discountAmount),
    x: 320,
    y: height - 220,
    font,
    boldFont,
  });

  drawMetric({
    page,
    label: "Deposit",
    value: formatCurrency(totals.depositAmount),
    x: 568,
    y: height - 220,
    font,
    boldFont,
  });

  drawCard({
    page,
    x: 48,
    y: 120,
    width: width - 96,
    height: 120,
  });

  drawMetric({
    page,
    label: "Estimated Gross Profit",
    value: formatCurrency(estimatedProfit),
    x: 72,
    y: 208,
    font,
    boldFont,
    highlight: true,
  });

  drawMetric({
    page,
    label: "Estimated Margin",
    value: `${estimatedMargin.toFixed(1)}%`,
    x: 420,
    y: 208,
    font,
    boldFont,
    highlight: true,
  });

  const pdfBytes = await pdf.save();

  return pdfBytes;
}