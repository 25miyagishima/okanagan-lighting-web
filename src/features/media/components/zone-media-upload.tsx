"use client";

import { useState, useTransition } from "react";
import { uploadMedia } from "../actions/upload-media";

type ZoneMediaUploadProps = {
  quoteId: string;
  zoneId: string;
};

export function ZoneMediaUpload({
  quoteId,
  zoneId,
}: ZoneMediaUploadProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setErrorMessage(null);
    setSuccessMessage(null);

    const file = formData.get("file");

    if (!(file instanceof File)) {
      setErrorMessage("Please select a file.");
      return;
    }

    startTransition(async () => {
      const result = await uploadMedia({
        quoteId,
        zoneId,
        ownerType: "zone",
        file,
      });

      if (result?.error) {
        setErrorMessage(result.error);
        return;
      }

      setSuccessMessage("Zone photo uploaded successfully.");
    });
  }

  return (
    <form
      action={handleSubmit}
      className="mt-4 space-y-3 rounded-xl border border-white/5 bg-white/[0.03] p-3"
    >
      <div>
        <h3 className="text-sm font-medium text-[#F5F5F1]">
          Zone Photos
        </h3>

        <p className="mt-1 text-xs text-[#9EA3AA]">
          Upload layout, site condition, transformer, or install reference photos.
        </p>
      </div>

      <input
        type="file"
        name="file"
        accept="image/*"
        className="block w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1]"
      />

      {errorMessage ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {errorMessage}
        </p>
      ) : null}

      {successMessage ? (
        <p className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm text-green-300">
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[#F5F5F1] transition-colors hover:bg-white/[0.06] disabled:opacity-50"
      >
        {isPending ? "Uploading..." : "Upload Zone Photo"}
      </button>
    </form>
  );
}