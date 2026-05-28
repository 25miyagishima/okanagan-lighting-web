import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusPill } from "@/components/status-pill";
import { PageHeader } from "@/components/page-header";
import { CollapsibleFormSection } from "@/components/collapsible-form-section";
import { AppButton } from "@/components/ui/app-button";
import { AppSection } from "@/components/ui/app-section";
import { AppSelect } from "@/components/ui/app-select";
import { AppTextarea } from "@/components/ui/app-textarea";
import { FormField } from "@/components/ui/form-field";
import { PageContainer } from "@/components/ui/page-container";
import { theme } from "@/styles/theme";
import { ClientQuotePdfButton } from "@/features/pdf/components/client-quote-pdf-button";
import { MaterialListPdfButton } from "@/features/pdf/components/material-list-pdf-button";
import { BusinessProfitPdfButton } from "@/features/pdf/components/business-profit-pdf-button";
import { getCatalogItems } from "@/features/catalog/catalog-actions";
import { InternalProfitCard } from "@/features/quotes/quote-sidebar/internal-profit-card";
import { QuoteTotalsCard } from "@/features/quotes/quote-sidebar/quote-totals-card";
import { SectionCard } from "@/features/quotes/quote-sidebar/section-card";
import {
  archiveQuote,
  createQuoteRevision,
  duplicateQuote,
  getQuoteById,
  getQuoteRevisions,
  updateQuote,
  updateQuoteStatus,
  getRevisionComparison,
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
import { QuoteMediaUpload } from "@/features/media/components/quote-media-upload";
import { MediaGallery } from "@/features/media/components/media-gallery";
import { getMediaByQuoteId } from "@/features/media/actions/get-media";
import { getMediaSignedUrls } from "@/features/media/actions/get-media-signed-urls";
import { RevisionComparisonPanel } from "@/features/quotes/revision-comparison-panel";
import { ChangeOrderPanel } from "@/features/change-orders/change-order-panel";
import { getChangeOrdersByQuoteId } from "@/features/change-orders/change-order-actions";
import { formatCurrency } from "@/lib/utils";
import { QuoteAcceptancePanel } from "@/features/quote-acceptance/quote-acceptance-panel";
import { getQuoteAcceptanceByQuoteId } from "@/features/quote-acceptance/quote-acceptance-actions";
import { InstallReadinessPanel } from "@/features/install-readiness/install-readiness-panel";
import { getInstallReadinessByQuoteId } from "@/features/install-readiness/install-readiness-actions";
import { JobHandoffPanel } from "@/features/job-handoff/job-handoff-panel";
import { createJobHandoffSummary } from "@/features/job-handoff/job-handoff-summary";

type QuoteDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type WorkflowStatus =
  | "draft"
  | "sent"
  | "approved"
  | "scheduled"
  | "installed"
  | "invoiced"
  | "paid"
  | "archived";

  function formatStableDate(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}

export default async function QuoteDetailPage({
  params,
}: QuoteDetailPageProps) {
  const { id } = await params;

  const quote = await getQuoteById(id);

  if (!quote) {
    notFound();
  }

  const revisions = await getQuoteRevisions(quote.quoteNumber);
  const revisionComparison = await getRevisionComparison(id);
  const changeOrders = await getChangeOrdersByQuoteId(id);
  const zones = await getZonesByQuoteId(id);
  const catalogItems = await getCatalogItems();
  const quoteItems = await getQuoteItemsByQuoteId(id);
  const transformers = await getTransformersByQuoteId(id);
  const media = await getMediaByQuoteId(id);
  const mediaWithUrls = await getMediaSignedUrls(media);
  const acceptance = await getQuoteAcceptanceByQuoteId(id);
  const installReadiness = await getInstallReadinessByQuoteId(id);
  const quoteMedia = mediaWithUrls.filter(
    (item) => item.ownerType === "quote",
  );

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

const approvedChangeOrderTotal = changeOrders
  .filter((changeOrder) => changeOrder.status === "approved")
  .reduce((total, changeOrder) => total + changeOrder.grandTotal, 0);

const revisedProjectTotal =
  totals.total + approvedChangeOrderTotal;
  
  const zoneLoads = calculateZoneLoads(zones, quoteItems);
  const transformerLoads = calculateTransformerLoads(transformers, zoneLoads);
  const jobHandoffSummary = createJobHandoffSummary({
  quote,
  zones,
  quoteItems,
  transformers,
  zoneLoads,
  transformerLoads,
  totals,
  acceptance,
  installReadiness,
  changeOrders,
});
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

  async function duplicateQuoteAction() {
    "use server";
    await duplicateQuote(id);
  }

  async function createQuoteRevisionAction() {
    "use server";
    await createQuoteRevision(id);
  }

  async function updateQuoteStatusAction(formData: FormData) {
    "use server";

    const status = String(formData.get("status") ?? "draft") as WorkflowStatus;
    await updateQuoteStatus(id, status);
  }

  async function deleteTransformerAction(formData: FormData) {
    "use server";

    const transformerId = String(formData.get("transformerId") ?? "");
    if (!transformerId) return;

    await deleteTransformer(transformerId, id);
  }

  const quoteLocked =
    quote.status !== "draft" && quote.status !== "sent";

  const guidanceClassName =
    distributionGuidance.severity === "critical"
      ? "rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-red-300"
      : distributionGuidance.severity === "warning"
        ? "rounded-lg border border-yellow-400/20 bg-yellow-500/10 px-3 py-2 text-yellow-300"
        : "rounded-lg border border-green-400/20 bg-green-500/10 px-3 py-2 text-green-300";

  const workflowStatusTone =
    quote.status === "approved"
      ? "success"
      : quote.status === "sent"
        ? "warning"
        : quote.status === "archived"
          ? "danger"
          : "neutral";

 const revisionHistory = (
  <SectionCard title="Revision History">
    {revisions.length === 0 ? (
      <p className="text-sm text-[#9EA3AA]">
        No revisions found for this quote.
      </p>
    ) : (
      <div className="space-y-3">
        {revisions.map((revision) => {
          const active = revision.id === quote.id;

          return (
            <Link
              key={revision.id}
              href={`/quotes/${revision.id}`}
              className={
                active
                  ? "block rounded-2xl border border-[#D88B2D]/30 bg-[#D88B2D]/10 p-4"
                  : "block rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-200 hover:border-[#D88B2D]/25 hover:bg-white/[0.045]"
              }
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-[#F5F5F1]">
                      {revision.quoteNumber} Rev {revision.revisionNumber}
                    </p>

                    {active ? (
                      <span className="rounded-full bg-[#D88B2D]/20 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[#E2B15A]">
                        Current
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1 text-sm text-[#A7ABB1]">
                    Created {formatStableDate(revision.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <StatusPill>{revision.status}</StatusPill>
                  <span className="text-sm text-[#E2B15A]">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    )}
  </SectionCard>
);

  const overview = (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {quoteLocked ? (
          <SectionCard
            title="Quote Locked"
            actions={<StatusPill tone="warning">locked</StatusPill>}
          >
            <p className="text-sm leading-relaxed text-[#A7ABB1]">
              This quote is locked because it has moved beyond draft/sent
              status. Create a revision before making pricing, zone, fixture,
              transformer, or engineering changes.
            </p>
          </SectionCard>
        ) : null}

<SectionCard title="Quote Snapshot">
  <div className="grid gap-3 md:grid-cols-4">
    <div className={`${theme.surface.secondary} p-3`}>
      <p className="text-xs text-[#5B6068]">Zones</p>
      <p className="mt-1 text-lg font-semibold text-[#F5F5F1]">
        {zones.length}
      </p>
    </div>

    <div className={`${theme.surface.secondary} p-3`}>
      <p className="text-xs text-[#5B6068]">Transformers</p>
      <p className="mt-1 text-lg font-semibold text-[#F5F5F1]">
        {transformers.length}
      </p>
    </div>

    <div className={`${theme.surface.secondary} p-3`}>
      <p className="text-xs text-[#5B6068]">System Load</p>
      <p className="mt-1 text-lg font-semibold text-[#F5F5F1]">
        {planningSummary.totalSystemWatts.toFixed(2)}W
      </p>
    </div>

    <div className={`${theme.surface.secondary} p-3`}>
      <p className="text-xs text-[#5B6068]">Revised Total</p>
      <p className="mt-1 text-lg font-semibold text-[#E2B15A]">
        {formatCurrency(revisedProjectTotal)}
      </p>
    </div>
  </div>

  <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm text-[#9EA3AA]">
    {planningSummary.isSystemSafe
      ? "System looks safe based on current assignments."
      : "Review electrical planning before finalizing this quote."}
  </div>
</SectionCard>

        {revisionHistory}
<RevisionComparisonPanel comparison={revisionComparison} />

<ChangeOrderPanel
  quoteId={quote.id}
  changeOrders={changeOrders}
  quoteLocked={quoteLocked}
/>

<QuoteAcceptancePanel
  quoteId={quote.id}
  acceptance={acceptance}
/>

<InstallReadinessPanel
  quoteId={quote.id}
  readiness={installReadiness}
/>

<JobHandoffPanel summary={jobHandoffSummary} />

        <SectionCard title="Quote Photos">
          <div className="space-y-4">
            <QuoteMediaUpload quoteId={quote.id} />
            <MediaGallery media={quoteMedia} title="Quote Photos" />
          </div>
        </SectionCard>

        <SectionCard
          title="Proposal Controls"
          actions={
            <StatusPill tone={workflowStatusTone}>{quote.status}</StatusPill>
          }
        >
          <div className="space-y-5">
            <div className="space-y-3">
              <p className={theme.typography.cardTitle}>Proposal Documents</p>

              <ClientQuotePdfButton quoteId={quote.id} />
              <MaterialListPdfButton quoteId={quote.id} />
              <BusinessProfitPdfButton quoteId={quote.id} />
            </div>

            <div className="border-t border-white/5 pt-5">
              <div className="space-y-3">
                <p className={theme.typography.cardTitle}>Status Workflow</p>

                <form action={updateQuoteStatusAction}>
                  <input type="hidden" name="status" value="sent" />
                  <AppButton
                    type="submit"
                    variant="secondary"
                    className="w-full"
                  >
                    Mark Sent
                  </AppButton>
                </form>

                <form action={updateQuoteStatusAction}>
                  <input type="hidden" name="status" value="approved" />
                  <AppButton
                    type="submit"
                    variant="primary"
                    className="w-full"
                  >
                    Mark Approved
                  </AppButton>
                </form>
              </div>
            </div>

            <div className="border-t border-white/5 pt-5">
              <div className="space-y-3">
                <p className={theme.typography.cardTitle}>Quote Management</p>

                <form action={duplicateQuoteAction}>
                  <AppButton
                    type="submit"
                    variant="secondary"
                    className="w-full"
                  >
                    Duplicate Quote
                  </AppButton>
                </form>

                <form action={createQuoteRevisionAction}>
                  <AppButton
                    type="submit"
                    variant="secondary"
                    className="w-full"
                  >
                    Create Revision
                  </AppButton>
                </form>

                <form action={archiveQuoteAction}>
                  <AppButton
                    type="submit"
                    variant="danger"
                    className="w-full"
                  >
                    Archive Quote
                  </AppButton>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/5 pt-6 text-sm text-[#9EA3AA]">
            <p>
              Proposal exports, status controls, revisions, duplication, and
              quote management tools are active.
            </p>
          </div>
        </SectionCard>
      </div>

      <aside className="sticky top-5 space-y-4 self-start">
        <QuoteTotalsCard
  totals={totals}
  approvedChangeOrderTotal={approvedChangeOrderTotal} />
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

            const zoneLoad = zoneLoads.find((load) => load.zoneId === zone.id);

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
    <CollapsibleFormSection title="Add Zone" defaultOpen={zones.length === 0}>
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
              <div
                key={transformer.id}
                className={`${theme.surface.secondary} p-2.5 md:p-3`}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-medium text-[#F5F5F1]">
                      {transformer.name}
                    </p>

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
                    <p>Safe Load: {transformer.maxRecommendedLoadWatts}W</p>
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
            {capacitySuggestions.map((suggestion) => (
              <div
                key={suggestion.transformerId}
                className={`${theme.surface.secondary} p-3`}
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
            ))}
          </div>
        )}
      </SectionCard>

      <InternalProfitCard totals={totals} />
    </div>
  );

  const detailsWorkspace = (
    <AppSection
      title="Quote Details"
      description="Manage quote configuration, scope details, and proposal information."
    >
      <div className="mb-4 flex justify-end">
        <StatusPill>{quote.status}</StatusPill>
      </div>

      {quoteLocked ? (
        <div className={theme.surface.warning}>
          <p className="text-sm text-yellow-300">
            This quote is locked. Create a revision before editing quote
            details.
          </p>
        </div>
      ) : null}

      <form action={updateQuoteAction} className={theme.form.stack}>
        <input type="hidden" name="clientId" value={quote.clientId} />

        <FormField
          id="quoteType"
          label="Quote Type"
          helperText="Select whether this proposal is indoor or outdoor focused."
        >
          <AppSelect
            id="quoteType"
            name="quoteType"
            defaultValue={quote.quoteType}
            disabled={quoteLocked}
          >
            <option value="outdoor">Outdoor</option>
            <option value="indoor">Indoor</option>
          </AppSelect>
        </FormField>

        <FormField
          id="scope"
          label="Project Scope"
          helperText="Internal project notes and high-level proposal scope."
        >
          <AppTextarea
            id="scope"
            name="scope"
            defaultValue={quote.scope}
            className="min-h-32"
            disabled={quoteLocked}
          />
        </FormField>

        <AppButton
          type="submit"
          variant="primary"
          className="w-full"
          disabled={quoteLocked}
        >
          {quoteLocked ? "Quote Locked" : "Save Quote"}
        </AppButton>
      </form>
    </AppSection>
  );

  return (
    <PageContainer>
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
  transformers={{
    content: transformersWorkspace,
    actions: quoteLocked ? undefined : transformersActions,
  }}
  zones={{
    content: zonesWorkspace,
    actions: quoteLocked ? undefined : zonesActions,
  }}
  engineering={{ content: engineeringWorkspace }}
  details={{ content: detailsWorkspace }}
/>
    </PageContainer>
  );
}