"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { uploadMedia } from "../actions/upload-media";
import { MEDIA_MAX_FILES_PER_UPLOAD } from "../media-config";
import { compressImageForUpload } from "../utils/compress-image";

type QuoteMediaUploadProps = {
  quoteId: string;
};

export function QuoteMediaUpload({
  quoteId,
}: QuoteMediaUploadProps) {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploadCount, setUploadCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setErrorMessage(null);
    setSuccessMessage(null);
    setUploadCount(0);

    const files = formData
      .getAll("files")
      .filter((file): file is File => file instanceof File && file.size > 0);

    if (files.length === 0) {
      setErrorMessage("Please select at least one photo.");
      return;
    }

    if (files.length > MEDIA_MAX_FILES_PER_UPLOAD) {
      setErrorMessage(
        `Please upload ${MEDIA_MAX_FILES_PER_UPLOAD} photos or fewer at a time.`,
      );
      return;
    }

    startTransition(async () => {
      for (const file of files) {
        const compressedFile = await compressImageForUpload(file);

        const result = await uploadMedia({
          quoteId,
          ownerType: "quote",
          file: compressedFile,
        });

        if (result?.error) {
          setErrorMessage(result.error);
          return;
        }

        setUploadCount((current) => current + 1);
      }

      setSuccessMessage(`${files.length} photo(s) uploaded successfully.`);
      router.refresh();
    });
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-3 rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]"
    >
      <div>
        <h2 className="text-sm font-medium text-[#F5F5F1]">
          Quote Photos
        </h2>

        <p className="mt-1 text-xs text-[#9EA3AA]">
          Upload reference, site, layout, and installation photos.
        </p>
      </div>

      <input
        type="file"
        name="files"
        accept="image/*"
        multiple
        className="block w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1]"
      />

      {isPending ? (
        <p className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-[#9EA3AA]">
          Uploading {uploadCount} of selected photos...
        </p>
      ) : null}

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
        className="w-full rounded-xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] px-4 py-2 text-sm font-medium text-[#0D0E10] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Uploading..." : "Upload Photos"}
      </button>
    </form>
  );
}