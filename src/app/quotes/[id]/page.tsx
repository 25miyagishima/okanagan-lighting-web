import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { getCatalogItems } from "@/features/catalog/catalog-actions";
import {
  archiveQuote,
  getQuoteById,
  updateQuote,
} from "@/features/quotes/quote-actions";
import { getQuoteItemsByQuoteId } from "@/features/quotes/quote-item-actions";
import { calculateQuoteTotals } from "@/features/quotes/quote-totals";
import { ZoneForm } from "@/features/quotes/zone-form";
import { ZoneItemForm } from "@/features/quotes/zone-item-form";
import { ZoneTransformerForm } from "@/features/quotes/zone-transformer-form";
import { getZonesByQuoteId } from "@/features/quotes/zone-actions";
import {
  calculateTransformerLoads,
  calculateZoneLoads,
} from "@/features/transformers/load-calculations";
import { calculatePlanningSummary } from "@/features/transformers/planning-summary";
import { TransformerForm } from "@/features/transformers/transformer-form";
import {
  deleteTransformer,
  getTransformersByQuoteId,
} from "@/features/transformers/transformer-actions";
import { formatCurrency, formatPercent } from "@/lib/utils";

type QuoteDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QuoteDetailPage({
  params,
}: QuoteDetailPageProps) {
  const { id } = await params;

  const quote = await getQuoteById(id);
  const zones = await getZonesByQuoteId(id);
  const catalogItems = await getCatalogItems();
  const quoteItems = await getQuoteItemsByQuoteId(id);
  const transformers = await getTransformersByQuoteId(id);

  if (!quote) {
    notFound();
  }

  const activeCatalogItems = catalogItems.filter((item) => item.active);

  const totals = calculateQuoteTotals({
    zones,
    quoteItems,
    quoteLevelLabourHours: quote.quoteLevelLabourHours,
    quoteLevelHourlyRate: quote.quoteLevelHourlyRate,
    discountType: quote.discountType,
    discountValue: quote.discountValue,
    depositType: quote.depositType,
    depositValue: quote.depositValue,
    materialTaxRate: 12,
    labourTaxable: false,
  });

  const zoneLoads = calculateZoneLoads(zones, quoteItems);
  const transformerLoads = calculateTransformerLoads(transformers, zoneLoads);
  const planningSummary = calculatePlanningSummary(
    zoneLoads,
    transformerLoads,
  );

  async function updateQuoteAction(formData: FormData) {
    "use server";

    await updateQuote(id, formData);
  }

  async function archiveQuoteAction() {
    "use server";

    await archiveQuote(id);
  }

  async function deleteTransformerAction(formData: FormData) {
    "use server";

    const transformerId = String(formData.get("transformerId") ?? "");

    if (!transformerId) {
      return;
    }

    await deleteTransformer(transformerId, id);
  }

  return (
    <>
      <div className="mb-4">
        <Link
          href="/quotes"
          className="text-sm text-neutral-600 hover:text-neutral-950"
        >
          ← Back to Quotes
        </Link>
      </div>

      <PageHeader
        title={`${quote.quoteNumber} Rev ${quote.revisionNumber}`}
        description={`${quote.clientName} · ${
          quote.clientSiteAddress || "No site address"
        }`}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">Quote Details</h2>

            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs capitalize text-neutral-700">
              {quote.status}
            </span>
          </div>

          <form action={updateQuoteAction} className="space-y-4">
            <input type="hidden" name="clientId" value={quote.clientId} />

            <div>
              <label htmlFor="quoteType" className="text-sm font-medium">
                Quote Type
              </label>

              <select
                id="quoteType"
                name="quoteType"
                defaultValue={quote.quoteType}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option value="outdoor">Outdoor</option>
                <option value="indoor">Indoor</option>
              </select>
            </div>

            <div>
              <label htmlFor="scope" className="text-sm font-medium">
                Scope
              </label>

              <textarea
                id="scope"
                name="scope"
                defaultValue={quote.scope}
                className="mt-1 min-h-28 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="discountType" className="text-sm font-medium">
                  Discount Type
                </label>

                <select
                  id="discountType"
                  name="discountType"
                  defaultValue={quote.discountType}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                >
                  <option value="none">None</option>
                  <option value="fixed">Fixed $</option>
                  <option value="percentage">Percentage %</option>
                </select>
              </div>

              <div>
                <label htmlFor="discountValue" className="text-sm font-medium">
                  Discount Value
                </label>

                <input
                  id="discountValue"
                  name="discountValue"
                  type="number"
                  step="0.01"
                  defaultValue={quote.discountValue}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="depositType" className="text-sm font-medium">
                  Deposit Type
                </label>

                <select
                  id="depositType"
                  name="depositType"
                  defaultValue={quote.depositType}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                >
                  <option value="none">None</option>
                  <option value="fixed">Fixed $</option>
                  <option value="percentage">Percentage %</option>
                </select>
              </div>

              <div>
                <label htmlFor="depositValue" className="text-sm font-medium">
                  Deposit Value
                </label>

                <input
                  id="depositValue"
                  name="depositValue"
                  type="number"
                  step="0.01"
                  defaultValue={quote.depositValue}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="quoteLevelLabourHours"
                  className="text-sm font-medium"
                >
                  Quote-Level Labour Hours
                </label>

                <input
                  id="quoteLevelLabourHours"
                  name="quoteLevelLabourHours"
                  type="number"
                  step="0.01"
                  defaultValue={quote.quoteLevelLabourHours}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="quoteLevelHourlyRate"
                  className="text-sm font-medium"
                >
                  Hourly Rate
                </label>

                <input
                  id="quoteLevelHourlyRate"
                  name="quoteLevelHourlyRate"
                  type="number"
                  step="0.01"
                  defaultValue={quote.quoteLevelHourlyRate}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="clientNotes" className="text-sm font-medium">
                Client-Facing Notes
              </label>

              <textarea
                id="clientNotes"
                name="clientNotes"
                defaultValue={quote.clientNotes || ""}
                className="mt-1 min-h-20 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label htmlFor="internalNotes" className="text-sm font-medium">
                Internal Notes
              </label>

              <textarea
                id="internalNotes"
                name="internalNotes"
                defaultValue={quote.internalNotes || ""}
                className="mt-1 min-h-20 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
            >
              Save Quote
            </button>
          </form>
        </section>

        <aside className="space-y-4">
          <section className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="mb-4 font-medium">Quote Totals</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Materials</span>
                <span>{formatCurrency(totals.materialSubtotal)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Zone Labour</span>
                <span>{formatCurrency(totals.zoneLabourSubtotal)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Quote Labour</span>
                <span>{formatCurrency(totals.quoteLevelLabourSubtotal)}</span>
              </div>

              <div className="flex justify-between gap-3 border-t pt-2">
                <span className="text-neutral-600">Subtotal</span>
                <span>{formatCurrency(totals.subtotalBeforeDiscount)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Discount</span>
                <span>-{formatCurrency(totals.discountAmount)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Tax</span>
                <span>{formatCurrency(totals.taxAmount)}</span>
              </div>

              <div className="flex justify-between gap-3 border-t pt-2 text-base font-semibold">
                <span>Total</span>
                <span>{formatCurrency(totals.total)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Deposit</span>
                <span>{formatCurrency(totals.depositAmount)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Balance Due</span>
                <span>{formatCurrency(totals.balanceDue)}</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="mb-4 font-medium">Electrical Planning Summary</h2>

            <div className="space-y-2 text-sm">
              <div
                className={
                  planningSummary.isSystemSafe
                    ? "rounded-lg bg-green-50 px-3 py-2 text-green-700"
                    : "rounded-lg bg-yellow-50 px-3 py-2 text-yellow-700"
                }
              >
                {planningSummary.isSystemSafe
                  ? "System looks safe."
                  : "Review needed before final quote."}
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Total System Load</span>
                <span>{planningSummary.totalSystemWatts.toFixed(2)}W</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Assigned Load</span>
                <span>{planningSummary.assignedWatts.toFixed(2)}W</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Unassigned Load</span>
                <span>{planningSummary.unassignedWatts.toFixed(2)}W</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Unassigned Zones</span>
                <span>{planningSummary.unassignedZoneCount}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Load Warnings</span>
                <span>{planningSummary.warningCount}</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="mb-4 font-medium">Internal Profit Preview</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Material Cost</span>
                <span>{formatCurrency(totals.estimatedMaterialCost)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Gross Profit</span>
                <span>{formatCurrency(totals.estimatedGrossProfit)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Margin</span>
                <span>{formatPercent(totals.estimatedMarginPercent)}</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="mb-4 font-medium">Quote Workflow</h2>

            <div className="space-y-3">
              <form action={archiveQuoteAction}>
                <button
                  type="submit"
                  className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                >
                  Archive Quote
                </button>
              </form>
            </div>

            <div className="mt-6 border-t pt-6 text-sm text-neutral-600">
              <p>
                Zones, catalog items, quote totals, transformer assignment, and
                electrical planning summaries are now active.
              </p>
            </div>
          </section>
        </aside>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[420px_1fr]">
        <TransformerForm quoteId={quote.id} />

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 font-medium">Transformers</h2>

          {transformers.length === 0 ? (
            <p className="text-sm text-neutral-600">
              No transformers added yet. Add your first transformer to begin
              electrical load planning.
            </p>
          ) : (
            <div className="space-y-3">
              {transformers.map((transformer) => {
                const load = transformerLoads.find(
                  (summary) => summary.transformerId === transformer.id,
                );

                const assignedWatts = load?.assignedWatts ?? 0;
                const remainingSafeWatts = load?.remainingSafeWatts ?? 0;
                const safePercent = load?.loadPercentOfSafeCapacity ?? 0;
                const overSafe = load?.isOverSafeLoad ?? false;
                const overCapacity = load?.isOverCapacity ?? false;

                return (
                  <div key={transformer.id} className="rounded-xl border p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{transformer.name}</p>

                        <p className="text-sm text-neutral-600">
                          {transformer.capacityWatts}W · {transformer.voltage}V
                        </p>

                        {transformer.locationNote ? (
                          <p className="mt-1 text-xs text-neutral-500">
                            {transformer.locationNote}
                          </p>
                        ) : null}
                      </div>

                      <div className="text-right text-xs text-neutral-700">
                        <p>Assigned: {assignedWatts.toFixed(2)}W</p>
                        <p>
                          Safe Load: {transformer.maxRecommendedLoadWatts}W
                        </p>
                        <p>Remaining: {remainingSafeWatts.toFixed(2)}W</p>
                        <p>{safePercent.toFixed(0)}% of safe load</p>
                      </div>
                    </div>

                    {overCapacity ? (
                      <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                        Over transformer capacity. Reduce load or add another
                        transformer.
                      </p>
                    ) : overSafe ? (
                      <p className="mt-3 rounded-lg bg-yellow-50 px-3 py-2 text-xs text-yellow-700">
                        Over recommended 80% safe load. Consider redistributing
                        zones.
                      </p>
                    ) : (
                      <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
                        Within recommended safe load.
                      </p>
                    )}

                    <form action={deleteTransformerAction} className="mt-3">
                      <input
                        type="hidden"
                        name="transformerId"
                        value={transformer.id}
                      />

                      <button
                        type="submit"
                        className="w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100"
                      >
                        Delete Transformer
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[420px_1fr]">
        <ZoneForm quoteId={quote.id} />

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 font-medium">Quote Zones</h2>

          {zones.length === 0 ? (
            <p className="text-sm text-neutral-600">
              No zones yet. Add your first zone to begin building the estimate.
            </p>
          ) : (
            <div className="space-y-4">
              {zones.map((zone) => {
                const zoneTotals = totals.zoneTotals.find(
                  (total) => total.zoneId === zone.id,
                );

                const zoneLoad = zoneLoads.find(
                  (load) => load.zoneId === zone.id,
                );

                const zoneItems = quoteItems.filter(
                  (item) => item.zoneId === zone.id,
                );

                return (
                  <div key={zone.id} className="rounded-xl border p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{zone.name}</p>

                        <p className="text-sm text-neutral-600">
                          {zone.wireLengthFeet} ft wire · {zone.labourHours} hrs
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          Load: {(zoneLoad?.totalWatts ?? 0).toFixed(2)}W
                        </p>

                        {zone.transformerId ? (
                          <p className="mt-1 text-xs text-neutral-500">
                            Transformer assigned
                          </p>
                        ) : (
                          <p className="mt-1 text-xs text-yellow-700">
                            No transformer assigned
                          </p>
                        )}

                        <ZoneTransformerForm
                          quoteId={quote.id}
                          zoneId={zone.id}
                          currentTransformerId={zone.transformerId}
                          transformers={transformers}
                        />
                      </div>

                      <div className="text-right text-xs text-neutral-700">
                        <p>
                          Materials:{" "}
                          {formatCurrency(zoneTotals?.materialSubtotal ?? 0)}
                        </p>
                        <p>
                          Labour:{" "}
                          {formatCurrency(zoneTotals?.labourSubtotal ?? 0)}
                        </p>
                        <p className="font-semibold">
                          Total: {formatCurrency(zoneTotals?.total ?? 0)}
                        </p>
                      </div>
                    </div>

                    {zone.clientNotes ? (
                      <p className="mt-2 text-sm text-neutral-600">
                        {zone.clientNotes}
                      </p>
                    ) : null}

                    {zone.internalNotes ? (
                      <p className="mt-2 text-xs text-neutral-500">
                        Internal: {zone.internalNotes}
                      </p>
                    ) : null}

                    <div className="mt-4">
                      <h3 className="text-sm font-medium">Zone Items</h3>

                      {zoneItems.length === 0 ? (
                        <p className="mt-2 text-sm text-neutral-600">
                          No catalog items added to this zone yet.
                        </p>
                      ) : (
                        <div className="mt-2 space-y-2">
                          {zoneItems.map((item) => {
                            const itemTotal =
                              item.quantity * item.sellPriceSnapshot;

                            const itemWatts =
                              item.quantity * item.wattageSnapshot;

                            return (
                              <div
                                key={item.id}
                                className="rounded-lg border bg-neutral-50 p-2"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-medium">
                                      {item.nameSnapshot}
                                    </p>

                                    <p className="text-xs text-neutral-600">
                                      {item.quoteGroupSnapshot} · Qty{" "}
                                      {item.quantity}
                                    </p>

                                    <p className="text-xs text-neutral-500">
                                      Load: {itemWatts.toFixed(2)}W
                                    </p>
                                  </div>

                                  <span className="text-xs font-medium text-neutral-700">
                                    {formatCurrency(itemTotal)}
                                  </span>
                                </div>

                                {item.notes ? (
                                  <p className="mt-1 text-xs text-neutral-500">
                                    {item.notes}
                                  </p>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <ZoneItemForm
                        quoteId={quote.id}
                        zoneId={zone.id}
                        catalogItems={activeCatalogItems}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
}