import { PageHeader } from "@/components/page-header";
import { AppSection } from "@/components/ui/app-section";
import { EmptyState } from "@/components/ui/empty-state";
import { MetricCard } from "@/components/ui/metric-card";
import { PageContainer } from "@/components/ui/page-container";

export default function CalendarPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Scheduling"
        title="Calendar"
        description="View quote appointments, installations, scheduling workflows, and operational timelines."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Appointments"
          value="0"
          helperText="Upcoming quote consultations."
        />

        <MetricCard
          label="Scheduled Installs"
          value="0"
          tone="brand"
          helperText="Approved installs booked on the calendar."
        />

        <MetricCard
          label="This Week"
          value="0"
          tone="success"
          helperText="Operational events scheduled this week."
        />

        <MetricCard
          label="Pending Scheduling"
          value="0"
          tone="warning"
          helperText="Projects awaiting scheduling confirmation."
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <AppSection
          title="Scheduling Workflow"
          description="Calendar and scheduling systems planned for future operational phases."
        >
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              Quote appointments and consultation scheduling workflows.
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              Installer scheduling connected directly to approved jobs.
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              Calendar integrations and operational timeline management.
            </div>
          </div>
        </AppSection>

        <AppSection
          title="Calendar Queue"
          description="Upcoming appointments and install schedules will appear here."
        >
          <EmptyState
            title="No scheduled events"
            description="Appointments, installations, and operational scheduling workflows will populate this area once calendar systems are active."
          />
        </AppSection>
      </div>
    </PageContainer>
  );
}