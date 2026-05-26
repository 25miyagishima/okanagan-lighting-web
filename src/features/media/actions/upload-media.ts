"use server";

import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { MEDIA_BUCKET } from "../media-config";
import { buildMediaStoragePath } from "../media-storage-paths";
import { validateMediaFile } from "../media-validation";
import type {
  MediaAssetType,
  MediaOwnerType,
  MediaVisibility,
} from "../media-types";

type UploadMediaInput = {
  quoteId: string;
  zoneId?: string | null;
  ownerType: MediaOwnerType;
  assetType?: MediaAssetType;
  visibility?: MediaVisibility;
  caption?: string | null;
  includeInPdf?: boolean;
  file: File;
};

export async function uploadMedia({
  quoteId,
  zoneId = null,
  ownerType,
  assetType = "site-photo",
  visibility = "internal",
  caption = null,
  includeInPdf = false,
  file,
}: UploadMediaInput) {
  const validation = validateMediaFile(file);

  if (!validation.valid) {
    return {
      error: validation.error,
    };
  }

  const supabase = await createClient();

  const storagePath = buildMediaStoragePath({
    quoteId,
    zoneId,
    ownerType,
    fileName: file.name,
  });

  const { error: uploadError } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(storagePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return {
      error: uploadError.message,
    };
  }

  const { error: insertError } = await supabase
    .from("media_assets")
    .insert({
      id: randomUUID(),

      quote_id: quoteId,
      zone_id: zoneId,

      owner_type: ownerType,
      asset_type: assetType,
      visibility,

      file_path: storagePath,
      thumbnail_path: null,

      file_name: file.name,
      mime_type: file.type,
      file_size: file.size,

      caption,
      include_in_pdf: includeInPdf,
    });

  if (insertError) {
    return {
      error: insertError.message,
    };
  }

  return {
    success: true,
  };
}