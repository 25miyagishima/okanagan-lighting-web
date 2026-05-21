"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { QuoteItem } from "@/types/database";
import type { CatalogUnitType, QuoteItemGroup } from "@/types/app";

type QuoteItemRow = {
  id: string;
  quote_id: string;
  zone_id: string | null;
  catalog_item_id: string | null;
  quantity: number;
  name_snapshot: string;
  brand_snapshot: string | null;
  supplier_snapshot: string | null;
  supplier_link_snapshot: string | null;
  sku_or_asin_snapshot: string | null;
  cost_snapshot: number;
  markup_percent_snapshot: number;
  sell_price_snapshot: number;
  category_snapshot: string;
  quote_group_snapshot: QuoteItemGroup;
  pack_quantity_snapshot: number;
  unit_type_snapshot: CatalogUnitType;
  taxable_snapshot: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type CatalogSnapshotRow = {
  id: string;
  name: string;
  brand: string | null;
  supplier: string | null;
  supplier_link: string | null;
  sku_or_asin: string | null;
  cost: number;
  markup_percent: number;
  category: string;
  quote_group: QuoteItemGroup;
  pack_quantity: number;
  unit_type: CatalogUnitType;
  taxable: boolean;
};

function calculateSellPrice(cost: number, markupPercent: number) {
  return cost + cost * (markupPercent / 100);
}

function mapQuoteItemRow(row: QuoteItemRow): QuoteItem {
  return {
    id: row.id,
    quoteId: row.quote_id,
    zoneId: row.zone_id,
    catalogItemId: row.catalog_item_id,
    quantity: Number(row.quantity),
    nameSnapshot: row.name_snapshot,
    brandSnapshot: row.brand_snapshot,
    supplierSnapshot: row.supplier_snapshot,
    supplierLinkSnapshot: row.supplier_link_snapshot,
    skuOrAsinSnapshot: row.sku_or_asin_snapshot,
    costSnapshot: Number(row.cost_snapshot),
    markupPercentSnapshot: Number(row.markup_percent_snapshot),
    sellPriceSnapshot: Number(row.sell_price_snapshot),
    categorySnapshot: row.category_snapshot,
    quoteGroupSnapshot: row.quote_group_snapshot,
    packQuantitySnapshot: Number(row.pack_quantity_snapshot),
    unitTypeSnapshot: row.unit_type_snapshot,
    taxableSnapshot: row.taxable_snapshot,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getQuoteItemsByQuoteId(
  quoteId: string,
): Promise<QuoteItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quote_items")
    .select(
      "id, quote_id, zone_id, catalog_item_id, quantity, name_snapshot, brand_snapshot, supplier_snapshot, supplier_link_snapshot, sku_or_asin_snapshot, cost_snapshot, markup_percent_snapshot, sell_price_snapshot, category_snapshot, quote_group_snapshot, pack_quantity_snapshot, unit_type_snapshot, taxable_snapshot, notes, created_at, updated_at",
    )
    .eq("quote_id", quoteId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((row) => mapQuoteItemRow(row as QuoteItemRow));
}

export async function addCatalogItemToZone(
  quoteId: string,
  zoneId: string,
  formData: FormData,
) {
  const supabase = await createClient();

  const catalogItemId = String(formData.get("catalogItemId") ?? "").trim();
  const quantityValue = Number(formData.get("quantity") ?? 1);
  const notes = String(formData.get("notes") ?? "").trim();

  const quantity =
    Number.isFinite(quantityValue) && quantityValue > 0 ? quantityValue : 1;

  if (!catalogItemId) {
    return {
      error: "Catalog item is required.",
    };
  }

  const { data: catalogItem, error: catalogError } = await supabase
    .from("catalog_items")
    .select(
      "id, name, brand, supplier, supplier_link, sku_or_asin, cost, markup_percent, category, quote_group, pack_quantity, unit_type, taxable",
    )
    .eq("id", catalogItemId)
    .eq("active", true)
    .single();

  if (catalogError || !catalogItem) {
    return {
      error: "Could not find active catalog item.",
    };
  }

  const item = catalogItem as CatalogSnapshotRow;
  const sellPrice = calculateSellPrice(
    Number(item.cost),
    Number(item.markup_percent),
  );

  const { error } = await supabase.from("quote_items").insert({
    quote_id: quoteId,
    zone_id: zoneId,
    catalog_item_id: item.id,
    quantity,
    name_snapshot: item.name,
    brand_snapshot: item.brand,
    supplier_snapshot: item.supplier,
    supplier_link_snapshot: item.supplier_link,
    sku_or_asin_snapshot: item.sku_or_asin,
    cost_snapshot: item.cost,
    markup_percent_snapshot: item.markup_percent,
    sell_price_snapshot: sellPrice,
    category_snapshot: item.category,
    quote_group_snapshot: item.quote_group,
    pack_quantity_snapshot: item.pack_quantity,
    unit_type_snapshot: item.unit_type,
    taxable_snapshot: item.taxable,
    notes: notes || null,
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

export async function removeQuoteItem(quoteItemId: string, quoteId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("quote_items")
    .delete()
    .eq("id", quoteItemId)
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