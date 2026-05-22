"use client";

import { useState } from "react";
import { WorkspaceLayout } from "@/features/quotes/workspace-layout";

type WorkspacePanel = {
  content: React.ReactNode;
  actions?: React.ReactNode;
};

type QuoteWorkspaceNavProps = {
  overview: WorkspacePanel;
  zones: WorkspacePanel;
  transformers: WorkspacePanel;
  engineering: WorkspacePanel;
  details: WorkspacePanel;
};

const tabs = [
  "Overview",
  "Zones",
  "Transformers",
  "Engineering",
  "Details",
] as const;

type Tab = (typeof tabs)[number];

export function QuoteWorkspaceNav({
  overview,
  zones,
  transformers,
  engineering,
  details,
}: QuoteWorkspaceNavProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const panelByTab: Record<Tab, WorkspacePanel> = {
    Overview: overview,
    Zones: zones,
    Transformers: transformers,
    Engineering: engineering,
    Details: details,
  };

  const activePanel = panelByTab[activeTab];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl border bg-white p-2 shadow-sm">
        <div className="flex min-w-max gap-2">
          {tabs.map((tab) => {
            const active = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={
                  active
                    ? "rounded-xl bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
                    : "rounded-xl px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                }
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <WorkspaceLayout
        content={activePanel.content}
        actions={activePanel.actions}
      />
    </div>
  );
}