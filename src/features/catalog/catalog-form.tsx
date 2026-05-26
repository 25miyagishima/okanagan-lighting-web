"use client";

import { useState } from "react";
import { formStyles } from "@/styles/form-styles";
import { theme } from "@/styles/theme";
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
      className={`${theme.surface.card} ${theme.form.stack}`}
    >
      <div>
        <p className={theme.typography.eyebrow}>
          Product Library
        </p>

        <h2 className="mt-1 font-serif text-2xl font-medium tracking-[-0.03em] text-[#F5F5F1]">
          Catalog Item
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-[#A7ABB1]">
          Add reusable fixtures, materials, controls, labour items,
          and products for future quotes and installs.
        </p>
      </div>

      <div className={theme.surface.goldLine} />

      <div className={theme.form.stack}>
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

        <div className={theme.form.rowTwo}>
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
          <label
            htmlFor="supplierLink"
            className={formStyles.label}
          >
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
      </div>

      <div className={theme.surface.goldLine} />

      <div className={theme.form.stack}>
        <p className={theme.typography.cardTitle}>
          Pricing Configuration
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
            <label
              htmlFor="markupPercent"
              className={formStyles.label}
            >
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
            <label
              htmlFor="packQuantity"
              className={formStyles.label}
            >
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
      </div>

      <div className={theme.surface.goldLine} />

      <div className={theme.form.stack}>
        <p className={theme.typography.cardTitle}>
          Classification
        </p>

        <div className={theme.form.rowTwo}>
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
            <label
              htmlFor="quoteGroup"
              className={formStyles.label}
            >
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
            <label
              htmlFor="installType"
              className={formStyles.label}
            >
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
            <label
              htmlFor="unitType"
              className={formStyles.label}
            >
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
            <label
              htmlFor="defaultQuantity"
              className={formStyles.label}
            >
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
      </div>

      <div className={theme.surface.goldLine} />

      <div
        className={`${theme.surface.inset} flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-center`}
      >
        <label className="flex items-center gap-3 text-sm text-[#A7ABB1]">
          <input
            name="taxable"
            type="checkbox"
            defaultChecked
            className="h-4 w-4 rounded border-white/10 bg-[#1D2024]"
          />

          Taxable
        </label>

        <label className="flex items-center gap-3 text-sm text-[#A7ABB1]">
          <input
            name="favourite"
            type="checkbox"
            className="h-4 w-4 rounded border-white/10 bg-[#1D2024]"
          />

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
        <div className={theme.surface.danger}>
          <p className="text-sm text-red-300">
            {errorMessage}
          </p>
        </div>
      ) : null}

      {successMessage ? (
        <div className={theme.surface.success}>
          <p className="text-sm text-green-300">
            {successMessage}
          </p>
        </div>
      ) : null}

      <div className={theme.form.actions}>
        <button
          type="submit"
          className={theme.button.primary}
        >
          Save Catalog Item
        </button>
      </div>
    </form>
  );
}