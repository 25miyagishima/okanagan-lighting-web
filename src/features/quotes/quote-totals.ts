import type { QuoteItem, Zone } from "@/types/database";
import type { DepositType, DiscountType } from "@/types/app";

export type ZoneTotals = {
  zoneId: string;
  materialSubtotal: number;
  labourSubtotal: number;
  total: number;
};

export type QuoteTotalsInput = {
  zones: Zone[];
  quoteItems: QuoteItem[];
  quoteLevelLabourHours: number;
  quoteLevelHourlyRate: number;
  discountType: DiscountType;
  discountValue: number;
  depositType: DepositType;
  depositValue: number;
  materialTaxRate: number;
  labourTaxable: boolean;
};

export type QuoteTotals = {
  materialSubtotal: number;
  zoneLabourSubtotal: number;
  quoteLevelLabourSubtotal: number;
  labourSubtotal: number;
  subtotalBeforeDiscount: number;
  discountAmount: number;
  taxableMaterialSubtotal: number;
  taxAmount: number;
  total: number;
  depositAmount: number;
  balanceDue: number;
  estimatedMaterialCost: number;
  estimatedGrossProfit: number;
  estimatedMarginPercent: number;
  zoneTotals: ZoneTotals[];
};

function calculateDiscountAmount(
  discountType: DiscountType,
  discountValue: number,
  subtotal: number,
) {
  if (discountType === "fixed") {
    return Math.min(discountValue, subtotal);
  }

  if (discountType === "percentage") {
    return subtotal * (discountValue / 100);
  }

  return 0;
}

function calculateDepositAmount(
  depositType: DepositType,
  depositValue: number,
  total: number,
) {
  if (depositType === "fixed") {
    return Math.min(depositValue, total);
  }

  if (depositType === "percentage") {
    return total * (depositValue / 100);
  }

  return 0;
}

export function calculateQuoteTotals(
  input: QuoteTotalsInput,
): QuoteTotals {
  const materialSubtotal = input.quoteItems.reduce((sum, item) => {
    return sum + item.sellPriceSnapshot * item.quantity;
  }, 0);

  const estimatedMaterialCost = input.quoteItems.reduce((sum, item) => {
    return sum + item.costSnapshot * item.quantity;
  }, 0);

  const taxableMaterialSubtotal = input.quoteItems.reduce((sum, item) => {
    if (!item.taxableSnapshot) {
      return sum;
    }

    return sum + item.sellPriceSnapshot * item.quantity;
  }, 0);

  const zoneLabourSubtotal = input.zones.reduce((sum, zone) => {
    return sum + zone.labourHours * zone.hourlyRate;
  }, 0);

  const quoteLevelLabourSubtotal =
    input.quoteLevelLabourHours * input.quoteLevelHourlyRate;

  const labourSubtotal =
    zoneLabourSubtotal + quoteLevelLabourSubtotal;

  const subtotalBeforeDiscount =
    materialSubtotal + labourSubtotal;

  const discountAmount = calculateDiscountAmount(
    input.discountType,
    input.discountValue,
    subtotalBeforeDiscount,
  );

  const labourTaxableSubtotal = input.labourTaxable
    ? labourSubtotal
    : 0;

  const taxAmount =
    (taxableMaterialSubtotal + labourTaxableSubtotal) *
    (input.materialTaxRate / 100);

  const total =
    subtotalBeforeDiscount -
    discountAmount +
    taxAmount;

  const depositAmount = calculateDepositAmount(
    input.depositType,
    input.depositValue,
    total,
  );

  const balanceDue = total - depositAmount;

  const estimatedGrossProfit =
    materialSubtotal -
    estimatedMaterialCost +
    labourSubtotal -
    discountAmount;

  const estimatedMarginPercent =
    total > 0
      ? (estimatedGrossProfit / total) * 100
      : 0;

  const zoneTotals = input.zones.map((zone) => {
    const zoneItems = input.quoteItems.filter(
      (item) => item.zoneId === zone.id,
    );

    const zoneMaterialSubtotal = zoneItems.reduce(
      (sum, item) => {
        return sum + item.sellPriceSnapshot * item.quantity;
      },
      0,
    );

    const zoneLabour =
      zone.labourHours * zone.hourlyRate;

    return {
      zoneId: zone.id,
      materialSubtotal: zoneMaterialSubtotal,
      labourSubtotal: zoneLabour,
      total: zoneMaterialSubtotal + zoneLabour,
    };
  });

  return {
    materialSubtotal,
    zoneLabourSubtotal,
    quoteLevelLabourSubtotal,
    labourSubtotal,
    subtotalBeforeDiscount,
    discountAmount,
    taxableMaterialSubtotal,
    taxAmount,
    total,
    depositAmount,
    balanceDue,
    estimatedMaterialCost,
    estimatedGrossProfit,
    estimatedMarginPercent,
    zoneTotals,
  };
}