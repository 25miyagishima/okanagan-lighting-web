"use client";

import { useState } from "react";
import { formStyles } from "@/styles/form-styles";
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
      className="space-y-4 rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]"
    >
      <div>
        <label htmlFor="name" className={formStyles.label}>
          Product Name
        </label>

        <input
          id="name"
          name="name"
          required
          className={formStyles.input}
          placeholder="Product name"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="brand" className={formStyles.label}>
            Brand
          </label>

          <input
            id="brand"
            name="brand"
            className={formStyles.input}
            placeholder="Brand"
          />
        </div>

        <div>
          <label htmlFor="supplier" className={formStyles.label}>
            Supplier
          </label>

          <input
            id="supplier"
            name="supplier"
            className={formStyles.input}
            placeholder="Supplier"
          />
        </div>
      </div>

      <div>
        <label htmlFor="supplierLink" className={formStyles.label}>
          Supplier Link
        </label>

        <input
          id="supplierLink"
          name="supplierLink"
          className={formStyles.input}
          placeholder="https://..."
        />
      </div>

      <div>
        <label htmlFor="skuOrAsin" className={formStyles.label}>
          SKU / ASIN
        </label>

        <input
          id="skuOrAsin"
          name="skuOrAsin"
          className={formStyles.input}
          placeholder="SKU or ASIN"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <label htmlFor="cost" className={formStyles.label}>
            Cost
          </label>

          <input
            id="cost"
            name="cost"
            type="number"
            step="0.01"
            defaultValue="0"
            className={formStyles.input}
          />
        </div>

        <div>
          <label htmlFor="wattage" className={formStyles.label}>
            Wattage
          </label>

          <input
            id="wattage"
            name="wattage"
            type="number"
            step="0.01"
            defaultValue="0"
            className={formStyles.input}
          />
        </div>

        <div>
          <label htmlFor="markupPercent" className={formStyles.label}>
            Markup %
          </label>

          <input
            id="markupPercent"
            name="markupPercent"
            type="number"
            step="0.01"
            defaultValue="0"
            className={formStyles.input}
          />
        </div>

        <div>
          <label htmlFor="packQuantity" className={formStyles.label}>
            Pack Quantity
          </label>

          <input
            id="packQuantity"
            name="packQuantity"
            type="number"
            step="0.01"
            defaultValue="1"
            className={formStyles.input}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="category" className={formStyles.label}>
            Category
          </label>

          <input
            id="category"
            name="category"
            required
            className={formStyles.input}
            placeholder="Fixtures, Wire, Transformers..."
          />
        </div>

        <div>
          <label htmlFor="quoteGroup" className={formStyles.label}>
            Quote Group
          </label>

          <select
            id="quoteGroup"
            name="quoteGroup"
            defaultValue="materials"
            className={formStyles.select}
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
          <label htmlFor="installType" className={formStyles.label}>
            Install Type
          </label>

          <select
            id="installType"
            name="installType"
            defaultValue="both"
            className={formStyles.select}
          >
            <option value="both">Both</option>
            <option value="outdoor">Outdoor</option>
            <option value="indoor">Indoor</option>
          </select>
        </div>

        <div>
          <label htmlFor="unitType" className={formStyles.label}>
            Unit Type
          </label>

          <select
            id="unitType"
            name="unitType"
            defaultValue="each"
            className={formStyles.select}
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
          <label htmlFor="defaultQuantity" className={formStyles.label}>
            Default Quantity
          </label>

          <input
            id="defaultQuantity"
            name="defaultQuantity"
            type="number"
            step="0.01"
            defaultValue="1"
            className={formStyles.input}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-3">
        <label className="flex items-center gap-2 text-sm text-[#9EA3AA]">
          <input name="taxable" type="checkbox" defaultChecked />
          Taxable
        </label>

        <label className="flex items-center gap-2 text-sm text-[#9EA3AA]">
          <input name="favourite" type="checkbox" />
          Favourite
        </label>
      </div>

      <div>
        <label htmlFor="notes" className={formStyles.label}>
          Notes
        </label>

        <textarea
          id="notes"
          name="notes"
          className={formStyles.textarea}
          placeholder="Internal notes"
        />
      </div>

      {errorMessage ? (
        <p className={formStyles.errorText}>{errorMessage}</p>
      ) : null}

      {successMessage ? (
        <p className={formStyles.successText}>{successMessage}</p>
      ) : null}

      <button type="submit" className={formStyles.primaryButton}>
        Save Catalog Item
      </button>
    </form>
  );
}