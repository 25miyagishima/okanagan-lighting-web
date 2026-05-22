import { SectionCard } from "./section-card";
import type { QuoteTotals } from "@/features/quotes/quote-totals";
import { formatCurrency, formatPercent } from "@/lib/utils";

type InternalProfitCardProps = {
  totals: QuoteTotals;
};

export function InternalProfitCard({
  totals,
}: InternalProfitCardProps) {
  return (
    <SectionCard
      title="Internal Profit Preview"
      defaultOpen={false}
    >
      <div className="space-y-2 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-[#9EA3AA]">
            Material Cost
          </span>

          <span className="text-[#F5F5F1]">
            {formatCurrency(totals.estimatedMaterialCost)}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-[#9EA3AA]">
            Gross Profit
          </span>

          <span className="font-medium text-[#E2B15A]">
            {formatCurrency(totals.estimatedGrossProfit)}
          </span>
        </div>

        <div className="flex justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3">
          <span className="font-medium text-[#F5F5F1]">
            Margin
          </span>

          <span className="font-semibold text-[#E2B15A]">
            {formatPercent(totals.estimatedMarginPercent)}
          </span>
        </div>
      </div>
    </SectionCard>
  );
}