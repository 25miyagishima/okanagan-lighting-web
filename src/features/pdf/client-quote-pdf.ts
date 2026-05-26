import {
  rgb,
  type Color,
  type PDFFont,
  type PDFDocument,
  type PDFImage,
  type PDFPage,
} from "pdf-lib";
import fs from "node:fs";
import path from "node:path";
import { createPdfDocument } from "./pdf-builder";
import { pdfTheme } from "./pdf-theme";

import {
  generateExecutiveSummary,
  generateFixtureNarrative,
  generateLightingPhilosophy,
  generateProjectApproach,
} from "./proposal-intelligence";

import type { QuoteWithClient } from "@/features/quotes/quote-actions";
import type { QuoteTotals } from "@/features/quotes/quote-totals";

import type {
  PdfMediaItem,
  PdfMediaSection,
} from "@/features/media/pdf-media-types";

import type { ClientScopeSection } from "./build-client-scope";

import { formatCurrency } from "@/lib/utils";

type ClientQuotePdfInput = {
  quote: QuoteWithClient;
  totals: QuoteTotals;
  mediaSection?: PdfMediaSection;
  scopeSections?: ClientScopeSection[];
};

function hexToRgb(hex: string): Color {
  const cleanHex = hex.replace("#", "");
  const value = Number.parseInt(cleanHex, 16);

  return rgb(
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  );
}

const colors = {
  ink: hexToRgb(pdfTheme.colors.ink),
  mutedInk: hexToRgb(pdfTheme.colors.mutedInk),
  softInk: hexToRgb(pdfTheme.colors.softInk),
  paper: hexToRgb(pdfTheme.colors.paper),
  warmPaper: hexToRgb(pdfTheme.colors.warmPaper),
  panel: hexToRgb(pdfTheme.colors.panel),
  gold: hexToRgb(pdfTheme.colors.gold),
  softGold: hexToRgb(pdfTheme.colors.softGold),
  goldWash: hexToRgb(pdfTheme.colors.goldWash),
  border: hexToRgb(pdfTheme.colors.border),
  softBorder: hexToRgb(pdfTheme.colors.softBorder),
};

function drawPageBackground(page: PDFPage) {
  page.drawRectangle({
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
    color: colors.paper,
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
  width = 132,
}: {
  page: PDFPage;
  logoImage: PDFImage | null;
  width?: number;
}) {
  if (!logoImage) return;

  const height = (logoImage.height / logoImage.width) * width;

  page.drawImage(logoImage, {
    x: page.getWidth() - pdfTheme.spacing.pageX - width,
    y: page.getHeight() - 44 - height,
    width,
    height,
  });
}

function drawFooter({
  page,
  font,
}: {
  page: PDFPage;
  font: PDFFont;
}) {
  const y = 28;

  page.drawLine({
    start: { x: pdfTheme.spacing.pageX, y: y + 12 },
    end: {
      x: page.getWidth() - pdfTheme.spacing.pageX,
      y: y + 12,
    },
    thickness: pdfTheme.stroke.thin,
    color: colors.softBorder,
  });

  page.drawText(pdfTheme.footer.text, {
    x: pdfTheme.spacing.pageX,
    y,
    size: pdfTheme.typography.micro,
    font,
    color: colors.softInk,
  });
}

function drawHeader({
  page,
  font,
  boldFont,
  title,
  subtitle,
  logoImage,
}: {
  page: PDFPage;
  font: PDFFont;
  boldFont: PDFFont;
  title: string;
  subtitle: string;
  logoImage: PDFImage | null;
}) {
  const topY = page.getHeight() - 58;

  page.drawText(title, {
    x: pdfTheme.spacing.pageX,
    y: topY,
    size: pdfTheme.typography.pageTitle,
    font: boldFont,
    color: colors.ink,
  });

  page.drawText(subtitle, {
    x: pdfTheme.spacing.pageX,
    y: topY - 18,
    size: pdfTheme.typography.small,
    font,
    color: colors.mutedInk,
    maxWidth: 430,
  });

  page.drawRectangle({
    x: pdfTheme.spacing.pageX,
    y: topY - 32,
    width: 120,
    height: 1,
    color: colors.gold,
    opacity: 0.75,
  });

  drawPdfLogo({ page, logoImage });
}

function drawCard({
  page,
  x,
  y,
  width,
  height,
  fill = colors.warmPaper,
}: {
  page: PDFPage;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: Color;
}) {
  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: fill,
    borderColor: colors.softBorder,
    borderWidth: pdfTheme.stroke.thin,
  });
}

