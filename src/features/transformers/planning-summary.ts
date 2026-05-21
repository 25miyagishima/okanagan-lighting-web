import type {
  TransformerLoadSummary,
  ZoneLoadSummary,
} from "./load-calculations";

export type PlanningSummary = {
  totalSystemWatts: number;
  assignedWatts: number;
  unassignedWatts: number;
  overloadedTransformerCount: number;
  warningCount: number;
  unassignedZoneCount: number;
  isSystemSafe: boolean;
};

export function calculatePlanningSummary(
  zoneLoads: ZoneLoadSummary[],
  transformerLoads: TransformerLoadSummary[],
): PlanningSummary {
  const totalSystemWatts = zoneLoads.reduce(
    (sum, zone) => sum + zone.totalWatts,
    0,
  );

  const assignedWatts = zoneLoads
    .filter((zone) => zone.transformerId)
    .reduce((sum, zone) => sum + zone.totalWatts, 0);

  const unassignedWatts = totalSystemWatts - assignedWatts;

  const overloadedTransformerCount = transformerLoads.filter(
    (transformer) =>
      transformer.isOverCapacity || transformer.isOverSafeLoad,
  ).length;

  const unassignedZoneCount = zoneLoads.filter(
    (zone) => !zone.transformerId,
  ).length;

  const warningCount =
    overloadedTransformerCount + unassignedZoneCount;

  const isSystemSafe = warningCount === 0;

  return {
    totalSystemWatts,
    assignedWatts,
    unassignedWatts,
    overloadedTransformerCount,
    warningCount,
    unassignedZoneCount,
    isSystemSafe,
  };
}