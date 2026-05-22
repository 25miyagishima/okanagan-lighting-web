import { SectionCard } from "./section-card";
import type { QuoteTotals } from "@/features/quotes/quote-totals";
import { formatCurrency } from "@/lib/utils";

type QuoteTotalsCardProps = {
  totals: QuoteTotals;
};

export function QuoteTotalsCard({ totals }: QuoteTotalsCardProps) {
  return (
    <SectionCard title="Quote Totals">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-[#9EA3AA]">Materials</span>
          <span className="text-[#F5F5F1]">
            {formatCurrency(totals.materialSubtotal)}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-[#9EA3AA]">Zone Labour</span>
          <span className="text-[#F5F5F1]">
            {formatCurrency(totals.zoneLabourSubtotal)}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-[#9EA3AA]">Quote Labour</span>
          <span className="text-[#F5F5F1]">
            {formatCurrency(totals.quoteLevelLabourSubtotal)}
          </span>
        </div>

        <div className="flex justify-between gap-3 border-t border-white/5 pt-3">
          <span className="text-[#9EA3AA]">Subtotal</span>
          <span className="text-[#F5F5F1]">
            {formatCurrency(totals.subtotalBeforeDiscount)}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-[#9EA3AA]">Discount</span>
          <span className="text-red-300">
            -{formatCurrency(totals.discountAmount)}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-[#9EA3AA]">Tax</span>
          <span className="text-[#F5F5F1]">
            {formatCurrency(totals.taxAmount)}
          </span>
        </div>

        <div className="flex justify-between gap-3 border-t border-white/5 pt-3 text-base font-semibold">
          <span className="text-[#F5F5F1]">Total</span>

          <span className="text-[#E2B15A]">
            {formatCurrency(totals.total)}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-[#9EA3AA]">Deposit</span>
          <span className="text-[#F5F5F1]">
            {formatCurrency(totals.depositAmount)}
          </span>
        </div>

        <div className="flex justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3">
          <span className="font-medium text-[#F5F5F1]">
            Balance Due
          </span>

          <span className="font-semibold text-[#E2B15A]">
            {formatCurrency(totals.balanceDue)}
          </span>
        </div>
      </div>
    </SectionCard>
  );
}