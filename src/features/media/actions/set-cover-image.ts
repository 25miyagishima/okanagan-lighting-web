"use server";

import { createClient } from "@/lib/supabase/server";

export async function setCoverImage(
  quoteId: string,
  mediaId: string,
) {
  const supabase = await createClient();

  const { error: resetError } = await supabase
    .from("media_assets")
    .update({
      is_cover: false,
    })
    .eq("quote_id", quoteId);

  if (resetError) {
    return {
      error: resetError.message,
    };
  }

  const { error: updateError } = await supabase
    .from("media_assets")
    .update({
      is_cover: true,
    })
    .eq("id", mediaId);

  if (updateError) {
    return {
      error: updateError.message,
    };
  }

  return {
    success: true,
  };
}