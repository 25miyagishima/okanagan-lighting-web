"use client";

import { useState } from "react";
import { addCatalogItemToZone } from "./quote-item-actions";
import type { CatalogItem } from "@/types/database";

type ZoneItemFormProps = {
  quoteId: string;
  zoneId: string;
  catalogItems: CatalogItem[];
};

export function ZoneItemForm({
  quoteId,
  zoneId,
  catalogItems,
}: ZoneItemFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setErrorMessage(null);

    const result = await addCatalogItemToZone(quoteId, zoneId, formData);

    if (result?.error) {
      setErrorMessage(result.error);
    }
  }

  return (
    <form action={handleSubmit} className="mt-4 space-y-3 rounded-lg border p-3">
      <div>
        <label htmlFor={`catalogItemId-${zoneId}`} className="text-xs font-medium">
          Add Catalog Item
        </label>

        <select
          id={`catalogItemId-${zoneId}`}
          name="catalogItemId"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
        >
          <option value="">Select item</option>
          {catalogItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} — {item.quoteGroup}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label htmlFor={`quantity-${zoneId}`} className="text-xs font-medium">
            Quantity
          </label>

          <input
            id={`quantity-${zoneId}`}
            name="quantity"
            type="number"
            step="0.01"
            defaultValue="1"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor={`notes-${zoneId}`} className="text-xs font-medium">
            Notes
          </label>

          <input
            id={`notes-${zoneId}`}
            name="notes"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Optional"
          />
        </div>
      </div>

      {errorMessage ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-lg bg-neutral-950 px-3 py-2 text-sm font-medium text-white"
      >
        Add Item To Zone
      </button>
    </form>
  );
}