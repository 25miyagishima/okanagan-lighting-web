import { StatusPill } from "@/components/status-pill";
import { SectionCard } from "@/features/quotes/quote-sidebar/section-card";
import type { JobHandoffSummary } from "@/features/job-handoff/job-handoff-summary";
import { formatCurrency } from "@/lib/utils";

type JobHandoffPanelProps = {
  summary: JobHandoffSummary;
};

export function JobHandoffPanel({
  summary,
}: JobHandoffPanelProps) {
  return (
    <SectionCard
      title="Job Handoff Summary"
      actions={
        summary.readyForInstall ? (
          <StatusPill tone="success">ready</StatusPill>
        ) : (
          <StatusPill tone="warning">not ready</StatusPill>
        )
      }
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
          <p className="text-sm font-medium text-[#F5F5F1]">
            {summary.quote.clientName}
          </p>

          <p className="mt-1 text-sm leading-relaxed text-[#A7ABB1]">
            {summary.quote.clientSiteAddress || "No site address"}
          </p>

          <p className="mt-2 text-xs text-[#626872]">
            {summary.quote.quoteNumber} Rev{" "}
            {summary.quote.revisionNumber}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <p className="text-[10px] uppercase tracking-wide text-[#626872]">
              Proposal Acceptance
            </p>

            <p className="mt-1 text-sm text-[#F5F5F1]">
              {summary.accepted ? "Accepted" : "Not accepted"}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <p className="text-[10px] uppercase tracking-wide text-[#626872]">
              Install Readiness
            </p>

            <p className="mt-1 text-sm text-[#F5F5F1]">
              {summary.readyForInstall ? "Ready" : "Not ready"}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <p className="text-[10px] uppercase tracking-wide text-[#626872]">
              Zones
            </p>

            <p className="mt-1 text-sm text-[#F5F5F1]">
              {summary.totalZones}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <p className="text-[10px] uppercase tracking-wide text-[#626872]">
              Fixtures / Items
            </p>

            <p className="mt-1 text-sm text-[#F5F5F1]">
              {summary.totalFixtures}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <p className="text-[10px] uppercase tracking-wide text-[#626872]">
              Transformers
            </p>

            <p className="mt-1 text-sm text-[#F5F5F1]">
              {summary.totalTransformers}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <p className="text-[10px] uppercase tracking-wide text-[#626872]">
              System Load
            </p>

            <p className="mt-1 text-sm text-[#F5F5F1]">
              {summary.totalSystemWatts.toFixed(2)}W
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#D88B2D]/20 bg-[#D88B2D]/10 p-4">
          <p className="text-sm font-medium text-[#E2B15A]">
            Financial Handoff
          </p>

          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-[#A7ABB1]">Original Quote</span>
              <span className="text-[#F5F5F1]">
                {formatCurrency(summary.totals.total)}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-[#A7ABB1]">
                Approved Change Orders
              </span>
              <span className="text-[#F5F5F1]">
                {formatCurrency(summary.approvedChangeOrderTotal)}
              </span>
            </div>

            <div className="flex justify-between gap-3 border-t border-[#D88B2D]/20 pt-3 font-semibold">
              <span className="text-[#F5F5F1]">
                Revised Project Total
              </span>
              <span className="text-[#E2B15A]">
                {formatCurrency(summary.revisedProjectTotal)}
              </span>
            </div>
          </div>
        </div>

        {summary.installReadiness?.readinessNotes ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
            <p className="text-[10px] uppercase tracking-wide text-[#626872]">
              Install Notes
            </p>

            <p className="mt-2 text-sm leading-relaxed text-[#A7ABB1]">
              {summary.installReadiness.readinessNotes}
            </p>
          </div>
        ) : null}

        {!summary.readyForInstall ? (
          <p className="rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-4 text-sm text-yellow-300">
            This quote is not ready for job handoff yet. Complete install
            readiness before scheduling field work.
          </p>
        ) : (
          <p className="rounded-2xl border border-green-400/20 bg-green-500/10 p-4 text-sm text-green-300">
            This quote is ready to be handed off for installation.
          </p>
        )}
      </div>
    </SectionCard>
  );
}