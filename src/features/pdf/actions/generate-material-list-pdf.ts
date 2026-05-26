"use server";

import { getQuoteById } from "@/features/quotes/quote-actions";
import { getQuoteItemsByQuoteId } from "@/features/quotes/quote-item-actions";
import { generateMaterialListPdf } from "@/features/pdf/material-list-pdf";

export async function generateMaterialListPdfAction(
  quoteId: string,
) {
  const quote = await getQuoteById(quoteId);

  if (!quote) {
    return {
      error: "Quote not found.",
    };
  }

  const quoteItems = await getQuoteItemsByQuoteId(quoteId);

  const pdfBytes = await generateMaterialListPdf({
    quote,
    quoteItems,
  });

  return {
    fileName: `${quote.quoteNumber}-internal-material-list.pdf`,
    base64: Buffer.from(pdfBytes).toString("base64"),
  };
}