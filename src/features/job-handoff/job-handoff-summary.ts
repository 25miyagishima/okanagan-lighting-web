import type {
  ChangeOrder,
  InstallReadiness,
  QuoteAcceptance,
  QuoteItem,
  Transformer,
  Zone,
} from "@/types/database";
import type { QuoteWithClient } from "@/features/quotes/quote-actions";
import type { QuoteTotals } from "@/features/quotes/quote-totals";
import type {
  TransformerLoadSummary,
  ZoneLoadSummary,
} from "@/features/transformers/load-calculations";

export type JobHandoffSummary = {
  quote: QuoteWithClient;
  zones: Zone[];
  quoteItems: QuoteItem[];
  transformers: Transformer[];
  zoneLoads: ZoneLoadSummary[];
  transformerLoads: TransformerLoadSummary[];
  totals: QuoteTotals;
  acceptance: QuoteAcceptance | null;
  installReadiness: InstallReadiness | null;
  changeOrders: ChangeOrder[];

  approvedChangeOrderTotal: number;
  revisedProjectTotal: number;

  totalZones: number;
  totalFixtures: number;
  totalTransformers: number;
  totalSystemWatts: number;

  readyForInstall: boolean;
  accepted: boolean;
};

export function createJobHandoffSummary({
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
}: {
  quote: QuoteWithClient;
  zones: Zone[];
  quoteItems: QuoteItem[];
  transformers: Transformer[];
  zoneLoads: ZoneLoadSummary[];
  transformerLoads: TransformerLoadSummary[];
  totals: QuoteTotals;
  acceptance: QuoteAcceptance | null;
  installReadiness: InstallReadiness | null;
  changeOrders: ChangeOrder[];
}): JobHandoffSummary {
  const approvedChangeOrders = changeOrders.filter(
    (changeOrder) => changeOrder.status === "approved",
  );

  const approvedChangeOrderTotal = approvedChangeOrders.reduce(
    (total, changeOrder) => total + changeOrder.grandTotal,
    0,
  );

  const totalFixtures = quoteItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalSystemWatts = zoneLoads.reduce(
    (total, zoneLoad) => total + zoneLoad.totalWatts,
    0,
  );

  return {
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

    approvedChangeOrderTotal,
    revisedProjectTotal: totals.total + approvedChangeOrderTotal,

    totalZones: zones.length,
    totalFixtures,
    totalTransformers: transformers.length,
    totalSystemWatts,

    readyForInstall: installReadiness?.readyForInstall ?? false,
    accepted: Boolean(acceptance),
  };
}