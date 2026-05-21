import type { QuoteItem, Transformer, Zone } from "@/types/database";

export type ZoneLoadSummary = {
  zoneId: string;
  zoneName: string;
  transformerId: string | null;
  totalWatts: number;
};

export type TransformerLoadSummary = {
  transformerId: string;
  transformerName: string;
  capacityWatts: number;
  maxRecommendedLoadWatts: number;
  assignedWatts: number;
  remainingSafeWatts: number;
  loadPercentOfCapacity: number;
  loadPercentOfSafeCapacity: number;
  isOverSafeLoad: boolean;
  isOverCapacity: boolean;
};

function isLikelyLightingLoad(item: QuoteItem) {
  return item.quoteGroupSnapshot === "fixtures";
}

export function calculateZoneLoads(
  zones: Zone[],
  quoteItems: QuoteItem[],
): ZoneLoadSummary[] {
  return zones.map((zone) => {
    const zoneItems = quoteItems.filter(
      (item) => item.zoneId === zone.id && isLikelyLightingLoad(item),
    );

    const totalWatts = zoneItems.reduce((sum, item) => {
      return sum + item.quantity * item.wattageSnapshot;
    }, 0);

    return {
      zoneId: zone.id,
      zoneName: zone.name,
      transformerId: zone.transformerId,
      totalWatts,
    };
  });
}

export function calculateTransformerLoads(
  transformers: Transformer[],
  zoneLoads: ZoneLoadSummary[],
): TransformerLoadSummary[] {
  return transformers.map((transformer) => {
    const assignedWatts = zoneLoads
      .filter((zone) => zone.transformerId === transformer.id)
      .reduce((sum, zone) => sum + zone.totalWatts, 0);

    const remainingSafeWatts =
      transformer.maxRecommendedLoadWatts - assignedWatts;

    const loadPercentOfCapacity =
      transformer.capacityWatts > 0
        ? (assignedWatts / transformer.capacityWatts) * 100
        : 0;

    const loadPercentOfSafeCapacity =
      transformer.maxRecommendedLoadWatts > 0
        ? (assignedWatts / transformer.maxRecommendedLoadWatts) * 100
        : 0;

    return {
      transformerId: transformer.id,
      transformerName: transformer.name,
      capacityWatts: transformer.capacityWatts,
      maxRecommendedLoadWatts: transformer.maxRecommendedLoadWatts,
      assignedWatts,
      remainingSafeWatts,
      loadPercentOfCapacity,
      loadPercentOfSafeCapacity,
      isOverSafeLoad: assignedWatts > transformer.maxRecommendedLoadWatts,
      isOverCapacity: assignedWatts > transformer.capacityWatts,
    };
  });
}