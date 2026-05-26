"use server";

import { createClient } from "@/lib/supabase/server";
import { MEDIA_BUCKET } from "../media-config";
import type { MediaAsset } from "../media-types";

export type MediaAssetWithUrl = MediaAsset & {
  signedUrl: string | null;
};

export async function getMediaSignedUrls(
  media: MediaAsset[],
): Promise<MediaAssetWithUrl[]> {
  const supabase = await createClient();

  const results = await Promise.all(
    media.map(async (item) => {
      const { data, error } = await supabase.storage
        .from(MEDIA_BUCKET)
        .createSignedUrl(item.filePath, 60 * 60);

      return {
        ...item,
        signedUrl: error ? null : data.signedUrl,
      };
    }),
  );

  return results;
}