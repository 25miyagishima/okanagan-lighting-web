import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { AppSection } from "@/components/ui/app-section";
import { EmptyState } from "@/components/ui/empty-state";
import { MetricCard } from "@/components/ui/metric-card";
import { PageContainer } from "@/components/ui/page-container";

const jobStages = [
  {
    label: "Approved",
    description: "Approved projects waiting to be scheduled.",
    tone: "success" as const,
  },
  {
    label: "Scheduled",
    description: "Projects with confirmed install dates.",
    tone: "brand" as const,
  },
  {
    label: "In Progress",
    description: "Installations currently underway.",
    tone: "warning" as const,
  },
  {
    label: "Installed",
    description: "Completed field work awaiting invoice or closeout.",
    tone: "neutral" as const,
  },
  {
    label: "Complete",
    description: "Finished projects with final workflow completed.",
    tone: "success" as const,
  },
];

const workspaceSections = [
  {
    title: "Overview",
    description:
      "Client, address, job status, install date, quote total, change orders, and revised project total.",
  },
  {
    title: "Install Readiness",
    description:
      "Confirm materials, transformer selection, access, scheduling, crew assignment, and site readiness before field work.",
  },
  {
    title: "Job Handoff",
    description:
      "Summarize the approved scope, zones, fixtures, transformers, system load, notes, and financial handoff for installation.",
  },
  {
    title: "Change Orders",
    description:
      "Track approved post-quote scope changes, additional work, revised totals, and customer-approved extras.",
  },
  {
    title: "Photos",
    description:
      "Store before photos, site references, transformer locations, existing outlets, flag placement, and installation documentation.",
  },
  {
    title: "Notes",
    description:
      "Keep internal project notes, client preferences, access details, site constraints, and installation reminders.",
  },
  {
    title: "Schedule",
    description:
      "Manage install date, expected duration, crew assignment, and future calendar integration.",
  },
];

export default function JobsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Operations"
        title="Jobs"
        description="Manage approved projects from scheduling through installation, change orders, handoff, invoicing, and completion."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Approved"
          value="0"
          helperText="Approved projects waiting to be scheduled."
        />

        <MetricCard
          label="Scheduled"
          value="0"
          tone="brand"
          helperText="Confirmed upcoming installations."
        />

        <MetricCard
          label="In Progress"
          value="0"
          tone="warning"
          helperText="Projects currently being installed."
        />

        <MetricCard
          label="Installed"
          value="0"
          tone="success"
          helperText="Field work completed and awaiting closeout."
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <AppSection
          title="Job Pipeline"
          description="Approved projects will move through these operational stages."
        >
          <div className="mt-5 space-y-3">
            {jobStages.map((stage) => (
              <div
                key={stage.label}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#F5F5F1]">
                      {stage.label}
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-[#A7ABB1]">
                      {stage.description}
                    </p>
                  </div>

                  <StatusPill tone={stage.tone}>0</StatusPill>
                </div>
              </div>
            ))}
          </div>
        </AppSection>

        <AppSection
  title="Job Workspace"
  description="Select a job to manage installation readiness, handoff, scheduling, photos, notes, and change orders."
>
  <EmptyState
    title="No job selected"
    description="Select a job from the queue to open its operational workspace."
  />

  <div className="mt-5 grid gap-4 md:grid-cols-2">
    {workspaceSections.map((section) => (
      <button
        key={section.title}
        type="button"
        className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-left transition-all duration-200 hover:border-[#D88B2D]/20 hover:bg-[#D88B2D]/5"
      >
        <p className="text-sm font-medium text-[#F5F5F1]">
          {section.title}
        </p>

        <p className="mt-2 text-xs leading-relaxed text-[#A7ABB1]">
          {section.description}
        </p>
      </button>
    ))}
  </div>
</AppSection>
      </div>
    </PageContainer>
  );
}