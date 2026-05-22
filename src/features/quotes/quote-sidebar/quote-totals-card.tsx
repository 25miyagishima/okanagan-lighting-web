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
    </SectionCard>
  );
}