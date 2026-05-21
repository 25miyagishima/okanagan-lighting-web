import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
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

  return (
    <>
      <div className="mb-4">
        <Link
          href="/catalog"
          className="text-sm text-neutral-600 hover:text-neutral-950"
        >
          ← Back to Catalog
        </Link>
      </div>

      <PageHeader
        title={item.name}
        description={`${item.category} · ${item.quoteGroup}`}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">Catalog Item Details</h2>

            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs capitalize text-neutral-700">
              {item.active ? "active" : "archived"}
            </span>
          </div>

          <form action={updateItem} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Product Name
              </label>
              <input
                id="name"
                name="name"
                defaultValue={item.name}
                required
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
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
                  defaultValue={item.brand || ""}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label htmlFor="supplier" className="text-sm font-medium">
                  Supplier
                </label>
                <input
                  id="supplier"
                  name="supplier"
                  defaultValue={item.supplier || ""}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
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
                defaultValue={item.supplierLink || ""}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label htmlFor="skuOrAsin" className="text-sm font-medium">
                SKU / ASIN
              </label>
              <input
                id="skuOrAsin"
                name="skuOrAsin"
                defaultValue={item.skuOrAsin || ""}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
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
                  defaultValue={item.cost}
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
                  defaultValue={item.wattage}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="markupPercent"
                  className="text-sm font-medium"
                >
                  Markup %
                </label>

                <input
                  id="markupPercent"
                  name="markupPercent"
                  type="number"
                  step="0.01"
                  defaultValue={item.markupPercent}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="packQuantity"
                  className="text-sm font-medium"
                >
                  Pack Quantity
                </label>

                <input
                  id="packQuantity"
                  name="packQuantity"
                  type="number"
                  step="0.01"
                  defaultValue={item.packQuantity}
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
                  defaultValue={item.category}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label htmlFor="quoteGroup" className="text-sm font-medium">
                  Quote Group
                </label>
                <select
                  id="quoteGroup"
                  name="quoteGroup"
                  defaultValue={item.quoteGroup}
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
                  defaultValue={item.installType}
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
                  defaultValue={item.unitType}
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
                  defaultValue={item.defaultQuantity}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input name="taxable" type="checkbox" defaultChecked={item.taxable} />
                Taxable
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  name="favourite"
                  type="checkbox"
                  defaultChecked={item.favourite}
                />
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
                defaultValue={item.notes || ""}
                className="mt-1 min-h-24 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
            >
              Save Changes
            </button>
          </form>
        </section>

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 font-medium">Catalog Workflow</h2>

          <div className="space-y-3">
            {item.active ? (
              <form action={archiveItem}>
                <button
                  type="submit"
                  className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                >
                  Archive Item
                </button>
              </form>
            ) : (
              <form action={restoreItem}>
                <button
                  type="submit"
                  className="w-full rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
                >
                  Restore Item
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 border-t pt-6 text-sm text-neutral-600">
            <p>
              Catalog items are the source of truth for quote selections.
              Future quotes will store pricing snapshots when items are added.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}