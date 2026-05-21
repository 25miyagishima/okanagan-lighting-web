import type {
  TransformerLoadSummary,
  ZoneLoadSummary,
} from "./load-calculations";

export type DistributionGuidance = {
  severity: "safe" | "warning" | "critical";
  messages: string[];
};

export function calculateDistributionGuidance(
  zoneLoads: ZoneLoadSummary[],
  transformerLoads: TransformerLoadSummary[],
): DistributionGuidance {
  const messages: string[] = [];

  const unassignedZones = zoneLoads.filter(
    (zone) => !zone.transformerId && zone.totalWatts > 0,
  );

  const overloadedTransformers = transformerLoads.filter(
    (transformer) => transformer.isOverCapacity,
  );

  const overSafeTransformers = transformerLoads.filter(
    (transformer) =>
      transformer.isOverSafeLoad && !transformer.isOverCapacity,
  );

  const underusedTransformers = transformerLoads.filter(
    (transformer) =>
      transformer.assignedWatts > 0 &&
      transformer.loadPercentOfSafeCapacity < 50,
  );

  if (unassignedZones.length > 0) {
    messages.push(
      `${unassignedZones.length} zone(s) with load are not assigned to a transformer.`,
    );
  }

  overloadedTransformers.forEach((transformer) => {
    messages.push(
      `${transformer.transformerName} is over full capacity by ${Math.abs(
        transformer.remainingSafeWatts,
      ).toFixed(2)}W. Reduce load or add another transformer.`,
    );
  });

  overSafeTransformers.forEach((transformer) => {
    messages.push(
      `${transformer.transformerName} is over the recommended 80% safe load. Consider moving one zone to another transformer.`,
    );
  });

  if (underusedTransformers.length > 0 && overSafeTransformers.length > 0) {
    messages.push(
      "One or more transformers are underused while another is overloaded. Consider redistributing zones.",
    );
  }

  if (messages.length === 0) {
    messages.push(
      "Load distribution looks balanced based on current transformer assignments.",
    );
  }

  const severity =
    overloadedTransformers.length > 0
      ? "critical"
      : unassignedZones.length > 0 || overSafeTransformers.length > 0
        ? "warning"
        : "safe";

  return {
    severity,
    messages,
  };
}