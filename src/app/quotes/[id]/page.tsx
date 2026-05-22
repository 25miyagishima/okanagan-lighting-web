import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusPill } from "@/components/status-pill";
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
      ? "rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-red-300"
      : distributionGuidance.severity === "warning"
        ? "rounded-lg border border-yellow-400/20 bg-yellow-500/10 px-3 py-2 text-yellow-300"
        : "rounded-lg border border-green-400/20 bg-green-500/10 px-3 py-2 text-green-300";

  const overview = (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <SectionCard title="Quote Snapshot">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-[#23262B] p-3">
              <p className="text-xs text-[#5B6068]">Zones</p>
              <p className="mt-1 text-lg font-semibold text-[#F5F5F1]">{zones.length}</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#23262B] p-3">
              <p className="text-xs text-[#5B6068]">Transformers</p>
              <p className="mt-1 text-lg font-semibold text-[#F5F5F1]">
                {transformers.length}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#23262B] p-3">
              <p className="text-xs text-[#5B6068]">System Load</p>
              <p className="mt-1 text-lg font-semibold text-[#F5F5F1]">
                {planningSummary.totalSystemWatts.toFixed(2)}W
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm text-[#9EA3AA]">
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
                className="w-full rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
              >
                Archive Quote
              </button>
            </form>
          </div>

          <div className="mt-6 border-t border-white/5 pt-6 text-sm text-[#9EA3AA]">
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
          <p className="text-sm text-[#9EA3AA]">
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
          <p className="text-sm text-[#9EA3AA]">
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
                <div key={transformer.id} className="rounded-xl border border-white/5 bg-[#23262B] p-2.5 md:p-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-medium text-[#F5F5F1]">{transformer.name}</p>

                      <p className="text-sm text-[#9EA3AA]">
                        {transformer.capacityWatts}W · {transformer.voltage}V
                      </p>

                      {transformer.locationNote ? (
                        <p className="mt-1 text-xs text-[#5B6068]">
                          {transformer.locationNote}
                        </p>
                      ) : null}
                    </div>

                    <div className="text-right text-xs text-[#9EA3AA]">
                      <p>Assigned: {assignedWatts.toFixed(2)}W</p>
                      <p>
                        Safe Load: {transformer.maxRecommendedLoadWatts}W
                      </p>
                      <p>Remaining: {remainingSafeWatts.toFixed(2)}W</p>
                      <p>{safePercent.toFixed(0)}% of safe load</p>
                    </div>
                  </div>

                  {overCapacity ? (
                    <p className="mt-2 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                      Over transformer capacity. Reduce load or add another
                      transformer.
                    </p>
                  ) : overSafe ? (
                    <p className="mt-2 rounded-lg border border-yellow-400/20 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-300">
                      Over recommended 80% safe load. Consider redistributing
                      zones.
                    </p>
                  ) : (
                    <p className="mt-2 rounded-lg border border-green-400/20 bg-green-500/10 px-3 py-2 text-xs text-green-300">
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
                      className="w-full rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/20"
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
                ? "rounded-lg border border-green-400/20 bg-green-500/10 px-3 py-2 text-green-300"
                : "rounded-lg border border-yellow-400/20 bg-yellow-500/10 px-3 py-2 text-yellow-300"
            }
          >
            {planningSummary.isSystemSafe
              ? "System looks safe."
              : "Review needed before final quote."}
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#9EA3AA]">Total System Load</span>
            <span>{planningSummary.totalSystemWatts.toFixed(2)}W</span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#9EA3AA]">Assigned Load</span>
            <span>{planningSummary.assignedWatts.toFixed(2)}W</span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#9EA3AA]">Unassigned Load</span>
            <span>{planningSummary.unassignedWatts.toFixed(2)}W</span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#9EA3AA]">Unassigned Zones</span>
            <span>{planningSummary.unassignedZoneCount}</span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#9EA3AA]">Load Warnings</span>
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
                className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-[#9EA3AA]"
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
            <span className="text-[#9EA3AA]">Total Load</span>
            <span>{transformerRecommendation.totalWatts.toFixed(2)}W</span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#9EA3AA]">Minimum Capacity</span>
            <span>
              {transformerRecommendation.recommendedMinimumCapacity.toFixed(2)}
              W
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#9EA3AA]">Suggested Size</span>
            <span>{transformerRecommendation.suggestedTransformerSize}W</span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#9EA3AA]">Suggested Count</span>
            <span>{transformerRecommendation.suggestedTransformerCount}</span>
          </div>

          <p className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-[#9EA3AA]">
            {transformerRecommendation.reason}
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Transformer Capacity Suggestions">
        {capacitySuggestions.length === 0 ? (
          <p className="text-sm text-[#9EA3AA]">
            Add transformers to see capacity suggestions.
          </p>
        ) : (
          <div className="space-y-3">
            {capacitySuggestions.map((suggestion) => {
              return (
                <div
                  key={suggestion.transformerId}
                  className="rounded-lg border border-white/5 bg-[#23262B] p-3"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">
                      {suggestion.transformerName}
                    </p>

                    <StatusPill
                      tone={
                        suggestion.suggestedAction === "add-transformer"
                          ? "danger"
                          : suggestion.suggestedAction === "upgrade"
                            ? "warning"
                            : suggestion.suggestedAction === "watch"
                              ? "warning"
                              : "success"
                      }
                    >
                      {suggestion.suggestedAction.replace("-", " ")}
                    </StatusPill>
                  </div>

                  <div className="space-y-1 text-xs text-[#9EA3AA]">
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

                  <p className="mt-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-[#9EA3AA]">
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
  <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-medium text-[#F5F5F1]">Quote Details</h2>

      <StatusPill>{quote.status}</StatusPill>
    </div>

    <form action={updateQuoteAction} className="space-y-4">
      <input type="hidden" name="clientId" value={quote.clientId} />

      <div>
        <label htmlFor="quoteType" className="text-sm font-medium text-[#F5F5F1]">
          Quote Type
        </label>

        <select
          id="quoteType"
          name="quoteType"
          defaultValue={quote.quoteType}
          className="mt-1 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
        >
          <option value="outdoor">Outdoor</option>
          <option value="indoor">Indoor</option>
        </select>
      </div>

      <div>
        <label htmlFor="scope" className="text-sm font-medium text-[#F5F5F1]">
          Scope
        </label>

        <textarea
          id="scope"
          name="scope"
          defaultValue={quote.scope}
          className="mt-1 min-h-28 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] placeholder:text-[#5B6068] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="discountType" className="text-sm font-medium text-[#F5F5F1]">
            Discount Type
          </label>

          <select
            id="discountType"
            name="discountType"
            defaultValue={quote.discountType}
            className="mt-1 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
          >
            <option value="none">None</option>
            <option value="fixed">Fixed $</option>
            <option value="percentage">Percentage %</option>
          </select>
        </div>

        <div>
          <label htmlFor="discountValue" className="text-sm font-medium text-[#F5F5F1]">
            Discount Value
          </label>

          <input
            id="discountValue"
            name="discountValue"
            type="number"
            step="0.01"
            defaultValue={quote.discountValue}
            className="mt-1 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] placeholder:text-[#5B6068] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="depositType" className="text-sm font-medium text-[#F5F5F1]">
            Deposit Type
          </label>

          <select
            id="depositType"
            name="depositType"
            defaultValue={quote.depositType}
            className="mt-1 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
          >
            <option value="none">None</option>
            <option value="fixed">Fixed $</option>
            <option value="percentage">Percentage %</option>
          </select>
        </div>

        <div>
          <label htmlFor="depositValue" className="text-sm font-medium text-[#F5F5F1]">
            Deposit Value
          </label>

          <input
            id="depositValue"
            name="depositValue"
            type="number"
            step="0.01"
            defaultValue={quote.depositValue}
            className="mt-1 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] placeholder:text-[#5B6068] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="quoteLevelLabourHours"
            className="text-sm font-medium text-[#F5F5F1]"
          >
            Quote-Level Labour Hours
          </label>

          <input
            id="quoteLevelLabourHours"
            name="quoteLevelLabourHours"
            type="number"
            step="0.01"
            defaultValue={quote.quoteLevelLabourHours}
            className="mt-1 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] placeholder:text-[#5B6068] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="quoteLevelHourlyRate"
            className="text-sm font-medium text-[#F5F5F1]"
          >
            Hourly Rate
          </label>

          <input
            id="quoteLevelHourlyRate"
            name="quoteLevelHourlyRate"
            type="number"
            step="0.01"
            defaultValue={quote.quoteLevelHourlyRate}
            className="mt-1 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] placeholder:text-[#5B6068] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
          />
        </div>
      </div>

      <div>
        <label htmlFor="clientNotes" className="text-sm font-medium text-[#F5F5F1]">
          Client-Facing Notes
        </label>

        <textarea
          id="clientNotes"
          name="clientNotes"
          defaultValue={quote.clientNotes || ""}
          className="mt-1 min-h-20 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] placeholder:text-[#5B6068] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
        />
      </div>

      <div>
        <label htmlFor="internalNotes" className="text-sm font-medium text-[#F5F5F1]">
          Internal Notes
        </label>

        <textarea
          id="internalNotes"
          name="internalNotes"
          defaultValue={quote.internalNotes || ""}
          className="mt-1 min-h-20 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] placeholder:text-[#5B6068] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] px-4 py-2 text-sm font-medium text-[#0D0E10] shadow-sm transition-all duration-200 hover:shadow-[0_0_18px_rgba(216,139,45,0.24)]"
      >
        Save Quote
      </button>
    </form>
  </section>
);

return (
  <div className="min-h-screen bg-[#0D0E10] px-3 py-4 text-[#F5F5F1] md:px-6 md:py-6">
    <div className="mb-4">
      <Link
        href="/quotes"
        className="text-sm text-[#9EA3AA] transition-colors hover:text-[#F5F5F1]"
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
  </div>
);
}