"use client";

import { useState } from "react";
import type {
  CatalogItem,
  QuoteItem,
  Transformer,
  Zone,
} from "@/types/database";
import type { ZoneTotals } from "@/features/quotes/quote-totals";
import type { ZoneLoadSummary } from "@/features/transformers/load-calculations";
import { removeQuoteItem } from "@/features/quotes/quote-item-actions";
import { ZoneItemForm } from "@/features/quotes/zone-item-form";
import { ZoneTransformerForm } from "@/features/quotes/zone-transformer-form";
import { formatCurrency } from "@/lib/utils";
import { theme } from "@/styles/theme";

type ZoneCardProps = {
  quoteId: string;
  zone: Zone;
  zoneTotals?: ZoneTotals;
  zoneLoad?: ZoneLoadSummary;
  zoneItems: QuoteItem[];
  transformers: Transformer[];
  activeCatalogItems: CatalogItem[];
};

export function ZoneCard({
  quoteId,
  zone,
  zoneTotals,
  zoneLoad,
  zoneItems,
  transformers,
  activeCatalogItems,
}: ZoneCardProps) {
  const [open, setOpen] = useState(!zone.collapsed);

  const totalWatts = zoneLoad?.totalWatts ?? 0;
  const zoneTotal = zoneTotals?.total ?? 0;
  const itemCount = zoneItems.length;

  return (
    <div className={theme.surface.card}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-full px-3 py-3 text-left transition-colors hover:bg-white/[0.03] md:px-4"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className={`font-medium ${theme.text.primary}`}>
                {zone.name}
              </p>

              {zone.transformerId ? (
                <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-300">
                  Transformer assigned
                </span>
              ) : (
                <span className="rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-300">
                  No transformer
                </span>
              )}
            </div>

            <div className={`mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs ${theme.text.secondary}`}>
              <span>{itemCount} item(s)</span>
              <span>{zone.wireLengthFeet} ft wire</span>
              <span>{zone.labourHours} labour hrs</span>
              <span>{totalWatts.toFixed(2)}W load</span>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className={`text-sm font-semibold ${theme.accent.gold}`}>
              {formatCurrency(zoneTotal)}
            </p>

            <p className={`mt-1 text-xs ${theme.text.muted}`}>
              {open ? "Hide details" : "Show details"}
            </p>
          </div>
        </div>
      </button>

      {open ? (
        <div className="border-t border-white/5 bg-white/[0.02] p-3 md:p-4">
          <div className="grid gap-2 md:grid-cols-3 md:gap-3">
            <div className={theme.surface.secondary}>
              <div className="p-3">
                <p className={`text-xs ${theme.text.muted}`}>Materials</p>
                <p className={`mt-1 text-sm font-medium ${theme.text.primary}`}>
                  {formatCurrency(zoneTotals?.materialSubtotal ?? 0)}
                </p>
              </div>
            </div>

            <div className={theme.surface.secondary}>
              <div className="p-3">
                <p className={`text-xs ${theme.text.muted}`}>Labour</p>
                <p className={`mt-1 text-sm font-medium ${theme.text.primary}`}>
                  {formatCurrency(zoneTotals?.labourSubtotal ?? 0)}
                </p>
              </div>
            </div>

            <div className={theme.surface.secondary}>
              <div className="p-3">
                <p className={`text-xs ${theme.text.muted}`}>Load</p>
                <p className={`mt-1 text-sm font-medium ${theme.accent.gold}`}>
                  {totalWatts.toFixed(2)}W
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ZoneTransformerForm
              quoteId={quoteId}
              zoneId={zone.id}
              currentTransformerId={zone.transformerId}
              transformers={transformers}
            />
          </div>

          {zone.clientNotes ? (
            <p className={`mt-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-sm ${theme.text.secondary}`}>
              {zone.clientNotes}
            </p>
          ) : null}

          {zone.transformerAssignmentNote ? (
            <p className="mt-3 rounded-lg border border-blue-400/10 bg-blue-400/10 px-3 py-2 text-xs text-blue-200">
              Field Note: {zone.transformerAssignmentNote}
            </p>
          ) : null}

          {zone.internalNotes ? (
            <p className={`mt-3 rounded-lg border border-white/5 bg-white/[0.04] px-3 py-2 text-xs ${theme.text.secondary}`}>
              Internal: {zone.internalNotes}
            </p>
          ) : null}

          <div className="mt-4 md:mt-5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className={`text-sm font-medium ${theme.text.primary}`}>
                Zone Items
              </h3>

              <span className={`text-xs ${theme.text.muted}`}>
                {itemCount} item(s)
              </span>
            </div>

            {zoneItems.length === 0 ? (
              <p className={`rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-sm ${theme.text.secondary}`}>
                No catalog items added to this zone yet.
              </p>
            ) : (
              <div className="space-y-2">
                {zoneItems.map((item) => {
                  const itemTotal = item.quantity * item.sellPriceSnapshot;
                  const itemWatts = item.quantity * item.wattageSnapshot;

                  return (
                    <div
                      key={item.id}
                      className="rounded-xl border border-white/5 bg-[#23262B] p-2.5 md:p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className={`text-sm font-medium ${theme.text.primary}`}>
                            {item.nameSnapshot}
                          </p>

                          <div className={`mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs ${theme.text.secondary}`}>
                            <span>{item.quoteGroupSnapshot}</span>
                            <span>Qty {item.quantity}</span>
                            <span>{itemWatts.toFixed(2)}W</span>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className={`text-sm font-medium ${theme.accent.gold}`}>
                            {formatCurrency(itemTotal)}
                          </p>

                          <form
                            action={async () => {
                              await removeQuoteItem(item.id, quoteId);
                            }}
                            className="mt-2"
                          >
                            <button
                              type="submit"
                              className="rounded-md border border-red-400/20 bg-red-500/10 px-2 py-1 text-xs font-medium text-red-300 hover:bg-red-500/20"
                            >
                              Remove
                            </button>
                          </form>
                        </div>
                      </div>

                      {item.notes ? (
                        <p className={`mt-2 text-xs ${theme.text.muted}`}>
                          {item.notes}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}

            <ZoneItemForm
              quoteId={quoteId}
              zoneId={zone.id}
              catalogItems={activeCatalogItems}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}