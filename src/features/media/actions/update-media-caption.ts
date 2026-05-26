"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateMediaCaption(
  mediaId: string,
  caption: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("media_assets")
    .update({
      caption: caption.trim() || null,
    })
    .eq("id", mediaId);

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: true,
  };
}