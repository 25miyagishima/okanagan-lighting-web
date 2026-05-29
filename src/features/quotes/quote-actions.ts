"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Quote } from "@/types/database";
import { createJobFromQuote } from "@/features/jobs/job-actions";
import type {
  CatalogUnitType,
  DepositType,
  DiscountType,
  QuoteItemGroup,
  QuoteStatus,
  QuoteType,
} from "@/types/app";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

type QuoteRow = {
  id: string;
  client_id: string;
  quote_number: string;
  revision_number: number;
  quote_type: QuoteType;
  status: QuoteStatus;
  scope: string;
  discount_type: DiscountType;
  discount_value: number;
  deposit_type: DepositType;
  deposit_value: number;
  quote_level_labour_hours: number;
  quote_level_hourly_rate: number;
  client_notes: string | null;
  internal_notes: string | null;
  sent_at: string | null;
  approved_at: string | null;
  locked_at: string | null;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
};

type TransformerCloneRow = {
  id: string;
  name: string;
  capacity_watts: number;
  voltage: number;
  max_recommended_load_watts: number;
  location_note: string | null;
};

type ZoneCloneRow = {
  id: string;
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
};

type QuoteItemCloneRow = {
  id: string;
  zone_id: string | null;
  catalog_item_id: string | null;
  quantity: number;
  name_snapshot: string;
  brand_snapshot: string | null;
  supplier_snapshot: string | null;
  supplier_link_snapshot: string | null;
  sku_or_asin_snapshot: string | null;
  cost_snapshot: number;
  wattage_snapshot: number;
  markup_percent_snapshot: number;
  sell_price_snapshot: number;
  category_snapshot: string;
  quote_group_snapshot: QuoteItemGroup;
  pack_quantity_snapshot: number;
  unit_type_snapshot: CatalogUnitType;
  taxable_snapshot: boolean;
  notes: string | null;
};

export type QuoteWithClient = Quote & {
  clientName: string;
  clientSiteAddress: string | null;
};

export type RevisionComparisonChange = {
  label: string;
  previousValue: string;
  currentValue: string;
  changed: boolean;
};

export type RevisionComparison = {
  current: QuoteWithClient;
  previous: QuoteWithClient | null;
  changes: RevisionComparisonChange[];
};

const editableQuoteStatuses: QuoteStatus[] = ["draft", "sent"];

function mapQuoteRow(row: QuoteRow): Quote {
  return {
    id: row.id,
    clientId: row.client_id,
    quoteNumber: row.quote_number,
    revisionNumber: row.revision_number,
    quoteType: row.quote_type,
    status: row.status,
    scope: row.scope,
    discountType: row.discount_type,
    discountValue: Number(row.discount_value),
    depositType: row.deposit_type,
    depositValue: Number(row.deposit_value),
    quoteLevelLabourHours: Number(row.quote_level_labour_hours),
    quoteLevelHourlyRate: Number(row.quote_level_hourly_rate),
    clientNotes: row.client_notes,
    internalNotes: row.internal_notes,
    sentAt: row.sent_at,
    approvedAt: row.approved_at,
    lockedAt: row.locked_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    archivedAt: row.archived_at,
  };
}

function formatComparisonValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "None";
  }

  return String(value);
}

function buildComparisonChange(
  label: string,
  previousValue: string | number | null | undefined,
  currentValue: string | number | null | undefined,
): RevisionComparisonChange {
  const previousFormatted = formatComparisonValue(previousValue);
  const currentFormatted = formatComparisonValue(currentValue);

  return {
    label,
    previousValue: previousFormatted,
    currentValue: currentFormatted,
    changed: previousFormatted !== currentFormatted,
  };
}

export async function ensureQuoteEditable(quoteId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quotes")
    .select("status")
    .eq("id", quoteId)
    .single();

  if (error || !data) {
    return {
      editable: false,
      error: "Quote not found.",
    };
  }

  const status = data.status as QuoteStatus;

  if (!editableQuoteStatuses.includes(status)) {
    return {
      editable: false,
      status,
      error:
        "This quote is locked. Create a revision before making further changes.",
    };
  }

  return {
    editable: true,
    status,
  };
}

async function getNextQuoteNumber() {
  const supabase = await createClient();

  const { count } = await supabase
    .from("quotes")
    .select("*", { count: "exact", head: true });

  const nextNumber = 1001 + (count ?? 0);

  return `Q-${nextNumber}`;
}

