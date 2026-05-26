"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { InstallReadiness } from "@/types/database";

type InstallReadinessRow = {
  id: string;
  quote_id: string;
  materials_ready: boolean;
  transformers_ready: boolean;
  client_confirmed: boolean;
  site_access_confirmed: boolean;
  install_date_confirmed: boolean;
  crew_assigned: boolean;
  readiness_notes: string | null;
  ready_for_install: boolean;
  ready_at: string | null;
  created_at: string;
  updated_at: string;
};

function mapInstallReadinessRow(
  row: InstallReadinessRow,
): InstallReadiness {
  return {
    id: row.id,
    quoteId: row.quote_id,
    materialsReady: row.materials_ready,
    transformersReady: row.transformers_ready,
    clientConfirmed: row.client_confirmed,
    siteAccessConfirmed: row.site_access_confirmed,
    installDateConfirmed: row.install_date_confirmed,
    crewAssigned: row.crew_assigned,
    readinessNotes: row.readiness_notes,
    readyForInstall: row.ready_for_install,
    readyAt: row.ready_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function calculateReadyForInstall(values: {
  materialsReady: boolean;
  transformersReady: boolean;
  clientConfirmed: boolean;
  siteAccessConfirmed: boolean;
  installDateConfirmed: boolean;
  crewAssigned: boolean;
}) {
  return (
    values.materialsReady &&
    values.transformersReady &&
    values.clientConfirmed &&
    values.siteAccessConfirmed &&
    values.installDateConfirmed &&
    values.crewAssigned
  );
}

export async function getInstallReadinessByQuoteId(
  quoteId: string,
): Promise<InstallReadiness | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("install_readiness")
    .select(
      "id, quote_id, materials_ready, transformers_ready, client_confirmed, site_access_confirmed, install_date_confirmed, crew_assigned, readiness_notes, ready_for_install, ready_at, created_at, updated_at",
    )
    .eq("quote_id", quoteId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapInstallReadinessRow(data as InstallReadinessRow);
}

export async function upsertInstallReadiness(
  quoteId: string,
  formData: FormData,
) {
  const supabase = await createClient();

  const materialsReady = formData.get("materialsReady") === "on";
  const transformersReady = formData.get("transformersReady") === "on";
  const clientConfirmed = formData.get("clientConfirmed") === "on";
  const siteAccessConfirmed =
    formData.get("siteAccessConfirmed") === "on";
  const installDateConfirmed =
    formData.get("installDateConfirmed") === "on";
  const crewAssigned = formData.get("crewAssigned") === "on";

  const readinessNotes = String(
    formData.get("readinessNotes") ?? "",
  ).trim();

  const readyForInstall = calculateReadyForInstall({
    materialsReady,
    transformersReady,
    clientConfirmed,
    siteAccessConfirmed,
    installDateConfirmed,
    crewAssigned,
  });

  const existingReadiness =
    await getInstallReadinessByQuoteId(quoteId);

  const now = new Date().toISOString();

  const payload = {
    quote_id: quoteId,
    materials_ready: materialsReady,
    transformers_ready: transformersReady,
    client_confirmed: clientConfirmed,
    site_access_confirmed: siteAccessConfirmed,
    install_date_confirmed: installDateConfirmed,
    crew_assigned: crewAssigned,
    readiness_notes: readinessNotes || null,
    ready_for_install: readyForInstall,
    ready_at:
      readyForInstall && !existingReadiness?.readyAt
        ? now
        : existingReadiness?.readyAt ?? null,
    updated_at: now,
  };

  const { error } = await supabase
    .from("install_readiness")
    .upsert(payload, {
      onConflict: "quote_id",
    });

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath(`/quotes/${quoteId}`);
  revalidatePath("/quotes");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}