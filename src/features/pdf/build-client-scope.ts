import type { QuoteItem, Zone } from "@/types/database";

export type ClientScopeItem = {
  title: string;
  quantity: number;
  description?: string;
};

export type ClientScopeSection = {
  zoneName: string;
  items: ClientScopeItem[];
};

function formatItemTitle(name: string) {
  return name.replace(/\s+/g, " ").trim();
}

function buildDescription(item: QuoteItem) {
  const details: string[] = [];

  if (item.quoteGroupSnapshot === "fixtures") {
    details.push("Installed & integrated lighting fixture");
  }

  if (item.quoteGroupSnapshot === "wire") {
    details.push("Professional low-voltage cable routing");
  }

  if (item.quoteGroupSnapshot === "controls") {
    details.push("Control system integration");
  }

  if (item.quoteGroupSnapshot === "materials") {
    details.push("Supporting installation material");
  }

  if (item.notes?.trim()) {
    details.push(item.notes.trim());
  }

  return details.join(" • ");
}

export function buildClientScopeSections({
  zones,
  quoteItems,
}: {
  zones: Zone[];
  quoteItems: QuoteItem[];
}): ClientScopeSection[] {
  return zones
    .map((zone) => {
      const zoneItems = quoteItems.filter(
        (item) => item.zoneId === zone.id,
      );

      return {
        zoneName: zone.name,
        items: zoneItems.map((item) => ({
          title: formatItemTitle(item.nameSnapshot),
          quantity: item.quantity,
          description: buildDescription(item),
        })),
      };
    })
    .filter((section) => section.items.length > 0);
}