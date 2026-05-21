"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { CatalogItem } from "@/types/database";
import type {
  CatalogInstallType,
  CatalogUnitType,
  QuoteItemGroup,
} from "@/types/app";

type CatalogRow = {
  id: string;
  name: string;
  brand: string | null;
  supplier: string | null;
  supplier_link: string | null;
  sku_or_asin: string | null;
  cost: number;
  wattage: number;
  markup_percent: number;
  pack_quantity: number;
  category: string;
  quote_group: QuoteItemGroup;
  install_type: CatalogInstallType;
  unit_type: CatalogUnitType;
  taxable: boolean;
  default_quantity: number;
  favourite: boolean;
  active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
};

const catalogSelect =
  "id, name, brand, supplier, supplier_link, sku_or_asin, cost, wattage, markup_percent, pack_quantity, category, quote_group, install_type, unit_type, taxable, default_quantity, favourite, active, notes, created_at, updated_at, archived_at";

function mapCatalogRow(row: CatalogRow): CatalogItem {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    supplier: row.supplier,
    supplierLink: row.supplier_link,
    skuOrAsin: row.sku_or_asin,
    cost: Number(row.cost),
    wattage: Number(row.wattage),
    markupPercent: Number(row.markup_percent),
    packQuantity: Number(row.pack_quantity),
    category: row.category,
    quoteGroup: row.quote_group,
    installType: row.install_type,
    unitType: row.unit_type,
    taxable: row.taxable,
    defaultQuantity: Number(row.default_quantity),
    favourite: row.favourite,
    active: row.active,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    archivedAt: row.archived_at,
  };
}

export async function getCatalogItems(): Promise<CatalogItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("catalog_items")
    .select(catalogSelect)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((row) => mapCatalogRow(row as CatalogRow));
}

export async function getCatalogItemById(
  id: string,
): Promise<CatalogItem | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("catalog_items")
    .select(catalogSelect)
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapCatalogRow(data as CatalogRow);
}

function getCatalogFormValues(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim();
  const supplier = String(formData.get("supplier") ?? "").trim();
  const supplierLink = String(formData.get("supplierLink") ?? "").trim();
  const skuOrAsin = String(formData.get("skuOrAsin") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const quoteGroup = String(
    formData.get("quoteGroup") ?? "materials",
  ) as QuoteItemGroup;
  const installType = String(
    formData.get("installType") ?? "both",
  ) as CatalogInstallType;
  const unitType = String(
    formData.get("unitType") ?? "each",
  ) as CatalogUnitType;
  const notes = String(formData.get("notes") ?? "").trim();

  const cost = Number(formData.get("cost") ?? 0);
  const wattage = Number(formData.get("wattage") ?? 0);
  const markupPercent = Number(formData.get("markupPercent") ?? 0);
  const packQuantity = Number(formData.get("packQuantity") ?? 1);
  const defaultQuantity = Number(formData.get("defaultQuantity") ?? 1);

  const taxable = formData.get("taxable") === "on";
  const favourite = formData.get("favourite") === "on";

  return {
    name,
    brand,
    supplier,
    supplierLink,
    skuOrAsin,
    cost: Number.isFinite(cost) ? cost : 0,
    wattage: Number.isFinite(wattage) ? wattage : 0,
    markupPercent: Number.isFinite(markupPercent) ? markupPercent : 0,
    packQuantity:
      Number.isFinite(packQuantity) && packQuantity > 0 ? packQuantity : 1,
    category,
    quoteGroup,
    installType,
    unitType,
    taxable,
    defaultQuantity:
      Number.isFinite(defaultQuantity) && defaultQuantity > 0
        ? defaultQuantity
        : 1,
    favourite,
    notes,
  };
}

export async function createCatalogItem(formData: FormData) {
  const supabase = await createClient();
  const values = getCatalogFormValues(formData);

  if (!values.name) {
    return { error: "Product name is required." };
  }

  if (!values.category) {
    return { error: "Category is required." };
  }

  const { error } = await supabase.from("catalog_items").insert({
    name: values.name,
    brand: values.brand || null,
    supplier: values.supplier || null,
    supplier_link: values.supplierLink || null,
    sku_or_asin: values.skuOrAsin || null,
    cost: values.cost,
    wattage: values.wattage,
    markup_percent: values.markupPercent,
    pack_quantity: values.packQuantity,
    category: values.category,
    quote_group: values.quoteGroup,
    install_type: values.installType,
    unit_type: values.unitType,
    taxable: values.taxable,
    default_quantity: values.defaultQuantity,
    favourite: values.favourite,
    active: true,
    notes: values.notes || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/catalog");
  revalidatePath("/dashboard");

  return { success: true };
}

export async function updateCatalogItem(id: string, formData: FormData) {
  const supabase = await createClient();
  const values = getCatalogFormValues(formData);

  if (!values.name) {
    return { error: "Product name is required." };
  }

  if (!values.category) {
    return { error: "Category is required." };
  }

  const { error } = await supabase
    .from("catalog_items")
    .update({
      name: values.name,
      brand: values.brand || null,
      supplier: values.supplier || null,
      supplier_link: values.supplierLink || null,
      sku_or_asin: values.skuOrAsin || null,
      cost: values.cost,
      wattage: values.wattage,
      markup_percent: values.markupPercent,
      pack_quantity: values.packQuantity,
      category: values.category,
      quote_group: values.quoteGroup,
      install_type: values.installType,
      unit_type: values.unitType,
      taxable: values.taxable,
      default_quantity: values.defaultQuantity,
      favourite: values.favourite,
      notes: values.notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/catalog");
  revalidatePath(`/catalog/${id}`);

  return { success: true };
}

export async function archiveCatalogItem(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("catalog_items")
    .update({
      active: false,
      archived_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/catalog");
  revalidatePath(`/catalog/${id}`);

  return { success: true };
}

export async function restoreCatalogItem(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("catalog_items")
    .update({
      active: true,
      archived_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/catalog");
  revalidatePath(`/catalog/${id}`);

  return { success: true };
}