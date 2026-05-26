import type { MediaOwnerType } from "./media-types";

type MediaPathInput = {
  quoteId: string;
  zoneId?: string | null;
  ownerType: MediaOwnerType;
  fileName: string;
};

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-");
}

export function buildMediaStoragePath({
  quoteId,
  zoneId,
  ownerType,
  fileName,
}: MediaPathInput) {
  const safeFileName = sanitizeFileName(fileName);
  const timestamp = Date.now();

  if (ownerType === "zone") {
    if (!zoneId) {
      throw new Error("zoneId is required for zone media.");
    }

    return `quotes/${quoteId}/zones/${zoneId}/${timestamp}-${safeFileName}`;
  }

  return `quotes/${quoteId}/quote/${timestamp}-${safeFileName}`;
}