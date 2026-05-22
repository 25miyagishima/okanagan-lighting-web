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
      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#181A1D] p-2 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
        <div className="flex min-w-max gap-2 md:min-w-0 md:flex-wrap">
          {tabs.map((tab) => {
            const active = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={
                  active
                    ? "whitespace-nowrap rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm font-medium text-[#E2B15A]"
                    : "whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-[#9EA3AA] transition-colors hover:bg-white/[0.04] hover:text-[#F5F5F1]"
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