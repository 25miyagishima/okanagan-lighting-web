import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { CatalogForm } from "@/features/catalog/catalog-form";
import { getCatalogItems } from "@/features/catalog/catalog-actions";
import { formatCurrency } from "@/lib/utils";

export default async function CatalogPage() {
  const items = await getCatalogItems();

  return (
    <>
      <PageHeader
        title="Catalog"
        description="Manage fixtures, wire, controls, materials, labour items, and categories."
      />

      <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
        <CatalogForm />

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 font-medium">Catalog Items</h2>

          {items.length === 0 ? (
            <p className="text-sm text-neutral-600">
              No catalog items yet. Add your first item using the form.
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/catalog/${item.id}`}
                  className="block rounded-xl border p-3 hover:bg-neutral-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-neutral-600">
                        {item.brand || "No brand"} · {item.category}
                      </p>
                    </div>

                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs capitalize text-neutral-700">
                      {item.active ? "active" : "archived"}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-neutral-500">
                    {item.quoteGroup} · {item.installType} · Cost{" "}
                    {formatCurrency(item.cost)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}