import { SectionCard } from "./section-card";
import type { QuoteTotals } from "@/features/quotes/quote-totals";
import { formatCurrency, formatPercent } from "@/lib/utils";

type InternalProfitCardProps = {
  totals: QuoteTotals;
};

export function InternalProfitCard({ totals }: InternalProfitCardProps) {
  return (
    <SectionCard title="Internal Profit Preview" defaultOpen={false}>      <div className="space-y-2 text-sm">
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
    </SectionCard>
  );
}