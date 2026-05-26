"use server";

import { createClient } from "@/lib/supabase/server";

type MediaOrderItem = {
  id: string;
  sortOrder: number;
};

export async function updateMediaOrder(items: MediaOrderItem[]) {
  const supabase = await createClient();

  for (const item of items) {
    const { error } = await supabase
      .from("media_assets")
      .update({
        sort_order: item.sortOrder,
      })
      .eq("id", item.id);

    if (error) {
      return {
        error: error.message,
      };
    }
  }

  return {
    success: true,
  };
}