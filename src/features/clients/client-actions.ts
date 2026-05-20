"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Client } from "@/types/database";

export async function getClients(): Promise<Client[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select(
      "id, name, phone, email, site_address, notes, status, created_at, updated_at, archived_at"
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((client) => ({
    id: client.id,
    name: client.name,
    phone: client.phone,
    email: client.email,
    siteAddress: client.site_address,
    notes: client.notes,
    status: client.status,
    createdAt: client.created_at,
    updatedAt: client.updated_at,
    archivedAt: client.archived_at,
  }));
}

export async function getClientById(id: string): Promise<Client | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select(
      "id, name, phone, email, site_address, notes, status, created_at, updated_at, archived_at"
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    phone: data.phone,
    email: data.email,
    siteAddress: data.site_address,
    notes: data.notes,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    archivedAt: data.archived_at,
  };
}

export async function createClientRecord(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const siteAddress = String(formData.get("siteAddress") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!name) {
    return {
      error: "Client name is required.",
    };
  }

  const { error } = await supabase.from("clients").insert({
    name,
    phone: phone || null,
    email: email || null,
    site_address: siteAddress || null,
    notes: notes || null,
    status: "lead",
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/clients");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function updateClientRecord(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const siteAddress = String(formData.get("siteAddress") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!name) {
    return {
      error: "Client name is required.",
    };
  }

  const { error } = await supabase
    .from("clients")
    .update({
      name,
      phone: phone || null,
      email: email || null,
      site_address: siteAddress || null,
      notes: notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/clients");
  revalidatePath(`/clients/${id}`);

  return {
    success: true,
  };
}

export async function updateClientStatus(
  id: string,
  status: "lead" | "active" | "archived",
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("clients")
    .update({
      status,
      archived_at: status === "archived" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/clients");
  revalidatePath(`/clients/${id}`);
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}