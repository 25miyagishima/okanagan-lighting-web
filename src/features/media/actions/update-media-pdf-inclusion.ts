"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateMediaPdfInclusion(
  mediaId: string,
  includeInPdf: boolean,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("media_assets")
    .update({
      include_in_pdf: includeInPdf,
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