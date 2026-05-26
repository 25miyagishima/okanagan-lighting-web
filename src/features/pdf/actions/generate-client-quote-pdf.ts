"use server";

import { getQuoteById } from "@/features/quotes/quote-actions";
import { getZonesByQuoteId } from "@/features/quotes/zone-actions";
import { getQuoteItemsByQuoteId } from "@/features/quotes/quote-item-actions";
import { calculateQuoteTotals } from "@/features/quotes/quote-totals";
import { getPdfMediaByQuoteId } from "@/features/media/actions/get-pdf-media";
import { buildPdfMediaSection } from "@/features/media/pdf-media-types";
import { generateClientQuotePdf } from "@/features/pdf/client-quote-pdf";
import { buildClientScopeSections } from "@/features/pdf/build-client-scope";

export async function generateClientQuotePdfAction(
  quoteId: string,
) {
  const quote = await getQuoteById(quoteId);

  if (!quote) {
    return {
      error: "Quote not found.",
    };
  }

  const zones = await getZonesByQuoteId(quoteId);
  const quoteItems = await getQuoteItemsByQuoteId(quoteId);

  const scopeSections = buildClientScopeSections({
    zones,
    quoteItems,
  });

  const pdfMedia = await getPdfMediaByQuoteId(quoteId);
  const mediaSection = buildPdfMediaSection(pdfMedia);

  const totals = calculateQuoteTotals({
    zones,
    quoteItems,
    quoteLevelLabourHours: quote.quoteLevelLabourHours,
    quoteLevelHourlyRate: quote.quoteLevelHourlyRate,
    discountType: quote.discountType,
    discountValue: quote.discountValue,
    depositType: quote.depositType,
    depositValue: quote.depositValue,
    materialTaxRate: 12,
    labourTaxable: false,
  });

  const pdfBytes = await generateClientQuotePdf({
    quote,
    totals,
    mediaSection,
    scopeSections,
  });

  return {
    fileName: `${quote.quoteNumber}-client-proposal.pdf`,
    base64: Buffer.from(pdfBytes).toString("base64"),
  };
}