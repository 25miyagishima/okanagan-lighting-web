export type MediaOwnerType = "quote" | "zone";

export type MediaVisibility = "internal" | "client";

export type MediaAssetType =
  | "site-photo"
  | "layout-reference"
  | "before"
  | "after"
  | "progress"
  | "issue"
  | "inspiration"
  | "other";

export type MediaAsset = {
  id: string;
  quoteId: string;
  zoneId: string | null;
  ownerType: MediaOwnerType;
  assetType: MediaAssetType;
  visibility: MediaVisibility;
  filePath: string;
  thumbnailPath: string | null;
  fileName: string;
  mimeType: string;
  fileSize: number;
  caption: string | null;
  sortOrder: number;
  includeInPdf: boolean;
  isCover: boolean;
  createdAt: string;
};