import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { CatalogForm } from "@/features/catalog/catalog-form";
import { getCatalogItems } from "@/features/catalog/catalog-actions";
import { formatCurrency } from "@/lib/utils";

export default async function CatalogPage() {
  const items = await getCatalogItems();

  return (
    <div className="min-h-screen bg-[#0D0E10] px-3 py-4 text-[#F5F5F1] md:px-6 md:py-6">
      <PageHeader
        title="Catalog"
        description="Manage fixtures, wire, controls, materials, labour items, and categories."
      />

      <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
        <CatalogForm />

        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <h2 className="mb-4 font-medium text-[#F5F5F1]">
            Catalog Items
          </h2>

          {items.length === 0 ? (
            <p className="text-sm text-[#9EA3AA]">
              No catalog items yet. Add your first item using the form.
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/catalog/${item.id}`}
                  className="block rounded-xl border border-white/5 bg-[#23262B] p-3 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-[#F5F5F1]">
                        {item.name}
                      </p>

                      <p className="text-sm text-[#9EA3AA]">
                        {item.brand || "No brand"} · {item.category}
                      </p>
                    </div>

                    <StatusPill>
                      {item.active ? "active" : "archived"}
                    </StatusPill>
                  </div>

                  <div className="mt-2 text-xs text-[#5B6068]">
                    {item.quoteGroup} · {item.installType} · Cost{" "}
                    {formatCurrency(item.cost)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}