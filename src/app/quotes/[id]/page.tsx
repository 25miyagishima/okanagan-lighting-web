import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { CollapsibleFormSection } from "@/components/collapsible-form-section";
import { getCatalogItems } from "@/features/catalog/catalog-actions";
import { InternalProfitCard } from "@/features/quotes/quote-sidebar/internal-profit-card";
import { QuoteTotalsCard } from "@/features/quotes/quote-sidebar/quote-totals-card";
import { SectionCard } from "@/features/quotes/quote-sidebar/section-card";
import {
  archiveQuote,
  getQuoteById,
  updateQuote,
} from "@/features/quotes/quote-actions";
import { getQuoteItemsByQuoteId } from "@/features/quotes/quote-item-actions";
import { calculateQuoteTotals } from "@/features/quotes/quote-totals";
import { QuoteWorkspaceNav } from "@/features/quotes/quote-workspace-nav";
import { ZoneCard } from "@/features/quotes/zone-card";
import { ZoneForm } from "@/features/quotes/zone-form";
import { getZonesByQuoteId } from "@/features/quotes/zone-actions";
import { calculateTransformerCapacitySuggestions } from "@/features/transformers/capacity-suggestions";
import { calculateDistributionGuidance } from "@/features/transformers/distribution-guidance";
import {
  calculateTransformerLoads,
  calculateZoneLoads,
} from "@/features/transformers/load-calculations";
import { calculatePlanningSummary } from "@/features/transformers/planning-summary";
import { calculateTransformerRecommendation } from "@/features/transformers/transformer-recommendations";
import { TransformerForm } from "@/features/transformers/transformer-form";
import {
  deleteTransformer,
  getTransformersByQuoteId,
} from "@/features/transformers/transformer-actions";

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
  const planningSummary = calculatePlanningSummary(zoneLoads, transformerLoads);
  const transformerRecommendation =
    calculateTransformerRecommendation(zoneLoads);
  const distributionGuidance = calculateDistributionGuidance(
    zoneLoads,
    transformerLoads,
  );
  const capacitySuggestions =
    calculateTransformerCapacitySuggestions(transformerLoads);

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

  const guidanceClassName =
    distributionGuidance.severity === "critical"
      ? "rounded-lg bg-red-50 px-3 py-2 text-red-700"
      : distributionGuidance.severity === "warning"
        ? "rounded-lg bg-yellow-50 px-3 py-2 text-yellow-700"
        : "rounded-lg bg-green-50 px-3 py-2 text-green-700";

  const overview = (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <SectionCard title="Quote Snapshot">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">Zones</p>
              <p className="mt-1 text-lg font-semibold">{zones.length}</p>
            </div>

            <div className="rounded-xl border bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">Transformers</p>
              <p className="mt-1 text-lg font-semibold">
                {transformers.length}
              </p>
            </div>

            <div className="rounded-xl border bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">System Load</p>
              <p className="mt-1 text-lg font-semibold">
                {planningSummary.totalSystemWatts.toFixed(2)}W
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-neutral-50 p-3 text-sm text-neutral-600">
            {planningSummary.isSystemSafe
              ? "System looks safe based on current assignments."
              : "Review electrical planning before finalizing this quote."}
          </div>
        </SectionCard>

        <SectionCard title="Quote Workflow">
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
              Quote totals, transformer planning, distribution guidance, and
              capacity suggestions are active.
            </p>
          </div>
        </SectionCard>
      </div>

      <aside className="space-y-4">
        <QuoteTotalsCard totals={totals} />
      </aside>
    </div>
  );

  const zonesWorkspace = (
    <SectionCard title="Quote Zones">
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
                <ZoneCard
                  key={zone.id}
                  quoteId={quote.id}
                  zone={zone}
                  zoneTotals={zoneTotals}
                  zoneLoad={zoneLoad}
                  zoneItems={zoneItems}
                  transformers={transformers}
                  activeCatalogItems={activeCatalogItems}
                />
              );
            })}
          </div>
        )}
      </SectionCard>
  );

  const zonesActions = (
    <CollapsibleFormSection
      title="Add Zone"
      defaultOpen={zones.length === 0}
    >
      <ZoneForm quoteId={quote.id} />
    </CollapsibleFormSection>
  );

  const transformersWorkspace = (
    <SectionCard title="Transformers">
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
                <div key={transformer.id} className="rounded-xl border p-2.5 md:p-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
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
                    <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                      Over transformer capacity. Reduce load or add another
                      transformer.
                    </p>
                  ) : overSafe ? (
                    <p className="mt-2 rounded-lg bg-yellow-50 px-3 py-2 text-xs text-yellow-700">
                      Over recommended 80% safe load. Consider redistributing
                      zones.
                    </p>
                  ) : (
                    <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
                      Within recommended safe load.
                    </p>
                  )}

                  <form action={deleteTransformerAction} className="mt-2">
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
      </SectionCard>
  );

  const transformersActions = (
    <CollapsibleFormSection
      title="Add Transformer"
      defaultOpen={transformers.length === 0}
    >
      <TransformerForm quoteId={quote.id} />
    </CollapsibleFormSection>
  );

  const engineeringWorkspace = (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title="Electrical Planning Summary">
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
      </SectionCard>

      <SectionCard title="Load Distribution Guidance">
        <div className="space-y-2 text-sm">
          <div className={guidanceClassName}>
            {distributionGuidance.severity === "critical"
              ? "Critical load issue detected."
              : distributionGuidance.severity === "warning"
                ? "Review distribution before final quote."
                : "Distribution looks balanced."}
          </div>

          <div className="space-y-2">
            {distributionGuidance.messages.map((message) => (
              <p
                key={message}
                className="rounded-lg bg-neutral-50 px-3 py-2 text-xs text-neutral-600"
              >
                {message}
              </p>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Transformer Recommendation">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <span className="text-neutral-600">Total Load</span>
            <span>{transformerRecommendation.totalWatts.toFixed(2)}W</span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-neutral-600">Minimum Capacity</span>
            <span>
              {transformerRecommendation.recommendedMinimumCapacity.toFixed(2)}
              W
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-neutral-600">Suggested Size</span>
            <span>{transformerRecommendation.suggestedTransformerSize}W</span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-neutral-600">Suggested Count</span>
            <span>{transformerRecommendation.suggestedTransformerCount}</span>
          </div>

          <p className="rounded-lg bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
            {transformerRecommendation.reason}
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Transformer Capacity Suggestions">
        {capacitySuggestions.length === 0 ? (
          <p className="text-sm text-neutral-600">
            Add transformers to see capacity suggestions.
          </p>
        ) : (
          <div className="space-y-3">
            {capacitySuggestions.map((suggestion) => {
              const actionClassName =
                suggestion.suggestedAction === "add-transformer"
                  ? "bg-red-50 text-red-700"
                  : suggestion.suggestedAction === "upgrade"
                    ? "bg-yellow-50 text-yellow-700"
                    : suggestion.suggestedAction === "watch"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-green-50 text-green-700";

              return (
                <div
                  key={suggestion.transformerId}
                  className="rounded-lg border p-3"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">
                      {suggestion.transformerName}
                    </p>

                    <span
                      className={`rounded-full px-2 py-1 text-xs capitalize ${actionClassName}`}
                    >
                      {suggestion.suggestedAction.replace("-", " ")}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-neutral-600">
                    <div className="flex justify-between gap-3">
                      <span>Assigned</span>
                      <span>{suggestion.assignedWatts.toFixed(2)}W</span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span>Safe Capacity</span>
                      <span>{suggestion.safeCapacityWatts.toFixed(2)}W</span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span>Remaining Safe</span>
                      <span>{suggestion.remainingSafeWatts.toFixed(2)}W</span>
                    </div>
                  </div>

                  <p className="mt-2 rounded-lg bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
                    {suggestion.message}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>

      <InternalProfitCard totals={totals} />
    </div>
  );

  const detailsWorkspace = (
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
  );

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

      <QuoteWorkspaceNav
        overview={{ content: overview }}
        zones={{ content: zonesWorkspace, actions: zonesActions }}
        transformers={{
          content: transformersWorkspace,
          actions: transformersActions,
        }}
        engineering={{ content: engineeringWorkspace }}
        details={{ content: detailsWorkspace }}
      />
    </>
  );
}