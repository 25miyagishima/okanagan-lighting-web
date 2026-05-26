import { PageHeader } from "@/components/page-header";
import { AppSection } from "@/components/ui/app-section";
import { EmptyState } from "@/components/ui/empty-state";
import { MetricCard } from "@/components/ui/metric-card";
import { PageContainer } from "@/components/ui/page-container";

export default function JobsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Operations"
        title="Jobs"
        description="Schedule approved quotes, assign installers, track progress, and manage project workflows."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Scheduled Jobs"
          value="0"
          helperText="Approved installs currently scheduled."
        />

        <MetricCard
          label="Active Installs"
          value="0"
          tone="brand"
          helperText="Projects currently in progress."
        />

        <MetricCard
          label="Awaiting Approval"
          value="0"
          tone="warning"
          helperText="Quotes pending approval before scheduling."
        />

        <MetricCard
          label="Completed"
          value="0"
          tone="success"
          helperText="Finished installations and completed jobs."
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <AppSection
          title="Upcoming Job Workflow"
          description="Operational workflow systems planned for the next platform phase."
        >
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              Installer scheduling and assignment tools.
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              Site visit tracking, install notes, and project timelines.
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              Internal workflow management connected directly to approved quotes.
            </div>
          </div>
        </AppSection>

        <AppSection
          title="Job Queue"
          description="Approved quotes will automatically appear here once workflow systems are active."
        >
          <EmptyState
            title="No scheduled jobs"
            description="Approved projects and install workflows will appear here once scheduling tools are activated."
          />
        </AppSection>
      </div>
    </PageContainer>
  );
}