function getQuoteFormValues(formData: FormData) {
  const clientId = String(formData.get("clientId") ?? "").trim();
  const quoteType = String(formData.get("quoteType") ?? "outdoor") as QuoteType;
  const scope = String(formData.get("scope") ?? "").trim();
  const discountType = String(
    formData.get("discountType") ?? "none",
  ) as DiscountType;
  const depositType = String(
    formData.get("depositType") ?? "none",
  ) as DepositType;
  const clientNotes = String(formData.get("clientNotes") ?? "").trim();
  const internalNotes = String(formData.get("internalNotes") ?? "").trim();

  const discountValue = Number(formData.get("discountValue") ?? 0);
  const depositValue = Number(formData.get("depositValue") ?? 0);
  const quoteLevelLabourHours = Number(
    formData.get("quoteLevelLabourHours") ?? 0,
  );
  const quoteLevelHourlyRate = Number(
    formData.get("quoteLevelHourlyRate") ?? 100,
  );

  return {
    clientId,
    quoteType,
    scope,
    discountType,
    discountValue: Number.isFinite(discountValue) ? discountValue : 0,
    depositType,
    depositValue: Number.isFinite(depositValue) ? depositValue : 0,
    quoteLevelLabourHours: Number.isFinite(quoteLevelLabourHours)
      ? quoteLevelLabourHours
      : 0,
    quoteLevelHourlyRate: Number.isFinite(quoteLevelHourlyRate)
      ? quoteLevelHourlyRate
      : 100,
    clientNotes,
    internalNotes,
  };
}

