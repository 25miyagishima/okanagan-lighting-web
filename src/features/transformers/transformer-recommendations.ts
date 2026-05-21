import type { ZoneLoadSummary } from "./load-calculations";

export type TransformerRecommendation = {
  totalWatts: number;
  recommendedMinimumCapacity: number;
  suggestedTransformerSize: number;
  suggestedTransformerCount: number;
  reason: string;
};

const COMMON_TRANSFORMER_SIZES = [60, 100, 150, 200, 300, 600, 900];

export function calculateTransformerRecommendation(
  zoneLoads: ZoneLoadSummary[],
): TransformerRecommendation {
  const totalWatts = zoneLoads.reduce(
    (sum, zone) => sum + zone.totalWatts,
    0,
  );

  const recommendedMinimumCapacity =
    totalWatts > 0 ? totalWatts / 0.8 : 0;

  const suggestedTransformerSize =
    COMMON_TRANSFORMER_SIZES.find(
      (size) => size >= recommendedMinimumCapacity,
    ) ?? COMMON_TRANSFORMER_SIZES[COMMON_TRANSFORMER_SIZES.length - 1];

  const suggestedTransformerCount =
    suggestedTransformerSize > 0
      ? Math.max(1, Math.ceil(recommendedMinimumCapacity / suggestedTransformerSize))
      : 0;

  const reason =
    totalWatts === 0
      ? "Add fixture wattage before recommendations can be calculated."
      : `Based on ${totalWatts.toFixed(
          2,
        )}W total load using an 80% recommended loading rule.`;

  return {
    totalWatts,
    recommendedMinimumCapacity,
    suggestedTransformerSize,
    suggestedTransformerCount,
    reason,
  };
}