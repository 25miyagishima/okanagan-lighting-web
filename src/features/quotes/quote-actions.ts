"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Quote } from "@/types/database";
import type {
  DepositType,
  DiscountType,
  QuoteStatus,
  QuoteType,
} from "@/types/app";

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

export type QuoteWithClient = Quote & {
  clientName: string;
  clientSiteAddress: string | null;
};

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
    .in("status", ["draft", "sent"]);

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

export async function archiveQuote(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("quotes")
    .update({
      status: "archived",
      archived_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .neq("status", "locked");

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