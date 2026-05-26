"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ChangeOrder } from "@/types/database";

type ChangeOrderRow = {
  id: string;
  quote_id: string;
  change_order_number: string;
  title: string;
  description: string | null;
  status: string;
  subtotal: number;
  tax_total: number;
  grand_total: number;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
};

function mapChangeOrderRow(row: ChangeOrderRow): ChangeOrder {
  return {
    id: row.id,
    quoteId: row.quote_id,
    changeOrderNumber: row.change_order_number,
    title: row.title,
    description: row.description,
    status: row.status,
    subtotal: Number(row.subtotal),
    taxTotal: Number(row.tax_total),
    grandTotal: Number(row.grand_total),
    approvedAt: row.approved_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function getNextChangeOrderNumber(quoteId: string) {
  const supabase = await createClient();

  const { count } = await supabase
    .from("change_orders")
    .select("*", { count: "exact", head: true })
    .eq("quote_id", quoteId);

  const nextNumber = (count ?? 0) + 1;

  return `CO-${String(nextNumber).padStart(3, "0")}`;
}

export async function getChangeOrdersByQuoteId(
  quoteId: string,
): Promise<ChangeOrder[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("change_orders")
    .select(
      "id, quote_id, change_order_number, title, description, status, subtotal, tax_total, grand_total, approved_at, created_at, updated_at",
    )
    .eq("quote_id", quoteId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((row) => mapChangeOrderRow(row as ChangeOrderRow));
}

export async function createChangeOrder(
  quoteId: string,
  formData: FormData,
) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  const subtotalValue = Number(formData.get("subtotal") ?? 0);
  const taxTotalValue = Number(formData.get("taxTotal") ?? 0);

  const subtotal = Number.isFinite(subtotalValue) ? subtotalValue : 0;
  const taxTotal = Number.isFinite(taxTotalValue) ? taxTotalValue : 0;
  const grandTotal = subtotal + taxTotal;

  if (!title) {
    return {
      error: "Change order title is required.",
    };
  }

  const changeOrderNumber = await getNextChangeOrderNumber(quoteId);

  const { error } = await supabase.from("change_orders").insert({
    quote_id: quoteId,
    change_order_number: changeOrderNumber,
    title,
    description: description || null,
    status: "draft",
    subtotal,
    tax_total: taxTotal,
    grand_total: grandTotal,
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

export async function approveChangeOrder(
  changeOrderId: string,
  quoteId: string,
) {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from("change_orders")
    .update({
      status: "approved",
      approved_at: now,
      updated_at: now,
    })
    .eq("id", changeOrderId)
    .eq("quote_id", quoteId)
    .neq("status", "approved");

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

export async function deleteChangeOrder(
  changeOrderId: string,
  quoteId: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("change_orders")
    .delete()
    .eq("id", changeOrderId)
    .eq("quote_id", quoteId)
    .eq("status", "draft");

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