"use client";

import { useState } from "react";
import { createCatalogItem } from "./catalog-actions";

export function CatalogForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = await createCatalogItem(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      return;
    }

    setSuccessMessage("Catalog item saved successfully.");
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm"
    >
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Product Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Product name"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="brand" className="text-sm font-medium">
            Brand
          </label>
          <input
            id="brand"
            name="brand"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Brand"
          />
        </div>

        <div>
          <label htmlFor="supplier" className="text-sm font-medium">
            Supplier
          </label>
          <input
            id="supplier"
            name="supplier"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Supplier"
          />
        </div>
      </div>

      <div>
        <label htmlFor="supplierLink" className="text-sm font-medium">
          Supplier Link
        </label>
        <input
          id="supplierLink"
          name="supplierLink"
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="https://..."
        />
      </div>

      <div>
        <label htmlFor="skuOrAsin" className="text-sm font-medium">
          SKU / ASIN
        </label>
        <input
          id="skuOrAsin"
          name="skuOrAsin"
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="SKU or ASIN"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <label htmlFor="cost" className="text-sm font-medium">
            Cost
          </label>
          <input
            id="cost"
            name="cost"
            type="number"
            step="0.01"
            defaultValue="0"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="wattage" className="text-sm font-medium">
            Wattage
          </label>
          <input
            id="wattage"
            name="wattage"
            type="number"
            step="0.01"
            defaultValue="0"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="markupPercent" className="text-sm font-medium">
            Markup %
          </label>
          <input
            id="markupPercent"
            name="markupPercent"
            type="number"
            step="0.01"
            defaultValue="0"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="packQuantity" className="text-sm font-medium">
            Pack Quantity
          </label>
          <input
            id="packQuantity"
            name="packQuantity"
            type="number"
            step="0.01"
            defaultValue="1"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <input
            id="category"
            name="category"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Fixtures, Wire, Transformers..."
          />
        </div>

        <div>
          <label htmlFor="quoteGroup" className="text-sm font-medium">
            Quote Group
          </label>
          <select
            id="quoteGroup"
            name="quoteGroup"
            defaultValue="materials"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="fixtures">Fixtures</option>
            <option value="wire">Wire</option>
            <option value="controls">Controls</option>
            <option value="materials">Materials</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="installType" className="text-sm font-medium">
            Install Type
          </label>
          <select
            id="installType"
            name="installType"
            defaultValue="both"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="both">Both</option>
            <option value="outdoor">Outdoor</option>
            <option value="indoor">Indoor</option>
          </select>
        </div>

        <div>
          <label htmlFor="unitType" className="text-sm font-medium">
            Unit Type
          </label>
          <select
            id="unitType"
            name="unitType"
            defaultValue="each"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="each">Each</option>
            <option value="pack">Pack</option>
            <option value="foot">Foot</option>
            <option value="roll">Roll</option>
            <option value="hour">Hour</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div>
          <label htmlFor="defaultQuantity" className="text-sm font-medium">
            Default Quantity
          </label>
          <input
            id="defaultQuantity"
            name="defaultQuantity"
            type="number"
            step="0.01"
            defaultValue="1"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input name="taxable" type="checkbox" defaultChecked />
          Taxable
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input name="favourite" type="checkbox" />
          Favourite
        </label>
      </div>

      <div>
        <label htmlFor="notes" className="text-sm font-medium">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          className="mt-1 min-h-24 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Internal notes"
        />
      </div>

      {errorMessage ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      {successMessage ? (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
      >
        Save Catalog Item
      </button>
    </form>
  );
}