"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteMedia } from "../actions/delete-media";
import type { MediaAssetWithUrl } from "../actions/get-media-signed-urls";
import { setCoverImage } from "../actions/set-cover-image";
import { updateMediaCaption } from "../actions/update-media-caption";
import { updateMediaOrder } from "../actions/update-media-order";
import { updateMediaPdfInclusion } from "../actions/update-media-pdf-inclusion";

type MediaLightboxProps = {
  media: MediaAssetWithUrl[];
};

export function MediaLightbox({ media }: MediaLightboxProps) {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [captionValue, setCaptionValue] = useState("");
  const [includeInPdf, setIncludeInPdf] = useState(false);
  const [isPending, startTransition] = useTransition();

  const activeItem =
    activeIndex === null ? null : media[activeIndex] ?? null;

  function openLightbox(index: number) {
    const item = media[index];

    setErrorMessage(null);
    setCaptionValue(item?.caption ?? "");
    setIncludeInPdf(item?.includeInPdf ?? false);
    setActiveIndex(index);
  }

  function handleDelete(mediaId: string) {
    const confirmed = window.confirm(
      "Delete this photo? This cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    setErrorMessage(null);

    startTransition(async () => {
      const result = await deleteMedia(mediaId);

      if (result?.error) {
        setErrorMessage(result.error);
        return;
      }

      setActiveIndex(null);
      router.refresh();
    });
  }

  async function reorderMedia(
    currentIndex: number,
    direction: "up" | "down",
  ) {
    const newIndex =
      direction === "up"
        ? currentIndex - 1
        : currentIndex + 1;

    if (newIndex < 0 || newIndex >= media.length) {
      return;
    }

    const reordered = [...media];

    const temp = reordered[currentIndex];
    reordered[currentIndex] = reordered[newIndex];
    reordered[newIndex] = temp;

    const payload = reordered.map((item, index) => ({
      id: item.id,
      sortOrder: index,
    }));

    startTransition(async () => {
      const result = await updateMediaOrder(payload);

      if (result?.error) {
        setErrorMessage(result.error);
        return;
      }

      setActiveIndex(newIndex);
      router.refresh();
    });
  }

  function handleSetCover() {
    if (!activeItem) {
      return;
    }

    setErrorMessage(null);

    startTransition(async () => {
      const result = await setCoverImage(
        activeItem.quoteId,
        activeItem.id,
      );

      if (result?.error) {
        setErrorMessage(result.error);
        return;
      }

      router.refresh();
    });
  }

  function handleSaveChanges(mediaId: string) {
    setErrorMessage(null);

    startTransition(async () => {
      const captionResult = await updateMediaCaption(
        mediaId,
        captionValue,
      );

      if (captionResult?.error) {
        setErrorMessage(captionResult.error);
        return;
      }

      const pdfResult = await updateMediaPdfInclusion(
        mediaId,
        includeInPdf,
      );

      if (pdfResult?.error) {
        setErrorMessage(pdfResult.error);
        return;
      }

      router.refresh();
    });
  }

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openLightbox(index)}
            className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] text-left transition-transform hover:scale-[1.01]"
          >
            <div className="relative">
              {item.signedUrl ? (
                <img
                  src={item.signedUrl}
                  alt={item.caption || item.fileName}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-white/[0.03] px-3 text-center text-xs text-[#9EA3AA]">
                  Image preview unavailable
                </div>
              )}

              {item.isCover ? (
                <div className="absolute left-2 top-2 rounded-full border border-[#E2B15A]/30 bg-[#E2B15A]/15 px-2 py-1 text-[10px] font-semibold text-[#E2B15A] backdrop-blur-sm">
                  Cover Image
                </div>
              ) : null}
            </div>

            <div className="p-3">
              <p className="truncate text-sm font-medium text-[#F5F5F1]">
                {item.caption || item.fileName}
              </p>

              <p className="mt-1 text-xs text-[#9EA3AA]">
                {item.assetType} · {item.visibility}
              </p>

              {item.includeInPdf ? (
                <div className="mt-2 inline-flex rounded-full border border-[#E2B15A]/20 bg-[#E2B15A]/10 px-2 py-1 text-[10px] font-medium text-[#E2B15A]">
                  Included in PDF
                </div>
              ) : null}
            </div>
          </button>
        ))}
      </div>

      {activeItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="absolute right-4 top-4 flex gap-2">
            <button
              type="button"
              onClick={() => handleDelete(activeItem.id)}
              disabled={isPending}
              className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-sm text-red-300 hover:bg-red-500/20 disabled:opacity-50"
            >
              {isPending ? "Working..." : "Delete"}
            </button>

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
            >
              Close
            </button>
          </div>

          <div className="grid max-h-full w-full max-w-6xl gap-4 lg:grid-cols-[1fr_320px]">
            <div className="flex min-h-0 items-center justify-center">
              {activeItem.signedUrl ? (
                <img
                  src={activeItem.signedUrl}
                  alt={activeItem.caption || activeItem.fileName}
                  className="max-h-[82vh] max-w-full rounded-2xl object-contain"
                />
              ) : null}
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    {activeItem.caption || activeItem.fileName}
                  </p>

                  <p className="mt-1 text-xs text-white/60">
                    {activeItem.assetType} · {activeItem.visibility}
                  </p>
                </div>

                {activeItem.isCover ? (
                  <div className="rounded-full border border-[#E2B15A]/30 bg-[#E2B15A]/15 px-2 py-1 text-[10px] font-semibold text-[#E2B15A]">
                    Cover
                  </div>
                ) : null}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (activeIndex !== null) {
                      reorderMedia(activeIndex, "up");
                    }
                  }}
                  disabled={isPending || activeIndex === 0}
                  className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white transition-colors hover:bg-white/[0.08] disabled:opacity-40"
                >
                  Move Up
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (activeIndex !== null) {
                      reorderMedia(activeIndex, "down");
                    }
                  }}
                  disabled={
                    isPending ||
                    activeIndex === media.length - 1
                  }
                  className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white transition-colors hover:bg-white/[0.08] disabled:opacity-40"
                >
                  Move Down
                </button>
              </div>

              <button
                type="button"
                onClick={handleSetCover}
                disabled={isPending}
                className="mt-3 w-full rounded-xl border border-[#E2B15A]/20 bg-[#E2B15A]/10 px-4 py-2 text-sm font-medium text-[#E2B15A] transition-colors hover:bg-[#E2B15A]/20 disabled:opacity-50"
              >
                {activeItem.isCover
                  ? "Current Cover Image"
                  : "Set as Cover Image"}
              </button>

              <div className="mt-4">
                <label
                  htmlFor={`caption-${activeItem.id}`}
                  className="text-xs font-medium text-white/80"
                >
                  Caption / Notes
                </label>

                <textarea
                  id={`caption-${activeItem.id}`}
                  value={captionValue}
                  onChange={(event) => setCaptionValue(event.target.value)}
                  className="mt-2 min-h-28 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#E2B15A]/50"
                  placeholder="Add site notes, install context, transformer location, customer preference..."
                />
              </div>

              <label className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-3">
                <input
                  type="checkbox"
                  checked={includeInPdf}
                  onChange={(event) =>
                    setIncludeInPdf(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-white/20 bg-black/20"
                />

                <div>
                  <p className="text-sm font-medium text-white">
                    Include in PDF
                  </p>

                  <p className="text-xs text-white/50">
                    Show this image in branded quote proposals.
                  </p>
                </div>
              </label>

              <button
                type="button"
                onClick={() => handleSaveChanges(activeItem.id)}
                disabled={isPending}
                className="mt-3 w-full rounded-xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] px-4 py-2 text-sm font-medium text-[#0D0E10] transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>

              {errorMessage ? (
                <p className="mt-3 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {errorMessage}
                </p>
              ) : null}
            </aside>
          </div>
        </div>
      ) : null}
    </>
  );
}