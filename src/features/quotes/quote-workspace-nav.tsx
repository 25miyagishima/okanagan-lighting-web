"use client";

import { useState } from "react";
import { WorkspaceLayout } from "@/features/quotes/workspace-layout";

type WorkspacePanel = {
  content: React.ReactNode;
  actions?: React.ReactNode;
};

type WorkflowTab =
  | "Overview"
  | "Transformers"
  | "Zones"
  | "Engineering"
  | "Photos"
  | "Documents"
  | "Acceptance"
  | "InstallReadiness"
  | "Handoff"
  | "ChangeOrders";

type WorkflowItem = {
  id: WorkflowTab;
  label: string;
  helper: string;
};

type WorkflowGroup = {
  title: string;
  helper: string;
  items: WorkflowItem[];
};

type QuoteWorkspaceNavProps = {
  overview: WorkspacePanel;
  zones: WorkspacePanel;
  transformers: WorkspacePanel;
  engineering: WorkspacePanel;
  details: WorkspacePanel;

  photos?: WorkspacePanel;
  documents?: WorkspacePanel;
  acceptance?: WorkspacePanel;
  installReadiness?: WorkspacePanel;
  handoff?: WorkspacePanel;
  changeOrders?: WorkspacePanel;
};

const workflowGroups: WorkflowGroup[] = [
  {
    title: "Design",
    helper: "Create the lighting system.",
    items: [
      {
        id: "Overview",
        label: "Overview",
        helper: "Client, scope, and quote basics.",
      },
      {
        id: "Transformers",
        label: "Transformers",
        helper: "Power planning and system groupings.",
      },
      {
        id: "Zones",
        label: "Zones",
        helper: "Fixtures, cable, labour, and materials.",
      },
    ],
  },
  {
    title: "Review",
    helper: "Validate the design.",
    items: [
      {
        id: "Engineering",
        label: "Engineering",
        helper: "Totals, loads, and final checks.",
      },
      {
        id: "Photos",
        label: "Photos / Field Markups",
        helper: "Consultation photos, existing conditions, and field markups.",
      },
    ],
  },
  {
    title: "Proposal",
    helper: "Prepare client-facing outputs.",
    items: [
      {
        id: "Documents",
        label: "Documents",
        helper: "Proposal PDFs, material lists, and document outputs.",
      },
      {
        id: "Acceptance",
        label: "Acceptance",
        helper: "Client approval, signature, and acceptance record.",
      },
    ],
  },
  {
    title: "Operations",
    helper: "Prepare approved work for execution.",
    items: [
      {
        id: "InstallReadiness",
        label: "Install Readiness",
        helper: "Confirm materials, access, client readiness, and crew planning.",
      },
      {
        id: "Handoff",
        label: "Handoff",
        helper: "Operational summary for installation planning.",
      },
      {
        id: "ChangeOrders",
        label: "Change Orders",
        helper: "Approved scope changes and revised project totals.",
      },
    ],
  },
];

export function QuoteWorkspaceNav({
  overview,
  zones,
  transformers,
  engineering,
  details,
  photos,
  documents,
  acceptance,
  installReadiness,
  handoff,
  changeOrders,
}: QuoteWorkspaceNavProps) {
  const [activeTab, setActiveTab] = useState<WorkflowTab>("Overview");

  const panelByTab: Record<WorkflowTab, WorkspacePanel | undefined> = {
    Overview: overview,
    Transformers: transformers,
    Zones: zones,
    Engineering: engineering,
    Photos: photos,
    Documents: documents ?? details,
    Acceptance: acceptance,
    InstallReadiness: installReadiness,
    Handoff: handoff,
    ChangeOrders: changeOrders,
  };

  const activePanel = panelByTab[activeTab] ?? overview;

  const activeTabMeta = workflowGroups
    .flatMap((group) => group.items)
    .find((tab) => tab.id === activeTab);

  const navigation = (
    <div className="rounded-2xl border border-white/[0.06] bg-[#141618]/92 p-3">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D88B2D]">
          Quote Workflow
        </p>

        <p className="mt-1 text-sm leading-relaxed text-[#9EA3AA]">
          {activeTabMeta?.helper}
        </p>
      </div>

      <div className="space-y-4">
        {workflowGroups.map((group) => (
          <div key={group.title}>
            <div className="mb-2 px-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#626872]">
                {group.title}
              </p>

              <p className="mt-1 text-xs leading-relaxed text-[#7C838C]">
                {group.helper}
              </p>
            </div>

            <div className="space-y-1.5">
              {group.items.map((tab) => {
                const active = activeTab === tab.id;
                const available = Boolean(panelByTab[tab.id]);

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      if (available) {
                        setActiveTab(tab.id);
                      }
                    }}
                    disabled={!available}
                    className={[
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200",
                      active
                        ? "border border-amber-500/20 bg-gradient-to-r from-amber-500/15 to-transparent text-[#E2B15A] shadow-[0_0_0_1px_rgba(216,139,45,0.08)]"
                        : available
                          ? "text-[#9EA3AA] hover:bg-white/[0.04] hover:text-[#F5F5F1]"
                          : "cursor-not-allowed text-[#4F555D]",
                    ].join(" ")}
                  >
                    <span>{tab.label}</span>

                    {!available ? (
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#4F555D]">
                        Soon
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-200">
      <WorkspaceLayout
        navigation={navigation}
        content={activePanel.content}
        actions={activePanel.actions}
      />
    </div>
  );
}