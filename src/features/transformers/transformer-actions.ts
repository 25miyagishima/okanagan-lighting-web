"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Transformer } from "@/types/database";
import { ensureQuoteEditable } from "@/features/quotes/quote-actions";

type TransformerRow = {
  id: string;
  quote_id: string;
  name: string;
  capacity_watts: number;
  voltage: number;
  max_recommended_load_watts: number;
  location_note: string | null;
  created_at: string;
  updated_at: string;
};

function mapTransformerRow(row: TransformerRow): Transformer {
  return {
    id: row.id,
    quoteId: row.quote_id,
    name: row.name,
    capacityWatts: Number(row.capacity_watts),
    voltage: Number(row.voltage),
    maxRecommendedLoadWatts: Number(row.max_recommended_load_watts),
    locationNote: row.location_note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function calculateRecommendedLoad(capacityWatts: number) {
  return capacityWatts * 0.8;
}

export async function getTransformersByQuoteId(
  quoteId: string,
): Promise<Transformer[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transformers")
    .select(
      `
        id,
        quote_id,
        name,
        capacity_watts,
        voltage,
        max_recommended_load_watts,
        location_note,
        created_at,
        updated_at
      `,
    )
    .eq("quote_id", quoteId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((row) => mapTransformerRow(row as TransformerRow));
}

export async function createTransformer(
  quoteId: string,
  formData: FormData,
) {
  const editableCheck = await ensureQuoteEditable(quoteId);

  if (!editableCheck.editable) {
    return {
      error:
        editableCheck.error ??
        "This quote is locked. Create a revision before adding transformers.",
    };
  }

  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const capacityWatts = Number(formData.get("capacityWatts") ?? 300);
  const voltage = Number(formData.get("voltage") ?? 12);
  const locationNote = String(formData.get("locationNote") ?? "").trim();

  if (!name) {
    return {
      error: "Transformer name is required.",
    };
  }

  const recommendedLoad = calculateRecommendedLoad(capacityWatts);

  const { error } = await supabase.from("transformers").insert({
    quote_id: quoteId,
    name,
    capacity_watts: Number.isFinite(capacityWatts) ? capacityWatts : 300,
    voltage: Number.isFinite(voltage) ? voltage : 12,
    max_recommended_load_watts: Number.isFinite(recommendedLoad)
      ? recommendedLoad
      : calculateRecommendedLoad(300),
    location_note: locationNote || null,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath(`/quotes/${quoteId}`);

  return {
    success: true,
  };
}

export async function deleteTransformer(
  transformerId: string,
  quoteId: string,
) {
  const editableCheck = await ensureQuoteEditable(quoteId);

  if (!editableCheck.editable) {
    return {
      error:
        editableCheck.error ??
        "This quote is locked. Create a revision before deleting transformers.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("transformers")
    .delete()
    .eq("id", transformerId)
    .eq("quote_id", quoteId);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath(`/quotes/${quoteId}`);

  return {
    success: true,
  };
}