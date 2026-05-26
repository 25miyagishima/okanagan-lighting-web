"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Zone } from "@/types/database";
import { ensureQuoteEditable } from "@/features/quotes/quote-actions";

type ZoneRow = {
  id: string;
  quote_id: string;
  name: string;
  sort_order: number;
  wire_length_feet: number;
  selected_wire_catalog_item_id: string | null;
  transformer_id: string | null;
  transformer_assignment_note: string | null;
  labour_hours: number;
  hourly_rate: number;
  client_notes: string | null;
  internal_notes: string | null;
  collapsed: boolean;
  created_at: string;
  updated_at: string;
};

const zoneSelect =
  "id, quote_id, name, sort_order, wire_length_feet, selected_wire_catalog_item_id, transformer_id, transformer_assignment_note, labour_hours, hourly_rate, client_notes, internal_notes, collapsed, created_at, updated_at";

function mapZoneRow(row: ZoneRow): Zone {
  return {
    id: row.id,
    quoteId: row.quote_id,
    name: row.name,
    sortOrder: row.sort_order,
    wireLengthFeet: Number(row.wire_length_feet),
    selectedWireCatalogItemId: row.selected_wire_catalog_item_id,
    transformerId: row.transformer_id,
    transformerAssignmentNote: row.transformer_assignment_note,
    labourHours: Number(row.labour_hours),
    hourlyRate: Number(row.hourly_rate),
    clientNotes: row.client_notes,
    internalNotes: row.internal_notes,
    collapsed: row.collapsed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getZonesByQuoteId(quoteId: string): Promise<Zone[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("zones")
    .select(zoneSelect)
    .eq("quote_id", quoteId)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((row) => mapZoneRow(row as ZoneRow));
}

export async function createZone(quoteId: string, formData: FormData) {
  const editableCheck = await ensureQuoteEditable(quoteId);

  if (!editableCheck.editable) {
    return {
      error:
        editableCheck.error ??
        "This quote is locked. Create a revision before adding zones.",
    };
  }

  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const wireLengthFeet = Number(formData.get("wireLengthFeet") ?? 0);
  const labourHours = Number(formData.get("labourHours") ?? 0);
  const hourlyRate = Number(formData.get("hourlyRate") ?? 100);
  const transformerAssignmentNote = String(
    formData.get("transformerAssignmentNote") ?? "",
  ).trim();
  const clientNotes = String(formData.get("clientNotes") ?? "").trim();
  const internalNotes = String(formData.get("internalNotes") ?? "").trim();

  if (!name) {
    return {
      error: "Zone name is required.",
    };
  }

  const { count } = await supabase
    .from("zones")
    .select("*", { count: "exact", head: true })
    .eq("quote_id", quoteId);

  const { error } = await supabase.from("zones").insert({
    quote_id: quoteId,
    name,
    sort_order: count ?? 0,
    wire_length_feet: Number.isFinite(wireLengthFeet) ? wireLengthFeet : 0,
    labour_hours: Number.isFinite(labourHours) ? labourHours : 0,
    hourly_rate: Number.isFinite(hourlyRate) ? hourlyRate : 100,
    transformer_assignment_note: transformerAssignmentNote || null,
    client_notes: clientNotes || null,
    internal_notes: internalNotes || null,
    collapsed: true,
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

export async function updateZone(
  zoneId: string,
  quoteId: string,
  formData: FormData,
) {
  const editableCheck = await ensureQuoteEditable(quoteId);

  if (!editableCheck.editable) {
    return {
      error:
        editableCheck.error ??
        "This quote is locked. Create a revision before editing zones.",
    };
  }

  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const wireLengthFeet = Number(formData.get("wireLengthFeet") ?? 0);
  const labourHours = Number(formData.get("labourHours") ?? 0);
  const hourlyRate = Number(formData.get("hourlyRate") ?? 100);
  const transformerAssignmentNote = String(
    formData.get("transformerAssignmentNote") ?? "",
  ).trim();
  const clientNotes = String(formData.get("clientNotes") ?? "").trim();
  const internalNotes = String(formData.get("internalNotes") ?? "").trim();

  if (!name) {
    return {
      error: "Zone name is required.",
    };
  }

  const { error } = await supabase
    .from("zones")
    .update({
      name,
      wire_length_feet: Number.isFinite(wireLengthFeet) ? wireLengthFeet : 0,
      labour_hours: Number.isFinite(labourHours) ? labourHours : 0,
      hourly_rate: Number.isFinite(hourlyRate) ? hourlyRate : 100,
      transformer_assignment_note: transformerAssignmentNote || null,
      client_notes: clientNotes || null,
      internal_notes: internalNotes || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", zoneId)
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

export async function assignZoneTransformer(
  zoneId: string,
  quoteId: string,
  formData: FormData,
) {
  const editableCheck = await ensureQuoteEditable(quoteId);

  if (!editableCheck.editable) {
    return {
      error:
        editableCheck.error ??
        "This quote is locked. Create a revision before changing transformer assignments.",
    };
  }

  const supabase = await createClient();

  const transformerIdValue = String(
    formData.get("transformerId") ?? "",
  ).trim();

  const transformerId =
    transformerIdValue === "none" || transformerIdValue === ""
      ? null
      : transformerIdValue;

  const { error } = await supabase
    .from("zones")
    .update({
      transformer_id: transformerId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", zoneId)
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

export async function deleteZone(zoneId: string, quoteId: string) {
  const editableCheck = await ensureQuoteEditable(quoteId);

  if (!editableCheck.editable) {
    return {
      error:
        editableCheck.error ??
        "This quote is locked. Create a revision before deleting zones.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("zones")
    .delete()
    .eq("id", zoneId)
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