function drawSectionTitle({
  page,
  title,
  x,
  y,
  boldFont,
}: {
  page: PDFPage;
  title: string;
  x: number;
  y: number;
  boldFont: PDFFont;
}) {
  page.drawText(title, {
    x,
    y,
    size: pdfTheme.typography.sectionTitle,
    font: boldFont,
    color: colors.ink,
  });

  page.drawRectangle({
    x,
    y: y - 10,
    width: 84,
    height: 1,
    color: colors.gold,
    opacity: 0.7,
  });
}

function drawWrappedText({
  page,
  text,
  x,
  y,
  maxWidth,
  font,
  size,
  color,
  lineHeight = 14,
}: {
  page: PDFPage;
  text: string;
  x: number;
  y: number;
  maxWidth: number;
  font: PDFFont;
  size: number;
  color: Color;
  lineHeight?: number;
}) {
  page.drawText(text, {
    x,
    y,
    size,
    font,
    color,
    maxWidth,
    lineHeight,
  });
}

async function embedMediaImage(pdf: PDFDocument, item: PdfMediaItem) {
  if (!item.signedUrl) return null;

  try {
    const response = await fetch(item.signedUrl);
    if (!response.ok) return null;

    const imageBytes = await response.arrayBuffer();

    if (item.mimeType === "image/png") {
      return pdf.embedPng(imageBytes);
    }

    return pdf.embedJpg(imageBytes);
  } catch {
    return null;
  }
}

