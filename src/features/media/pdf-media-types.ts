import type { MediaAssetWithUrl } from "./actions/get-media-signed-urls";

export type PdfMediaItem = MediaAssetWithUrl;

export type PdfMediaSection = {
  coverImage: PdfMediaItem | null;
  galleryImages: PdfMediaItem[];
};

export function buildPdfMediaSection(
  media: PdfMediaItem[],
): PdfMediaSection {
  const coverImage =
    media.find((item) => item.isCover) ?? media[0] ?? null;

  const galleryImages = media.filter(
    (item) => item.id !== coverImage?.id,
  );

  return {
    coverImage,
    galleryImages,
  };
}