import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import {
  archiveCatalogItem,
  getCatalogItemById,
  restoreCatalogItem,
  updateCatalogItem,
} from "@/features/catalog/catalog-actions";

type CatalogItemDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CatalogItemDetailPage({
  params,
}: CatalogItemDetailPageProps) {
  const { id } = await params;

  const item = await getCatalogItemById(id);

  if (!item) {
    notFound();
  }

  async function updateItem(formData: FormData) {
    "use server";

    await updateCatalogItem(id, formData);
  }

  async function archiveItem() {
    "use server";

    await archiveCatalogItem(id);
  }

  async function restoreItem() {
    "use server";

    await restoreCatalogItem(id);
  }

  const inputClassName =
    "mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1] outline-none transition-colors placeholder:text-[#5B6068] focus:border-[#E2B15A]/40";

  return (
    <div className="min-h-screen bg-[#0D0E10] px-3 py-4 text-[#F5F5F1] md:px-6 md:py-6">
      <div className="mb-4">
        <Link
          href="/catalog"
          className="text-sm text-[#9EA3AA] transition-colors hover:text-[#F5F5F1]"
        >
          ← Back to Catalog
        </Link>
      </div>

      <PageHeader
        title={item.name}
        description={`${item.category} · ${item.quoteGroup}`}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium text-[#F5F5F1]">
              Catalog Item Details
            </h2>

            <StatusPill>
              {item.active ? "active" : "archived"}
            </StatusPill>
          </div>

          <form action={updateItem} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-[#F5F5F1]">
                Product Name
              </label>

              <input
                id="name"
                name="name"
                defaultValue={item.name}
                required
                className={inputClassName}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="brand" className="text-sm font-medium text-[#F5F5F1]">
                  Brand
                </label>

                <input
                  id="brand"
                  name="brand"
                  defaultValue={item.brand || ""}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="supplier" className="text-sm font-medium text-[#F5F5F1]">
                  Supplier
                </label>

                <input
                  id="supplier"
                  name="supplier"
                  defaultValue={item.supplier || ""}
                  className={inputClassName}
                />
              </div>
            </div>

            <div>
              <label htmlFor="supplierLink" className="text-sm font-medium text-[#F5F5F1]">
                Supplier Link
              </label>

              <input
                id="supplierLink"
                name="supplierLink"
                defaultValue={item.supplierLink || ""}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="skuOrAsin" className="text-sm font-medium text-[#F5F5F1]">
                SKU / ASIN
              </label>

              <input
                id="skuOrAsin"
                name="skuOrAsin"
                defaultValue={item.skuOrAsin || ""}
                className={inputClassName}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label htmlFor="cost" className="text-sm font-medium text-[#F5F5F1]">
                  Cost
                </label>

                <input
                  id="cost"
                  name="cost"
                  type="number"
                  step="0.01"
                  defaultValue={item.cost}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="wattage" className="text-sm font-medium text-[#F5F5F1]">
                  Wattage
                </label>

                <input
                  id="wattage"
                  name="wattage"
                  type="number"
                  step="0.01"
                  defaultValue={item.wattage}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="markupPercent" className="text-sm font-medium text-[#F5F5F1]">
                  Markup %
                </label>

                <input
                  id="markupPercent"
                  name="markupPercent"
                  type="number"
                  step="0.01"
                  defaultValue={item.markupPercent}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="packQuantity" className="text-sm font-medium text-[#F5F5F1]">
                  Pack Quantity
                </label>

                <input
                  id="packQuantity"
                  name="packQuantity"
                  type="number"
                  step="0.01"
                  defaultValue={item.packQuantity}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="category" className="text-sm font-medium text-[#F5F5F1]">
                  Category
                </label>

                <input
                  id="category"
                  name="category"
                  required
                  defaultValue={item.category}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="quoteGroup" className="text-sm font-medium text-[#F5F5F1]">
                  Quote Group
                </label>

                <select
                  id="quoteGroup"
                  name="quoteGroup"
                  defaultValue={item.quoteGroup}
                  className={inputClassName}
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
                <label htmlFor="installType" className="text-sm font-medium text-[#F5F5F1]">
                  Install Type
                </label>

                <select
                  id="installType"
                  name="installType"
                  defaultValue={item.installType}
                  className={inputClassName}
                >
                  <option value="both">Both</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="indoor">Indoor</option>
                </select>
              </div>

              <div>
                <label htmlFor="unitType" className="text-sm font-medium text-[#F5F5F1]">
                  Unit Type
                </label>

                <select
                  id="unitType"
                  name="unitType"
                  defaultValue={item.unitType}
                  className={inputClassName}
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
                <label htmlFor="defaultQuantity" className="text-sm font-medium text-[#F5F5F1]">
                  Default Quantity
                </label>

                <input
                  id="defaultQuantity"
                  name="defaultQuantity"
                  type="number"
                  step="0.01"
                  defaultValue={item.defaultQuantity}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-[#F5F5F1]">
                <input
                  name="taxable"
                  type="checkbox"
                  defaultChecked={item.taxable}
                />
                Taxable
              </label>

              <label className="flex items-center gap-2 text-sm text-[#F5F5F1]">
                <input
                  name="favourite"
                  type="checkbox"
                  defaultChecked={item.favourite}
                />
                Favourite
              </label>
            </div>

            <div>
              <label htmlFor="notes" className="text-sm font-medium text-[#F5F5F1]">
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                defaultValue={item.notes || ""}
                className="mt-1 min-h-24 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1] outline-none transition-colors placeholder:text-[#5B6068] focus:border-[#E2B15A]/40"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] px-4 py-2 text-sm font-medium text-[#0D0E10] transition-opacity hover:opacity-90"
            >
              Save Changes
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <h2 className="mb-4 font-medium text-[#F5F5F1]">
            Catalog Workflow
          </h2>

          <div className="space-y-3">
            {item.active ? (
              <form action={archiveItem}>
                <button
                  type="submit"
                  className="w-full rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/15"
                >
                  Archive Item
                </button>
              </form>
            ) : (
              <form action={restoreItem}>
                <button
                  type="submit"
                  className="w-full rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-300 transition-colors hover:bg-green-500/15"
                >
                  Restore Item
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 border-t border-white/5 pt-6 text-sm text-[#9EA3AA]">
            <p>
              Catalog items are the source of truth for quote selections.
              Future quotes will store pricing snapshots when items are added.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}