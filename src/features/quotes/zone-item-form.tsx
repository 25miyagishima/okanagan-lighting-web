"use client";

import { useState } from "react";
import type { CatalogItem } from "@/types/database";
import { formStyles } from "@/styles/form-styles";
import { addCatalogItemToZone } from "./quote-item-actions";

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
    <form
      action={handleSubmit}
      className="mt-4 space-y-3 rounded-xl border border-white/5 bg-white/[0.03] p-3"
    >
      <div>
        <label htmlFor={`catalogItemId-${zoneId}`} className={formStyles.label}>
          Add Catalog Item
        </label>

        <select
          id={`catalogItemId-${zoneId}`}
          name="catalogItemId"
          required
          className={formStyles.select}
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
          <label htmlFor={`quantity-${zoneId}`} className={formStyles.label}>
            Quantity
          </label>

          <input
            id={`quantity-${zoneId}`}
            name="quantity"
            type="number"
            step="0.01"
            defaultValue="1"
            className={formStyles.input}
          />
        </div>

        <div>
          <label htmlFor={`notes-${zoneId}`} className={formStyles.label}>
            Notes
          </label>

          <input
            id={`notes-${zoneId}`}
            name="notes"
            className={formStyles.input}
            placeholder="Optional"
          />
        </div>
      </div>

      {errorMessage ? (
        <p className={formStyles.errorText}>{errorMessage}</p>
      ) : null}

      <button type="submit" className={formStyles.primaryButton}>
        Add Item To Zone
      </button>
    </form>
  );
}