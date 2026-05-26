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
    <div className="space-y-5">
      <div className="sticky top-0 z-20 -mx-4 border-b border-white/[0.06] bg-[#0D0E10]/92 px-4 pb-3 pt-2 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:bg-[#141618]/92 sm:p-3">
        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-2">
            {tabs.map((tab) => {
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={[
                    "whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    active
                      ? "border border-amber-500/20 bg-gradient-to-r from-amber-500/15 to-transparent text-[#E2B15A] shadow-[0_0_0_1px_rgba(216,139,45,0.08)]"
                      : "text-[#9EA3AA] hover:bg-white/[0.04] hover:text-[#F5F5F1]",
                  ].join(" ")}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="animate-in fade-in duration-200">
        <WorkspaceLayout
          content={activePanel.content}
          actions={activePanel.actions}
        />
      </div>
    </div>
  );
}