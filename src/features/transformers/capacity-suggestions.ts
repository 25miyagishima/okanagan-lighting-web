import type { TransformerLoadSummary } from "./load-calculations";

export type TransformerCapacitySuggestion = {
  transformerId: string;
  transformerName: string;
  capacityWatts: number;
  safeCapacityWatts: number;
  assignedWatts: number;
  remainingSafeWatts: number;
  suggestedAction: "ok" | "watch" | "upgrade" | "add-transformer";
  message: string;
};

export function calculateTransformerCapacitySuggestions(
  transformerLoads: TransformerLoadSummary[],
): TransformerCapacitySuggestion[] {
  return transformerLoads.map((transformer) => {
    if (transformer.isOverCapacity) {
      return {
        transformerId: transformer.transformerId,
        transformerName: transformer.transformerName,
        capacityWatts: transformer.capacityWatts,
        safeCapacityWatts: transformer.maxRecommendedLoadWatts,
        assignedWatts: transformer.assignedWatts,
        remainingSafeWatts: transformer.remainingSafeWatts,
        suggestedAction: "add-transformer",
        message:
          "This transformer is over full rated capacity. Add another transformer or reduce assigned load.",
      };
    }

    if (transformer.isOverSafeLoad) {
      return {
        transformerId: transformer.transformerId,
        transformerName: transformer.transformerName,
        capacityWatts: transformer.capacityWatts,
        safeCapacityWatts: transformer.maxRecommendedLoadWatts,
        assignedWatts: transformer.assignedWatts,
        remainingSafeWatts: transformer.remainingSafeWatts,
        suggestedAction: "upgrade",
        message:
          "This transformer is above the recommended 80% safe load. Consider a larger transformer or moving some load.",
      };
    }

    if (transformer.loadPercentOfSafeCapacity >= 75) {
      return {
        transformerId: transformer.transformerId,
        transformerName: transformer.transformerName,
        capacityWatts: transformer.capacityWatts,
        safeCapacityWatts: transformer.maxRecommendedLoadWatts,
        assignedWatts: transformer.assignedWatts,
        remainingSafeWatts: transformer.remainingSafeWatts,
        suggestedAction: "watch",
        message:
          "This transformer is getting close to the recommended safe load. Leave limited room for future expansion.",
      };
    }

    return {
      transformerId: transformer.transformerId,
      transformerName: transformer.transformerName,
      capacityWatts: transformer.capacityWatts,
      safeCapacityWatts: transformer.maxRecommendedLoadWatts,
      assignedWatts: transformer.assignedWatts,
      remainingSafeWatts: transformer.remainingSafeWatts,
      suggestedAction: "ok",
      message:
        "This transformer has comfortable remaining safe capacity.",
    };
  });
}