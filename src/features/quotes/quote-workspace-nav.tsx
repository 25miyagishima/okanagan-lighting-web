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

const workflowTabs = [
  {
    id: "Setup",
    label: "Setup",
    helper: "Client, scope, and quote basics.",
  },
  {
    id: "Transformer",
    label: "Transformer",
    helper: "Power planning before zone buildout.",
  },
  {
    id: "Zones",
    label: "Zones",
    helper: "Fixtures, cable, labour, and photos.",
  },
  {
    id: "Review",
    label: "Review",
    helper: "Totals, engineering, and final checks.",
  },
  {
    id: "Documents",
    label: "Documents",
    helper: "PDFs, details, and proposal outputs.",
  },
] as const;

type WorkflowTab = (typeof workflowTabs)[number]["id"];

export function QuoteWorkspaceNav({
  overview,
  zones,
  transformers,
  engineering,
  details,
}: QuoteWorkspaceNavProps) {
  const [activeTab, setActiveTab] = useState<WorkflowTab>("Setup");

  const panelByTab: Record<WorkflowTab, WorkspacePanel> = {
    Setup: overview,
    Transformer: transformers,
    Zones: zones,
    Review: engineering,
    Documents: details,
  };

  const activePanel = panelByTab[activeTab];
  const activeTabMeta = workflowTabs.find((tab) => tab.id === activeTab);

  return (
    <div className="space-y-5">
      <div className="sticky top-0 z-20 -mx-4 border-b border-white/[0.06] bg-[#0D0E10]/92 px-4 pb-3 pt-2 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:bg-[#141618]/92 sm:p-3">
        <div className="mb-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D88B2D]">
            Quote Workflow
          </p>
          <p className="mt-1 text-sm text-[#9EA3AA]">
            {activeTabMeta?.helper}
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-2">
            {workflowTabs.map((tab, index) => {
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "flex items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    active
                      ? "border border-amber-500/20 bg-gradient-to-r from-amber-500/15 to-transparent text-[#E2B15A] shadow-[0_0_0_1px_rgba(216,139,45,0.08)]"
                      : "text-[#9EA3AA] hover:bg-white/[0.04] hover:text-[#F5F5F1]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-5 w-5 items-center justify-center rounded-full text-[11px]",
                      active
                        ? "bg-[#D88B2D]/20 text-[#F7D28B]"
                        : "bg-white/[0.05] text-[#8D939B]",
                    ].join(" ")}
                  >
                    {index + 1}
                  </span>

                  {tab.label}
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