"use server";

import { createClient } from "@/lib/supabase/server";
import { MEDIA_BUCKET } from "../media-config";

export async function deleteMedia(mediaId: string) {
  const supabase = await createClient();

  const { data: media, error: fetchError } = await supabase
    .from("media_assets")
    .select("file_path, thumbnail_path")
    .eq("id", mediaId)
    .single();

  if (fetchError || !media) {
    return {
      error: fetchError?.message || "Media item not found.",
    };
  }

  const pathsToDelete = [
    media.file_path,
    media.thumbnail_path,
  ].filter((path): path is string => Boolean(path));

  if (pathsToDelete.length > 0) {
    const { error: storageError } = await supabase.storage
      .from(MEDIA_BUCKET)
      .remove(pathsToDelete);

    if (storageError) {
      return {
        error: storageError.message,
      };
    }
  }

  const { error: deleteError } = await supabase
    .from("media_assets")
    .delete()
    .eq("id", mediaId);

  if (deleteError) {
    return {
      error: deleteError.message,
    };
  }

  return {
    success: true,
  };
}