import type { RevisionComparison } from "@/features/quotes/quote-actions";
import { StatusPill } from "@/components/status-pill";
import { SectionCard } from "@/features/quotes/quote-sidebar/section-card";

type RevisionComparisonPanelProps = {
  comparison: RevisionComparison | null;
};

export function RevisionComparisonPanel({
  comparison,
}: RevisionComparisonPanelProps) {
  if (!comparison) {
    return null;
  }

  const { current, previous, changes } = comparison;
  const changedItems = changes.filter((change) => change.changed);

  return (
    <SectionCard
      title="Revision Comparison"
      actions={
        previous ? (
          <StatusPill tone={changedItems.length > 0 ? "warning" : "success"}>
            {changedItems.length} change(s)
          </StatusPill>
        ) : (
          <StatusPill>original</StatusPill>
        )
      }
    >
      {!previous ? (
        <p className="text-sm leading-relaxed text-[#A7ABB1]">
          This is the original revision. Create a revision to begin comparing
          proposal changes.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#626872]">
                  Comparing
                </p>

                <p className="mt-1 text-sm text-[#F5F5F1]">
                  Rev {previous.revisionNumber} → Rev {current.revisionNumber}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <StatusPill>{previous.status}</StatusPill>
                <span className="text-xs text-[#626872]">to</span>
                <StatusPill>{current.status}</StatusPill>
              </div>
            </div>
          </div>

          {changedItems.length === 0 ? (
            <p className="rounded-2xl border border-green-400/20 bg-green-500/10 p-4 text-sm text-green-300">
              No major quote-level changes detected between these revisions.
            </p>
          ) : (
            <div className="space-y-3">
              {changedItems.map((change) => (
                <div
                  key={change.label}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"
                >
                  <p className="text-sm font-medium text-[#F5F5F1]">
                    {change.label}
                  </p>

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-white/[0.05] bg-[#16181B]/70 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-[#626872]">
                        Previous
                      </p>

                      <p className="mt-1 text-sm leading-relaxed text-[#A7ABB1]">
                        {change.previousValue}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#D88B2D]/20 bg-[#D88B2D]/10 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-[#E2B15A]">
                        Current
                      </p>

                      <p className="mt-1 text-sm leading-relaxed text-[#F5F5F1]">
                        {change.currentValue}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}