type ProposalTone = "premium" | "warm" | "technical";

type ExecutiveSummaryInput = {
  clientName: string;
  siteAddress?: string | null;
  scope?: string | null;
  tone?: ProposalTone;
};

type FixtureNarrativeInput = {
  title: string;
  description?: string | null;
  quantity?: number;
};

export function generateLightingPhilosophy(
  tone: ProposalTone = "premium",
) {
  if (tone === "technical") {
    return "This proposal has been planned to support balanced illumination, safe circulation, reliable system performance, and long-term serviceability across the property.";
  }

  if (tone === "warm") {
    return "This proposal is designed to create a lighting experience that feels comfortable, welcoming, and natural to the home, while improving visibility, safety, and atmosphere.";
  }

  return "This proposal has been carefully designed to create a lighting experience that feels balanced, refined, and architecturally integrated throughout the property.";
}

export function generateProjectApproach(
  tone: ProposalTone = "premium",
) {
  if (tone === "technical") {
    return "Lighting zones, fixture placement, transformer planning, cable routing, and installation sequencing have been considered to support reliable performance and clear installation execution.";
  }

  if (tone === "warm") {
    return "Each lighting area has been organized to make the property easier to enjoy, safer to move through, and more comfortable in the evening hours.";
  }

  return "Each lighting zone has been organized to support both atmosphere and function, with fixture placement, transformer planning, and installation flow considered as part of the overall design.";
}

export function generateExecutiveSummary({
  clientName,
  siteAddress,
  scope,
  tone = "premium",
}: ExecutiveSummaryInput) {
  const locationText = siteAddress
    ? ` for ${siteAddress}`
    : "";

  const scopeText =
    scope?.trim() ||
    "a curated lighting plan designed to improve comfort, atmosphere, safety, and architectural balance.";

  return `${clientName}${locationText} will receive ${scopeText} The proposal is structured to clearly communicate the design intent, installation approach, and investment required to complete the project.`;
}

export function generateFixtureNarrative({
  title,
  description,
  quantity,
}: FixtureNarrativeInput) {
  if (description?.trim()) {
    return description;
  }

  const quantityText = quantity && quantity > 1 ? "fixtures" : "fixture";

  return `${title} ${quantityText} selected and included as part of the proposed lighting design for this area.`;
}