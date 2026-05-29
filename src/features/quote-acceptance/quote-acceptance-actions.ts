"use server";

import { revalidatePath } from "next/cache";

import { createJobFromQuote } from "@/features/jobs/job-actions";
import { createClient } from "@/lib/supabase/server";
import type { QuoteAcceptance } from "@/types/database";

type QuoteAcceptanceRow = {
  id: string;
  quote_id: string;
  accepted_by_name: string;
  accepted_by_email: string | null;
  accepted_at: string;
  client_signature: string | null;
  acceptance_notes: string | null;
  deposit_acknowledged: boolean;
  terms_acknowledged: boolean;
  created_at: string;
};

function mapQuoteAcceptanceRow(row: QuoteAcceptanceRow): QuoteAcceptance {
  return {
    id: row.id,
    quoteId: row.quote_id,
    acceptedByName: row.accepted_by_name,
    acceptedByEmail: row.accepted_by_email,
    acceptedAt: row.accepted_at,
    clientSignature: row.client_signature,
    acceptanceNotes: row.acceptance_notes,
    depositAcknowledged: row.deposit_acknowledged,
    termsAcknowledged: row.terms_acknowledged,
    createdAt: row.created_at,
  };
}

export async function getQuoteAcceptanceByQuoteId(
  quoteId: string,
): Promise<QuoteAcceptance | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quote_acceptances")
    .select(
      "id, quote_id, accepted_by_name, accepted_by_email, accepted_at, client_signature, acceptance_notes, deposit_acknowledged, terms_acknowledged, created_at",
    )
    .eq("quote_id", quoteId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapQuoteAcceptanceRow(data as QuoteAcceptanceRow);
}

export async function acceptQuote(
  quoteId: string,
  formData: FormData,
) {
  const supabase = await createClient();

  const acceptedByName = String(
    formData.get("acceptedByName") ?? "",
  ).trim();

  const acceptedByEmail = String(
    formData.get("acceptedByEmail") ?? "",
  ).trim();

  const clientSignature = String(
    formData.get("clientSignature") ?? "",
  ).trim();

  const acceptanceNotes = String(
    formData.get("acceptanceNotes") ?? "",
  ).trim();

  const depositAcknowledged =
    formData.get("depositAcknowledged") === "on";

  const termsAcknowledged =
    formData.get("termsAcknowledged") === "on";

  if (!acceptedByName) {
    return {
      error: "Accepted by name is required.",
    };
  }

  if (!depositAcknowledged || !termsAcknowledged) {
    return {
      error:
        "Deposit and terms acknowledgements are required before accepting.",
    };
  }

  const existingAcceptance =
    await getQuoteAcceptanceByQuoteId(quoteId);

  if (existingAcceptance) {
    return {
      error: "This quote has already been accepted.",
    };
  }

  const now = new Date().toISOString();

  const { error: acceptanceError } = await supabase
    .from("quote_acceptances")
    .insert({
      quote_id: quoteId,
      accepted_by_name: acceptedByName,
      accepted_by_email: acceptedByEmail || null,
      accepted_at: now,
      client_signature: clientSignature || null,
      acceptance_notes: acceptanceNotes || null,
      deposit_acknowledged: depositAcknowledged,
      terms_acknowledged: termsAcknowledged,
    });

  if (acceptanceError) {
    return {
      error: acceptanceError.message,
    };
  }

  const { error: quoteError } = await supabase
    .from("quotes")
    .update({
      status: "approved",
      approved_at: now,
      locked_at: now,
      updated_at: now,
    })
    .eq("id", quoteId);

  if (quoteError) {
    return {
      error: quoteError.message,
    };
  }

  const jobResult = await createJobFromQuote(quoteId);

  if ("error" in jobResult) {
    return {
      error: jobResult.error,
    };
  }

  revalidatePath("/quotes");
  revalidatePath(`/quotes/${quoteId}`);
  revalidatePath("/jobs");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}