async function drawMediaImage({
  pdf,
  page,
  item,
  x,
  y,
  width,
  height,
}: {
  pdf: PDFDocument;
  page: PDFPage;
  item: PdfMediaItem;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const image = await embedMediaImage(pdf, item);

  drawCard({ page, x, y, width, height, fill: colors.panel });

  if (!image) return;

  const imageRatio = image.width / image.height;
  const boxRatio = width / height;

  let drawWidth = width;
  let drawHeight = height;

  if (imageRatio > boxRatio) {
    drawHeight = width / imageRatio;
  } else {
    drawWidth = height * imageRatio;
  }

  page.drawImage(image, {
    x: x + (width - drawWidth) / 2,
    y: y + (height - drawHeight) / 2,
    width: drawWidth,
    height: drawHeight,
  });
}

async function drawCoverImage({
  pdf,
  page,
  mediaSection,
  x,
  y,
  width,
  height,
}: {
  pdf: PDFDocument;
  page: PDFPage;
  mediaSection?: PdfMediaSection;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const coverImage = mediaSection?.coverImage;

  drawCard({ page, x, y, width, height, fill: colors.panel });

  if (!coverImage) return;

  await drawMediaImage({
    pdf,
    page,
    item: coverImage,
    x,
    y,
    width,
    height,
  });
}

function ensurePageSpace({
  pdf,
  page,
  cursorY,
  needed,
  font,
  boldFont,
  logoImage,
  title,
  subtitle,
}: {
  pdf: PDFDocument;
  page: PDFPage;
  cursorY: number;
  needed: number;
  font: PDFFont;
  boldFont: PDFFont;
  logoImage: PDFImage | null;
  title: string;
  subtitle: string;
}) {
  if (cursorY - needed > 68) {
    return { page, cursorY };
  }

  const nextPage = addPage(pdf);

  drawHeader({
    page: nextPage,
    font,
    boldFont,
    title,
    subtitle,
    logoImage,
  });

  drawFooter({ page: nextPage, font });

  return {
    page: nextPage,
    cursorY: nextPage.getHeight() - 128,
  };
}

function drawExecutiveSummaryPage({
  pdf,
  font,
  boldFont,
  logoImage,
  quote,
}: {
  pdf: PDFDocument;
  font: PDFFont;
  boldFont: PDFFont;
  logoImage: PDFImage | null;
  quote: QuoteWithClient;
}) {
  const page = addPage(pdf);

  drawHeader({
    page,
    font,
    boldFont,
    title: "Executive Summary",
    subtitle:
      "Project vision, lighting philosophy, and installation approach.",
    logoImage,
  });

  drawFooter({ page, font });

  const lightingPhilosophy =
    generateLightingPhilosophy("premium");

  const projectApproach =
    generateProjectApproach("premium");

  const executiveSummary =
    generateExecutiveSummary({
      clientName: quote.clientName,
      siteAddress: quote.clientSiteAddress,
      scope: quote.scope,
      tone: "premium",
    });

  drawCard({
    page,
    x: pdfTheme.spacing.pageX,
    y: 330,
    width: page.getWidth() - pdfTheme.spacing.pageX * 2,
    height: 180,
    fill: colors.warmPaper,
  });

  drawSectionTitle({
    page,
    title: "Lighting Philosophy",
    x: pdfTheme.spacing.pageX + 24,
    y: 474,
    boldFont,
  });

  drawWrappedText({
    page,
    text: lightingPhilosophy,
    x: pdfTheme.spacing.pageX + 24,
    y: 438,
    maxWidth: page.getWidth() - 140,
    font,
    size: pdfTheme.typography.body,
    color: colors.mutedInk,
    lineHeight: 18,
  });

  drawCard({
    page,
    x: pdfTheme.spacing.pageX,
    y: 138,
    width: page.getWidth() - pdfTheme.spacing.pageX * 2,
    height: 150,
    fill: colors.goldWash,
  });

  drawSectionTitle({
    page,
    title: "Project Approach",
    x: pdfTheme.spacing.pageX + 24,
    y: 254,
    boldFont,
  });

  drawWrappedText({
    page,
    text: projectApproach,
    x: pdfTheme.spacing.pageX + 24,
    y: 220,
    maxWidth: page.getWidth() - 140,
    font,
    size: pdfTheme.typography.body,
    color: colors.ink,
    lineHeight: 18,
  });

  page.drawText("Prepared For", {
    x: pdfTheme.spacing.pageX,
    y: 104,
    size: pdfTheme.typography.small,
    font,
    color: colors.softInk,
  });

  page.drawText(quote.clientName, {
    x: pdfTheme.spacing.pageX,
    y: 84,
    size: 15,
    font: boldFont,
    color: colors.ink,
  });

  drawWrappedText({
    page,
    text: executiveSummary,
    x: 340,
    y: 96,
    maxWidth: 340,
    font,
    size: pdfTheme.typography.small,
    color: colors.mutedInk,
    lineHeight: 14,
  });
}

function getPremiumScopeItemDescription(item: {
  description?: string | null;
}) {
  if (item.description) {
    return item.description;
  }

  return "Selected and included as part of the proposed lighting design for this area.";
}

function getPremiumScopeItemTitle(item: {
  quantity: number;
  title: string;
}) {
  return `${item.quantity} × ${item.title}`;
}

function getScopeGroupLabel(section: ClientScopeSection) {
  const name = section.zoneName.toLowerCase();

  if (name.includes("transformer")) return "Transformer Planning";
  if (name.includes("wire") || name.includes("cable")) return "Cable & Wiring";
  if (name.includes("path")) return "Pathway Lighting";
  if (name.includes("step")) return "Step Lighting";
  if (name.includes("accent")) return "Accent Lighting";

  return "Lighting Fixtures";
}

function drawScopePage({
  pdf,
  font,
  boldFont,
  logoImage,
  scopeSections,
}: {
  pdf: PDFDocument;
  font: PDFFont;
  boldFont: PDFFont;
  logoImage: PDFImage | null;
  scopeSections?: ClientScopeSection[];
}) {
  if (!scopeSections || scopeSections.length === 0) return;

  let page = addPage(pdf);

  drawHeader({
    page,
    font,
    boldFont,
    title: "Lighting Scope",
    subtitle: "Curated lighting scope organized by project area.",
    logoImage,
  });

  drawFooter({ page, font });

  let cursorY = page.getHeight() - 128;

  scopeSections.forEach((section, sectionIndex) => {
    const sectionSpace = 82 + section.items.length * 74;

    const pageState = ensurePageSpace({
      pdf,
      page,
      cursorY,
      needed: sectionSpace,
      font,
      boldFont,
      logoImage,
      title: "Lighting Scope",
      subtitle: "Curated lighting scope organized by project area.",
    });

    page = pageState.page;
    cursorY = pageState.cursorY;

    const cardFill =
      sectionIndex % 2 === 0 ? colors.warmPaper : colors.goldWash;

    drawCard({
      page,
      x: pdfTheme.spacing.pageX,
      y: cursorY - sectionSpace + 8,
      width: page.getWidth() - pdfTheme.spacing.pageX * 2,
      height: sectionSpace,
      fill: cardFill,
    });

    page.drawText(`Zone ${sectionIndex + 1}`, {
      x: pdfTheme.spacing.pageX + 18,
      y: cursorY - 18,
      size: pdfTheme.typography.micro,
      font,
      color: colors.softGold,
    });

    drawSectionTitle({
      page,
      title: section.zoneName,
      x: pdfTheme.spacing.pageX + 18,
      y: cursorY - 36,
      boldFont,
    });

    page.drawText(`${section.items.length} scope item(s)`, {
      x: page.getWidth() - pdfTheme.spacing.pageX - 120,
      y: cursorY - 36,
      size: pdfTheme.typography.small,
      font,
      color: colors.softInk,
    });

    page.drawText(getScopeGroupLabel(section), {
      x: pdfTheme.spacing.pageX + 18,
      y: cursorY - 52,
      size: pdfTheme.typography.small,
      font,
      color: colors.mutedInk,
    });

    cursorY -= 82;

    section.items.forEach((item, itemIndex) => {
      const itemTitle = getPremiumScopeItemTitle(item);
      const itemDescription =
  generateFixtureNarrative({
    title: item.title,
    description:
      item.description ||
      getPremiumScopeItemDescription(item),
    quantity: item.quantity,
  });

      page.drawRectangle({
        x: pdfTheme.spacing.pageX + 18,
        y: cursorY + 8,
        width: page.getWidth() - pdfTheme.spacing.pageX * 2 - 36,
        height: 0.5,
        color: colors.softBorder,
        opacity: itemIndex === 0 ? 0 : 1,
      });

      drawCard({
        page,
        x: pdfTheme.spacing.pageX + 20,
        y: cursorY - 58,
        width: page.getWidth() - pdfTheme.spacing.pageX * 2 - 40,
        height: 66,
        fill: colors.paper,
      });

      page.drawText(itemTitle, {
        x: pdfTheme.spacing.pageX + 36,
        y: cursorY,
        size: 10.5,
        font: boldFont,
        color: colors.ink,
        maxWidth: page.getWidth() - 170,
      });

      cursorY -= 16;

      drawWrappedText({
        page,
        text: itemDescription,
        x: pdfTheme.spacing.pageX + 36,
        y: cursorY,
        maxWidth: page.getWidth() - 170,
        font,
        size: pdfTheme.typography.small,
        color: colors.mutedInk,
        lineHeight: 12,
      });

      cursorY -= 18;

      page.drawText(
        "Warm LED · Professional Installation · Integrated Lighting Design",
        {
          x: pdfTheme.spacing.pageX + 36,
          y: cursorY,
          size: 8.5,
          font,
          color: colors.softGold,
          maxWidth: page.getWidth() - 170,
        },
      );

      cursorY -= 40;
    });

    cursorY -= 22;
  });
}

function drawAcceptancePage({
  pdf,
  font,
  boldFont,
  logoImage,
  quote,
  totals,
}: {
  pdf: PDFDocument;
  font: PDFFont;
  boldFont: PDFFont;
  logoImage: PDFImage | null;
  quote: QuoteWithClient;
  totals: QuoteTotals;
}) {
  const page = addPage(pdf);

  drawHeader({
    page,
    font,
    boldFont,
    title: "Proposal Acceptance",
    subtitle:
      "Client approval, authorization, and project acceptance.",
    logoImage,
  });

  drawFooter({ page, font });

  drawCard({
    page,
    x: pdfTheme.spacing.pageX,
    y: 382,
    width: page.getWidth() - pdfTheme.spacing.pageX * 2,
    height: 138,
    fill: colors.warmPaper,
  });

  drawSectionTitle({
    page,
    title: "Approval Acknowledgement",
    x: pdfTheme.spacing.pageX + 24,
    y: 488,
    boldFont,
  });

  drawWrappedText({
    page,
    text:
     "By approving this proposal, the client acknowledges acceptance of the proposed lighting scope, investment summary, project planning, and installation approach outlined within this document. Approval authorizes procurement preparation, project scheduling, installation coordination, and production readiness activities.",
    x: pdfTheme.spacing.pageX + 24,
    y: 452,
    maxWidth: page.getWidth() - 140,
    font,
    size: pdfTheme.typography.body,
    color: colors.mutedInk,
    lineHeight: 18,
  });

  drawCard({
    page,
    x: pdfTheme.spacing.pageX,
    y: 218,
    width: page.getWidth() - pdfTheme.spacing.pageX * 2,
    height: 118,
    fill: colors.goldWash,
  });

  drawSectionTitle({
    page,
    title: "Investment Confirmation",
    x: pdfTheme.spacing.pageX + 24,
    y: 304,
    boldFont,
  });

  page.drawText("Approved Project Total", {
    x: pdfTheme.spacing.pageX + 24,
    y: 264,
    size: pdfTheme.typography.small,
    font,
    color: colors.mutedInk,
  });

  page.drawText(formatCurrency(totals.total), {
    x: pdfTheme.spacing.pageX + 24,
    y: 236,
    size: 20,
    font: boldFont,
    color: colors.gold,
  });

  page.drawText("Required Deposit", {
    x: 420,
    y: 264,
    size: pdfTheme.typography.small,
    font,
    color: colors.mutedInk,
  });

  page.drawText(formatCurrency(totals.depositAmount), {
    x: 420,
    y: 236,
    size: 20,
    font: boldFont,
    color: colors.ink,
  });

  drawCard({
    page,
    x: pdfTheme.spacing.pageX,
    y: 72,
    width: 300,
    height: 104,
    fill: colors.paper,
  });

  drawCard({
    page,
    x: 396,
    y: 72,
    width: 300,
    height: 104,
    fill: colors.paper,
  });

  page.drawText("Client Signature", {
    x: pdfTheme.spacing.pageX + 22,
    y: 144,
    size: pdfTheme.typography.small,
    font,
    color: colors.softInk,
  });

  page.drawLine({
    start: {
      x: pdfTheme.spacing.pageX + 22,
      y: 112,
    },
    end: {
      x: pdfTheme.spacing.pageX + 260,
      y: 112,
    },
    thickness: 1,
    color: colors.softBorder,
  });

  page.drawText("Date", {
    x: 418,
    y: 144,
    size: pdfTheme.typography.small,
    font,
    color: colors.softInk,
  });

  page.drawLine({
    start: {
      x: 418,
      y: 112,
    },
    end: {
      x: 650,
      y: 112,
    },
    thickness: 1,
    color: colors.softBorder,
  });

  page.drawText("Authorized Client", {
    x: pdfTheme.spacing.pageX + 22,
    y: 90,
    size: 9,
    font,
    color: colors.softInk,
  });

  page.drawText(quote.clientName, {
    x: 418,
    y: 90,
    size: 9,
    font,
    color: colors.softInk,
  });
}

async function drawGalleryPage({
  pdf,
  mediaSection,
  font,
  boldFont,
  logoImage,
}: {
  pdf: PDFDocument;
  mediaSection?: PdfMediaSection;
  font: PDFFont;
  boldFont: PDFFont;
  logoImage: PDFImage | null;
}) {
  const galleryImages = mediaSection?.galleryImages ?? [];

  if (galleryImages.length === 0) return;

  for (let pageIndex = 0; pageIndex < galleryImages.length; pageIndex += 4) {
    const page = addPage(pdf);

    drawHeader({
      page,
      font,
      boldFont,
      title:
        pageIndex > 0
          ? "Project Gallery Continued"
          : "Project Gallery",
      subtitle: "Selected visual references for this proposal.",
      logoImage,
    });

    drawFooter({ page, font });

    const pageImages = galleryImages.slice(pageIndex, pageIndex + 4);

    const slots = [
      { x: 48, y: 318, width: 320, height: 168 },
      { x: 424, y: 318, width: 320, height: 168 },
      { x: 48, y: 96, width: 320, height: 168 },
      { x: 424, y: 96, width: 320, height: 168 },
    ];

    for (let index = 0; index < pageImages.length; index += 1) {
      const item = pageImages[index];
      const slot = slots[index];

      await drawMediaImage({
        pdf,
        page,
        item,
        x: slot.x,
        y: slot.y,
        width: slot.width,
        height: slot.height,
      });

      page.drawText(item.caption || item.fileName, {
        x: slot.x,
        y: slot.y - 18,
        size: pdfTheme.typography.small,
        font,
        color: colors.mutedInk,
        maxWidth: slot.width,
      });
    }
  }
}

export async function generateClientQuotePdf({
  quote,
  totals,
  mediaSection,
  scopeSections,
}: ClientQuotePdfInput) {
  const { pdf, page, font, boldFont, width, height } =
    await createPdfDocument();

  drawPageBackground(page);

  const logoImage = await embedPdfLogo(pdf);

  drawHeader({
    page,
    font,
    boldFont,
    title: "Lighting Proposal",
    subtitle: "Architectural lighting design & installation proposal",
    logoImage,
  });

  drawFooter({ page, font });

  await drawCoverImage({
    pdf,
    page,
    mediaSection,
    x: width - 340,
    y: height - 330,
    width: 292,
    height: 240,
  });

  page.drawText(quote.clientName, {
    x: pdfTheme.spacing.pageX,
    y: height - 165,
    size: 28,
    font: boldFont,
    color: colors.ink,
  });

  page.drawText(
    quote.clientSiteAddress || "Project location to be confirmed",
    {
      x: pdfTheme.spacing.pageX,
      y: height - 192,
      size: 11,
      font,
      color: colors.mutedInk,
      maxWidth: 360,
    },
  );

  page.drawRectangle({
    x: pdfTheme.spacing.pageX,
    y: height - 214,
    width: 140,
    height: 1.5,
    color: colors.gold,
  });

  page.drawText(
    `${quote.quoteNumber} · Revision ${quote.revisionNumber}`,
    {
      x: pdfTheme.spacing.pageX,
      y: height - 238,
      size: 10,
      font,
      color: colors.softGold,
    },
  );

  drawCard({
    page,
    x: pdfTheme.spacing.pageX,
    y: height - 390,
    width: width - 96,
    height: 110,
    fill: colors.warmPaper,
  });

  drawSectionTitle({
    page,
    title: "Project Overview",
    x: pdfTheme.spacing.pageX + 24,
    y: height - 315,
    boldFont,
  });

  drawWrappedText({
    page,
    text:
      quote.scope ||
      "A curated lighting plan designed to enhance comfort, atmosphere, safety, and architectural balance throughout the property.",
    x: pdfTheme.spacing.pageX + 24,
    y: height - 346,
    size: pdfTheme.typography.body,
    font,
    color: colors.mutedInk,
    maxWidth: width - 150,
    lineHeight: 16,
  });

  drawCard({
    page,
    x: width - 290,
    y: 72,
    width: 242,
    height: 152,
    fill: colors.goldWash,
  });

  drawSectionTitle({
    page,
    title: "Investment Summary",
    x: width - 266,
    y: 194,
    boldFont,
  });

  const approvedChangeOrderTotal = 0;
  const revisedProjectTotal = totals.total + approvedChangeOrderTotal;

  const summaryRows = [
    {
      label: "Materials",
      value: formatCurrency(totals.materialSubtotal),
      tone: "normal",
    },
    {
      label: "Installation Labour",
      value: formatCurrency(
        totals.zoneLabourSubtotal + totals.quoteLevelLabourSubtotal,
      ),
      tone: "normal",
    },
    {
      label: "Taxes",
      value: formatCurrency(totals.taxAmount),
      tone: "normal",
    },
    {
      label: "Original Proposal",
      value: formatCurrency(totals.total),
      tone: "primary",
    },
    {
      label: "Approved Change Orders",
      value: formatCurrency(approvedChangeOrderTotal),
      tone: "normal",
    },
    {
      label: "Revised Project Total",
      value: formatCurrency(revisedProjectTotal),
      tone: "gold",
    },
    {
      label: "Deposit",
      value: formatCurrency(totals.depositAmount),
      tone: "normal",
    },
    {
      label: "Balance Due",
      value: formatCurrency(totals.balanceDue),
      tone: "primary",
    },
  ];

  summaryRows.forEach((row, index) => {
    const rowY = 162 - index * 17;
    const isPrimary = row.tone === "primary";
    const isGold = row.tone === "gold";

    page.drawText(row.label, {
      x: width - 266,
      y: rowY,
      size: pdfTheme.typography.small,
      font,
      color: isGold ? colors.gold : colors.mutedInk,
    });

    page.drawText(row.value, {
      x: width - 136,
      y: rowY,
      size:
        isPrimary || isGold
          ? 11
          : pdfTheme.typography.small,
      font: isPrimary || isGold ? boldFont : font,
      color: isGold ? colors.gold : colors.ink,
    });

    if (isGold) {
      page.drawRectangle({
        x: width - 270,
        y: rowY - 6,
        width: 210,
        height: 0.75,
        color: colors.gold,
        opacity: 0.45,
      });
    }
  });

  drawExecutiveSummaryPage({
    pdf,
    font,
    boldFont,
    logoImage,
    quote,
  });

  drawScopePage({
    pdf,
    font,
    boldFont,
    logoImage,
    scopeSections,
  });

  drawAcceptancePage({
    pdf,
    font,
    boldFont,
    logoImage,
    quote,
    totals,
  });

  await drawGalleryPage({
    pdf,
    mediaSection,
    font,
    boldFont,
    logoImage,
  });

  return pdf.save();
}