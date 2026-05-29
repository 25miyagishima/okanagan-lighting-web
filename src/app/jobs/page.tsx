import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { AppSection } from "@/components/ui/app-section";
import { EmptyState } from "@/components/ui/empty-state";
import { MetricCard } from "@/components/ui/metric-card";
import { PageContainer } from "@/components/ui/page-container";
import { getJobs } from "@/features/jobs/job-actions";
import type { JobStatus } from "@/types/app";
import type { Job } from "@/types/database";

const statusLabels: Record<JobStatus, string> = {
  approved: "Approved",
  scheduled: "Scheduled",
  in_progress: "In Progress",
  installed: "Installed",
  completed: "Complete",
  invoiced: "Invoiced",
  archived: "Archived",
};

const statusDescriptions: Record<JobStatus, string> = {
  approved: "Approved projects waiting to be scheduled.",
  scheduled: "Projects with confirmed install dates.",
  in_progress: "Installations currently underway.",
  installed: "Completed field work awaiting invoice or closeout.",
  completed: "Finished projects with final workflow completed.",
  invoiced: "Projects that have been invoiced.",
  archived: "Archived job records.",
};

const statusTones: Record<
  JobStatus,
  "neutral" | "brand" | "success" | "warning" | "danger"
> = {
  approved: "success",
  scheduled: "brand",
  in_progress: "warning",
  installed: "neutral",
  completed: "success",
  invoiced: "brand",
  archived: "neutral",
};

const activeStatuses: JobStatus[] = [
  "approved",
  "scheduled",
  "in_progress",
  "installed",
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

function countJobsByStatus(jobs: Job[], status: JobStatus) {
  return jobs.filter((job) => job.status === status).length;
}

function formatDate(value: string | null) {
  if (!value) return null;

  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function JobsPage() {
  const jobs = await getJobs();

  const activeJobs = jobs.filter(
    (job) => job.status !== "completed" && job.status !== "archived",
  );

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
          value={String(countJobsByStatus(jobs, "approved"))}
          helperText="Approved projects waiting to be scheduled."
        />

        <MetricCard
          label="Scheduled"
          value={String(countJobsByStatus(jobs, "scheduled"))}
          tone="brand"
          helperText="Confirmed upcoming installations."
        />

        <MetricCard
          label="In Progress"
          value={String(countJobsByStatus(jobs, "in_progress"))}
          tone="warning"
          helperText="Projects currently being installed."
        />

        <MetricCard
          label="Installed"
          value={String(countJobsByStatus(jobs, "installed"))}
          tone="success"
          helperText="Field work completed and awaiting closeout."
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
        <AppSection
          title="Job Queue"
          description="Approved and scheduled projects appear here for operational management."
        >
          <div className="mt-5 space-y-4">
            {activeJobs.length === 0 ? (
              <EmptyState
                title="No active jobs"
                description="Approved projects will appear here once quotes begin moving into the job workflow."
              />
            ) : (
              activeStatuses.map((status) => {
                const jobsForStatus = activeJobs.filter(
                  (job) => job.status === status,
                );

                if (jobsForStatus.length === 0) return null;

                return (
                  <div key={status} className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-[#626872]">
                        {statusLabels[status]}
                      </p>

                      <StatusPill tone={statusTones[status]}>
                        {jobsForStatus.length}
                      </StatusPill>
                    </div>

                    <div className="space-y-3">
                      {jobsForStatus.map((job) => {
                        const scheduledDate = formatDate(job.scheduledStart);

                        return (
                          <Link
                            key={job.id}
                            href={`/jobs/${job.id}`}
                            className="block rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-colors duration-200 hover:bg-white/[0.045]"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-[#F5F5F1]">
                                  {job.jobAddress || "Job address pending"}
                                </p>

                                <p className="mt-1 text-xs leading-relaxed text-[#A7ABB1]">
                                  Quote-linked operational project
                                </p>

                                {scheduledDate ? (
                                  <p className="mt-2 text-xs text-[#626872]">
                                    Scheduled {scheduledDate}
                                  </p>
                                ) : null}
                              </div>

                              <StatusPill tone={statusTones[job.status]}>
                                {statusLabels[job.status]}
                              </StatusPill>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </AppSection>

        <AppSection
          title="Job Workspace"
          description="Select an approved job to manage its operational workflow."
        >
          <div className="mt-5">
            <EmptyState
              title="No job selected"
              description="Once an approved quote becomes a job, its operational workspace will appear here."
            />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {workspaceSections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"
              >
                <p className="text-sm font-medium text-[#F5F5F1]">
                  {section.title}
                </p>

                <p className="mt-2 text-xs leading-relaxed text-[#A7ABB1]">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </AppSection>
      </div>
    </PageContainer>
  );
}