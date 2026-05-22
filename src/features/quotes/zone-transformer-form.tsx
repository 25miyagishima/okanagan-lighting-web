"use client";

import { useState } from "react";
import { assignZoneTransformer } from "./zone-actions";
import type { Transformer } from "@/types/database";

type ZoneTransformerFormProps = {
  quoteId: string;
  zoneId: string;
  currentTransformerId: string | null;
  transformers: Transformer[];
};

export function ZoneTransformerForm({
  quoteId,
  zoneId,
  currentTransformerId,
  transformers,
}: ZoneTransformerFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setErrorMessage(null);

    const result = await assignZoneTransformer(zoneId, quoteId, formData);

    if (result?.error) {
      setErrorMessage(result.error);
    }
  }

  return (
    <form action={handleSubmit} className="mt-3 space-y-2">
      <label
        htmlFor={`transformerId-${zoneId}`}
        className="text-xs font-medium text-[#F5F5F1]"
      >
        Assigned Transformer
      </label>

      <select
        id={`transformerId-${zoneId}`}
        name="transformerId"
        defaultValue={currentTransformerId ?? "none"}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1] outline-none transition-colors focus:border-[#E2B15A]/40"
      >
        <option value="none">No transformer assigned</option>

        {transformers.map((transformer) => (
          <option key={transformer.id} value={transformer.id}>
            {transformer.name} — {transformer.capacityWatts}W
          </option>
        ))}
      </select>

      {errorMessage ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-[#F5F5F1] transition-colors hover:bg-white/[0.06]"
      >
        Save Transformer Assignment
      </button>
    </form>
  );
}