async function cloneQuoteContents(
  supabase: SupabaseClient,
  sourceQuoteId: string,
  newQuoteId: string,
) {
  const transformerIdMap = new Map<string, string>();
  const zoneIdMap = new Map<string, string>();

  const { data: transformers, error: transformerFetchError } = await supabase
    .from("transformers")
    .select(
      "id, name, capacity_watts, voltage, max_recommended_load_watts, location_note",
    )
    .eq("quote_id", sourceQuoteId)
    .order("created_at", { ascending: true });

  if (transformerFetchError) {
    return {
      error: transformerFetchError.message,
    };
  }

  for (const transformer of (transformers ?? []) as TransformerCloneRow[]) {
    const { data: newTransformer, error } = await supabase
      .from("transformers")
      .insert({
        quote_id: newQuoteId,
        name: transformer.name,
        capacity_watts: transformer.capacity_watts,
        voltage: transformer.voltage,
        max_recommended_load_watts: transformer.max_recommended_load_watts,
        location_note: transformer.location_note,
      })
      .select("id")
      .single();

    if (error || !newTransformer) {
      return {
        error: error?.message ?? "Could not duplicate transformer.",
      };
    }

    transformerIdMap.set(transformer.id, newTransformer.id);
  }

  const { data: zones, error: zoneFetchError } = await supabase
    .from("zones")
    .select(
      "id, name, sort_order, wire_length_feet, selected_wire_catalog_item_id, transformer_id, transformer_assignment_note, labour_hours, hourly_rate, client_notes, internal_notes, collapsed",
    )
    .eq("quote_id", sourceQuoteId)
    .order("sort_order", { ascending: true });

  if (zoneFetchError) {
    return {
      error: zoneFetchError.message,
    };
  }

  for (const zone of (zones ?? []) as ZoneCloneRow[]) {
    const remappedTransformerId = zone.transformer_id
      ? transformerIdMap.get(zone.transformer_id) ?? null
      : null;

    const { data: newZone, error } = await supabase
      .from("zones")
      .insert({
        quote_id: newQuoteId,
        name: zone.name,
        sort_order: zone.sort_order,
        wire_length_feet: zone.wire_length_feet,
        selected_wire_catalog_item_id: zone.selected_wire_catalog_item_id,
        transformer_id: remappedTransformerId,
        transformer_assignment_note: zone.transformer_assignment_note,
        labour_hours: zone.labour_hours,
        hourly_rate: zone.hourly_rate,
        client_notes: zone.client_notes,
        internal_notes: zone.internal_notes,
        collapsed: zone.collapsed,
      })
      .select("id")
      .single();

    if (error || !newZone) {
      return {
        error: error?.message ?? "Could not duplicate zone.",
      };
    }

    zoneIdMap.set(zone.id, newZone.id);
  }

  const { data: quoteItems, error: quoteItemFetchError } = await supabase
    .from("quote_items")
    .select(
      "id, zone_id, catalog_item_id, quantity, name_snapshot, brand_snapshot, supplier_snapshot, supplier_link_snapshot, sku_or_asin_snapshot, cost_snapshot, wattage_snapshot, markup_percent_snapshot, sell_price_snapshot, category_snapshot, quote_group_snapshot, pack_quantity_snapshot, unit_type_snapshot, taxable_snapshot, notes",
    )
    .eq("quote_id", sourceQuoteId)
    .order("created_at", { ascending: true });

  if (quoteItemFetchError) {
    return {
      error: quoteItemFetchError.message,
    };
  }

  const quoteItemsToInsert = ((quoteItems ?? []) as QuoteItemCloneRow[]).map(
    (item) => ({
      quote_id: newQuoteId,
      zone_id: item.zone_id ? zoneIdMap.get(item.zone_id) ?? null : null,
      catalog_item_id: item.catalog_item_id,
      quantity: item.quantity,
      name_snapshot: item.name_snapshot,
      brand_snapshot: item.brand_snapshot,
      supplier_snapshot: item.supplier_snapshot,
      supplier_link_snapshot: item.supplier_link_snapshot,
      sku_or_asin_snapshot: item.sku_or_asin_snapshot,
      cost_snapshot: item.cost_snapshot,
      wattage_snapshot: item.wattage_snapshot,
      markup_percent_snapshot: item.markup_percent_snapshot,
      sell_price_snapshot: item.sell_price_snapshot,
      category_snapshot: item.category_snapshot,
      quote_group_snapshot: item.quote_group_snapshot,
      pack_quantity_snapshot: item.pack_quantity_snapshot,
      unit_type_snapshot: item.unit_type_snapshot,
      taxable_snapshot: item.taxable_snapshot,
      notes: item.notes,
    }),
  );

  if (quoteItemsToInsert.length > 0) {
    const { error } = await supabase
      .from("quote_items")
      .insert(quoteItemsToInsert);

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

export async function getQuotes(): Promise<QuoteWithClient[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quotes")
    .select(
      `
      id,
      client_id,
      quote_number,
      revision_number,
      quote_type,
      status,
      scope,
      discount_type,
      discount_value,
      deposit_type,
      deposit_value,
      quote_level_labour_hours,
      quote_level_hourly_rate,
      client_notes,
      internal_notes,
      sent_at,
      approved_at,
      locked_at,
      created_at,
      updated_at,
      archived_at,
      clients (
        name,
        site_address
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((row) => {
    const quote = mapQuoteRow(row as unknown as QuoteRow);
    const client = Array.isArray(row.clients) ? row.clients[0] : row.clients;

    return {
      ...quote,
      clientName: client?.name ?? "Unknown client",
      clientSiteAddress: client?.site_address ?? null,
    };
  });
}

export async function getQuoteById(id: string): Promise<QuoteWithClient | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quotes")
    .select(
      `
      id,
      client_id,
      quote_number,
      revision_number,
      quote_type,
      status,
      scope,
      discount_type,
      discount_value,
      deposit_type,
      deposit_value,
      quote_level_labour_hours,
      quote_level_hourly_rate,
      client_notes,
      internal_notes,
      sent_at,
      approved_at,
      locked_at,
      created_at,
      updated_at,
      archived_at,
      clients (
        name,
        site_address
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  const quote = mapQuoteRow(data as unknown as QuoteRow);
  const client = Array.isArray(data.clients) ? data.clients[0] : data.clients;

  return {
    ...quote,
    clientName: client?.name ?? "Unknown client",
    clientSiteAddress: client?.site_address ?? null,
  };
}

export async function getQuoteRevisions(
  quoteNumber: string,
): Promise<QuoteWithClient[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quotes")
    .select(
      `
      id,
      client_id,
      quote_number,
      revision_number,
      quote_type,
      status,
      scope,
      discount_type,
      discount_value,
      deposit_type,
      deposit_value,
      quote_level_labour_hours,
      quote_level_hourly_rate,
      client_notes,
      internal_notes,
      sent_at,
      approved_at,
      locked_at,
      created_at,
      updated_at,
      archived_at,
      clients (
        name,
        site_address
      )
    `,
    )
    .eq("quote_number", quoteNumber)
    .order("revision_number", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((row) => {
    const quote = mapQuoteRow(row as unknown as QuoteRow);

    const client = Array.isArray(row.clients)
      ? row.clients[0]
      : row.clients;

    return {
      ...quote,
      clientName: client?.name ?? "Unknown client",
      clientSiteAddress: client?.site_address ?? null,
    };
  });
}

export async function getRevisionComparison(
  currentQuoteId: string,
): Promise<RevisionComparison | null> {
  const current = await getQuoteById(currentQuoteId);

  if (!current) {
    return null;
  }

  const revisions = await getQuoteRevisions(current.quoteNumber);

  const previous =
    revisions
      .filter(
        (revision) =>
          revision.revisionNumber < current.revisionNumber,
      )
      .sort(
        (a, b) =>
          b.revisionNumber - a.revisionNumber,
      )[0] ?? null;

  const changes: RevisionComparisonChange[] = previous
    ? [
        buildComparisonChange(
          "Status",
          previous.status,
          current.status,
        ),
        buildComparisonChange(
          "Quote Type",
          previous.quoteType,
          current.quoteType,
        ),
        buildComparisonChange(
          "Scope",
          previous.scope,
          current.scope,
        ),
        buildComparisonChange(
          "Discount Type",
          previous.discountType,
          current.discountType,
        ),
        buildComparisonChange(
          "Discount Value",
          previous.discountValue,
          current.discountValue,
        ),
        buildComparisonChange(
          "Deposit Type",
          previous.depositType,
          current.depositType,
        ),
        buildComparisonChange(
          "Deposit Value",
          previous.depositValue,
          current.depositValue,
        ),
        buildComparisonChange(
          "Quote Labour Hours",
          previous.quoteLevelLabourHours,
          current.quoteLevelLabourHours,
        ),
        buildComparisonChange(
          "Quote Hourly Rate",
          previous.quoteLevelHourlyRate,
          current.quoteLevelHourlyRate,
        ),
        buildComparisonChange(
          "Client Notes",
          previous.clientNotes,
          current.clientNotes,
        ),
        buildComparisonChange(
          "Internal Notes",
          previous.internalNotes,
          current.internalNotes,
        ),
      ]
    : [];

  return {
    current,
    previous,
    changes,
  };
}

export async function createQuote(formData: FormData) {
  const supabase = await createClient();
  const values = getQuoteFormValues(formData);

  if (!values.clientId) {
    return {
      error: "Client is required.",
    };
  }

  const quoteNumber = await getNextQuoteNumber();

  const { data, error } = await supabase
    .from("quotes")
    .insert({
      client_id: values.clientId,
      quote_number: quoteNumber,
      revision_number: 0,
      quote_type: values.quoteType,
      status: "draft",
      scope: values.scope,
      discount_type: values.discountType,
      discount_value: values.discountValue,
      deposit_type: values.depositType,
      deposit_value: values.depositValue,
      quote_level_labour_hours: values.quoteLevelLabourHours,
      quote_level_hourly_rate: values.quoteLevelHourlyRate,
      client_notes: values.clientNotes || null,
      internal_notes: values.internalNotes || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    return {
      error: error?.message ?? "Could not create quote.",
    };
  }

  revalidatePath("/quotes");
  revalidatePath("/dashboard");
  revalidatePath(`/clients/${values.clientId}`);

  redirect(`/quotes/${data.id}`);
}

export async function updateQuote(id: string, formData: FormData) {
  const editableCheck = await ensureQuoteEditable(id);

  if (!editableCheck.editable) {
    return {
      error:
        editableCheck.error ??
        "This quote is locked. Create a revision before editing.",
    };
  }

  const supabase = await createClient();
  const values = getQuoteFormValues(formData);

  const { error } = await supabase
    .from("quotes")
    .update({
      quote_type: values.quoteType,
      scope: values.scope,
      discount_type: values.discountType,
      discount_value: values.discountValue,
      deposit_type: values.depositType,
      deposit_value: values.depositValue,
      quote_level_labour_hours: values.quoteLevelLabourHours,
      quote_level_hourly_rate: values.quoteLevelHourlyRate,
      client_notes: values.clientNotes || null,
      internal_notes: values.internalNotes || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .in("status", editableQuoteStatuses);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/quotes");
  revalidatePath(`/quotes/${id}`);

  return {
    success: true,
  };
}

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const updates: Partial<QuoteRow> & {
    updated_at: string;
  } = {
    status,
    updated_at: now,
  };

  if (status === "sent") {
    updates.sent_at = now;
  }

  if (status === "approved") {
    updates.approved_at = now;
    updates.locked_at = now;
  }

  if (
    status === "scheduled" ||
    status === "installed" ||
    status === "invoiced" ||
    status === "paid" ||
    status === "archived"
  ) {
    updates.locked_at = now;
  }

  const { error } = await supabase
    .from("quotes")
    .update(updates)
    .eq("id", id);

  if (error) {
    return {
      error: error.message,
    };
  }

  if (status === "approved") {
    const jobResult = await createJobFromQuote(id);

    if ("error" in jobResult) {
      return {
        error: jobResult.error,
      };
    }
  }

  revalidatePath("/quotes");
  revalidatePath(`/quotes/${id}`);
  revalidatePath("/dashboard");
  revalidatePath("/jobs");

  return {
    success: true,
  };
}

export async function duplicateQuote(id: string) {
  const supabase = await createClient();
  const originalQuote = await getQuoteById(id);

  if (!originalQuote) {
    return {
      error: "Quote not found.",
    };
  }

  const newQuoteNumber = await getNextQuoteNumber();

  const { data, error } = await supabase
    .from("quotes")
    .insert({
      client_id: originalQuote.clientId,
      quote_number: newQuoteNumber,
      revision_number: 0,
      quote_type: originalQuote.quoteType,
      status: "draft",
      scope: originalQuote.scope,
      discount_type: originalQuote.discountType,
      discount_value: originalQuote.discountValue,
      deposit_type: originalQuote.depositType,
      deposit_value: originalQuote.depositValue,
      quote_level_labour_hours: originalQuote.quoteLevelLabourHours,
      quote_level_hourly_rate: originalQuote.quoteLevelHourlyRate,
      client_notes: originalQuote.clientNotes,
      internal_notes: originalQuote.internalNotes,
    })
    .select("id")
    .single();

  if (error || !data) {
    return {
      error: error?.message ?? "Could not duplicate quote.",
    };
  }

  const cloneResult = await cloneQuoteContents(supabase, id, data.id);

  if (cloneResult.error) {
    return cloneResult;
  }

  revalidatePath("/quotes");
  revalidatePath("/dashboard");

  redirect(`/quotes/${data.id}`);
}

export async function createQuoteRevision(id: string) {
  const supabase = await createClient();
  const originalQuote = await getQuoteById(id);

  if (!originalQuote) {
    return {
      error: "Quote not found.",
    };
  }

  const { data, error } = await supabase
    .from("quotes")
    .insert({
      client_id: originalQuote.clientId,
      quote_number: originalQuote.quoteNumber,
      revision_number: originalQuote.revisionNumber + 1,
      quote_type: originalQuote.quoteType,
      status: "draft",
      scope: originalQuote.scope,
      discount_type: originalQuote.discountType,
      discount_value: originalQuote.discountValue,
      deposit_type: originalQuote.depositType,
      deposit_value: originalQuote.depositValue,
      quote_level_labour_hours: originalQuote.quoteLevelLabourHours,
      quote_level_hourly_rate: originalQuote.quoteLevelHourlyRate,
      client_notes: originalQuote.clientNotes,
      internal_notes: originalQuote.internalNotes,
    })
    .select("id")
    .single();

  if (error || !data) {
    return {
      error: error?.message ?? "Could not create revision.",
    };
  }

  const cloneResult = await cloneQuoteContents(supabase, id, data.id);

  if (cloneResult.error) {
    return cloneResult;
  }

  revalidatePath("/quotes");
  revalidatePath("/dashboard");

  redirect(`/quotes/${data.id}`);
}

export async function archiveQuote(id: string) {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from("quotes")
    .update({
      status: "archived",
      archived_at: now,
      locked_at: now,
      updated_at: now,
    })
    .eq("id", id);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/quotes");
  revalidatePath(`/quotes/${id}`);
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}