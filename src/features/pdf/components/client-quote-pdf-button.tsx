"use client";

import { useState, useTransition } from "react";
import { generateClientQuotePdfAction } from "../actions/generate-client-quote-pdf";

type ClientQuotePdfButtonProps = {
  quoteId: string;
};

export function ClientQuotePdfButton({
  quoteId,
}: ClientQuotePdfButtonProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDownload() {
    setErrorMessage(null);

    startTransition(async () => {
      const result = await generateClientQuotePdfAction(quoteId);

if ("error" in result) {
  setErrorMessage(result.error ?? "Failed to generate PDF.");
  return;
}

      const binaryString = window.atob(result.base64);
      const bytes = new Uint8Array(binaryString.length);

      for (let index = 0; index < binaryString.length; index += 1) {
        bytes[index] = binaryString.charCodeAt(index);
      }

      const blob = new Blob([bytes], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = result.fileName;
      link.click();

      window.URL.revokeObjectURL(url);
    });
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isPending}
        className="w-full rounded-xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] px-4 py-2 text-sm font-medium text-[#0D0E10] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Generating PDF..." : "Download Client Proposal PDF"}
      </button>

      {errorMessage ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}