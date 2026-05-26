"use server";

import { createClient } from "@/lib/supabase/server";
import { getMediaSignedUrls } from "./get-media-signed-urls";
import type { MediaAsset } from "../media-types";

type MediaAssetRow = {
  id: string;
  quote_id: string;
  zone_id: string | null;
  owner_type: "quote" | "zone";
  asset_type: MediaAsset["assetType"];
  visibility: MediaAsset["visibility"];
  file_path: string;
  thumbnail_path: string | null;
  file_name: string;
  mime_type: string;
  file_size: number;
  caption: string | null;
  sort_order: number;
  include_in_pdf: boolean;
  is_cover: boolean;
  created_at: string;
};

function mapPdfMedia(row: MediaAssetRow): MediaAsset {
  return {
    id: row.id,
    quoteId: row.quote_id,
    zoneId: row.zone_id,
    ownerType: row.owner_type,
    assetType: row.asset_type,
    visibility: row.visibility,
    filePath: row.file_path,
    thumbnailPath: row.thumbnail_path,
    fileName: row.file_name,
    mimeType: row.mime_type,
    fileSize: row.file_size,
    caption: row.caption,
    sortOrder: row.sort_order,
    includeInPdf: row.include_in_pdf,
    isCover: row.is_cover,
    createdAt: row.created_at,
  };
}

export async function getPdfMediaByQuoteId(quoteId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .eq("quote_id", quoteId)
    .eq("include_in_pdf", true)
    .order("is_cover", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  const media = data.map((row) => mapPdfMedia(row as MediaAssetRow));

  return getMediaSignedUrls(media);
}