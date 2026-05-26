"use server";

import { getQuoteById } from "@/features/quotes/quote-actions";
import { getZonesByQuoteId } from "@/features/quotes/zone-actions";
import { getQuoteItemsByQuoteId } from "@/features/quotes/quote-item-actions";
import { calculateQuoteTotals } from "@/features/quotes/quote-totals";
import { generateBusinessProfitPdf } from "@/features/pdf/business-profit-pdf";

export async function generateBusinessProfitPdfAction(
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

  const pdfBytes = await generateBusinessProfitPdf({
    quote,
    totals,
  });

  return {
    fileName: `${quote.quoteNumber}-business-profit-report.pdf`,
    base64: Buffer.from(pdfBytes).toString("base64"),
  };
}