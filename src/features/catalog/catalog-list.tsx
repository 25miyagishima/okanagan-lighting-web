"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { StatusPill } from "@/components/status-pill";
import { EmptyState } from "@/components/ui/empty-state";
import { theme } from "@/styles/theme";
import { formatCurrency } from "@/lib/utils";

type CatalogItem = {
  id: string;
  name: string;
  brand: string | null;
  category: string;
  quoteGroup: string;
  installType: string;
  cost: number;
  active: boolean;
  favourite?: boolean | null;
};

type CatalogListProps = {
  items: CatalogItem[];
};

export function CatalogList({ items }: CatalogListProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "archived">("all");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = [
        item.name,
        item.brand,
        item.category,
        item.quoteGroup,
        item.installType,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        (status === "active" && item.active) ||
        (status === "archived" && !item.active);

      return matchesSearch && matchesStatus;
    });
  }, [items, search, status]);

  if (items.length === 0) {
    return (
      <EmptyState
        title="No catalog items yet"
        description="Add your first item using the form to begin building a reusable quoting catalog."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search catalog..."
          className={`${theme.input} w-full`}
        />

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as "all" | "active" | "archived")
          }
          className={`${theme.input} w-full sm:w-40`}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {filteredItems.length === 0 ? (
        <EmptyState
          title="No matching items"
          description="Try adjusting your search or status filter."
        />
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/catalog/${item.id}`}
              className="block rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-200 hover:border-[#D88B2D]/25 hover:bg-white/[0.045]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate font-medium text-[#F5F5F1]">
                    {item.name}
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-[#A7ABB1]">
                    {item.brand || "No brand"} · {item.category}
                  </p>

                  <div className="mt-2 text-xs text-[#626872]">
                    {item.quoteGroup} · {item.installType} · Cost{" "}
                    {formatCurrency(item.cost)}
                  </div>
                </div>

                <div className="shrink-0">
                  <StatusPill tone={item.active ? "success" : "neutral"}>
                    {item.active ? "active" : "archived"}
                  </StatusPill>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}