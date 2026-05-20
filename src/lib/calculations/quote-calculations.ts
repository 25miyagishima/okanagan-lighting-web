import type { Quote, QuoteItem, Zone } from "@/types/database";

export type QuoteTotals = {
  materialsSubtotal: number;
  labourSubtotal: number;
  discountAmount: number;
  taxableMaterialsSubtotal: number;
  taxAmount: number;
  grandTotal: number;
  depositAmount: number;
  balanceDue: number;
  estimatedProfit: number;
  estimatedMarginPercent: number;
};

export function calculateSellPrice(
  cost: number,
  markupPercent: number
): number {
  return cost + cost * (markupPercent / 100);
}

export function calculateQuoteTotals(params: {
  quote: Quote;
  zones: Zone[];
  items: QuoteItem[];
  materialTaxRate: number;
  labourTaxable: boolean;
}): QuoteTotals {
  const {
    quote,
    zones,
    items,
    materialTaxRate,
    labourTaxable,
  } = params;

  const materialsSubtotal = items.reduce((sum, item) => {
    return sum + item.sellPriceSnapshot * item.quantity;
  }, 0);

  const materialCost = items.reduce((sum, item) => {
    return sum + item.costSnapshot * item.quantity;
  }, 0);

  const zoneLabourSubtotal = zones.reduce((sum, zone) => {
    return sum + zone.labourHours * zone.hourlyRate;
  }, 0);

  const quoteLabourSubtotal =
    quote.quoteLevelLabourHours *
    quote.quoteLevelHourlyRate;

  const labourSubtotal =
    zoneLabourSubtotal + quoteLabourSubtotal;

  const preDiscountSubtotal =
    materialsSubtotal + labourSubtotal;

  const discountAmount =
    quote.discountType === "fixed"
      ? quote.discountValue
      : quote.discountType === "percentage"
      ? preDiscountSubtotal * (quote.discountValue / 100)
      : 0;

  const taxableMaterialsSubtotal = items.reduce(
    (sum, item) => {
      if (!item.taxableSnapshot) return sum;

      return (
        sum +
        item.sellPriceSnapshot * item.quantity
      );
    },
    0
  );

  const labourTaxableAmount = labourTaxable
    ? labourSubtotal
    : 0;

  const taxAmount =
    (taxableMaterialsSubtotal +
      labourTaxableAmount) *
    (materialTaxRate / 100);

  const grandTotal =
    preDiscountSubtotal -
    discountAmount +
    taxAmount;

  const depositAmount =
    quote.depositType === "fixed"
      ? quote.depositValue
      : quote.depositType === "percentage"
      ? grandTotal * (quote.depositValue / 100)
      : 0;

  const balanceDue =
    grandTotal - depositAmount;

  const estimatedProfit =
    materialsSubtotal -
    materialCost +
    labourSubtotal;

  const estimatedMarginPercent =
    grandTotal > 0
      ? (estimatedProfit / grandTotal) * 100
      : 0;

  return {
    materialsSubtotal,
    labourSubtotal,
    discountAmount,
    taxableMaterialsSubtotal,
    taxAmount,
    grandTotal,
    depositAmount,
    balanceDue,
    estimatedProfit,
    estimatedMarginPercent,
  };
}

export function calculateConductorTotals(params: {
  zones: Zone[];
  costPerFoot: number;
  rollLengthFeet: number;
}) {
  const totalLengthFeet = params.zones.reduce(
    (sum, zone) => sum + zone.wireLengthFeet,
    0
  );

  const totalCost =
    totalLengthFeet * params.costPerFoot;

  const requiredRolls =
    params.rollLengthFeet > 0
      ? Math.ceil(
          totalLengthFeet /
            params.rollLengthFeet
        )
      : 0;

  return {
    totalLengthFeet,
    costPerFoot: params.costPerFoot,
    requiredRolls,
    totalCost,
  };
}
