import { StatusPill } from "@/components/status-pill";
import { AppSection } from "@/components/ui/app-section";
import { updateJobStatus } from "@/features/jobs/job-actions";
import type { JobStatus } from "@/types/app";

type JobStatusControlsProps = {
  jobId: string;
  status: JobStatus;
};

type StatusStep = {
  status: JobStatus;
  label: string;
  description: string;
  nextStatus: JobStatus | null;
  nextActionLabel: string | null;
};

const statusSteps: Record<JobStatus, StatusStep> = {
  approved: {
    status: "approved",
    label: "Approved",
    description:
      "The client has approved the project. The next operational step is scheduling the job.",
    nextStatus: "scheduled",
    nextActionLabel: "Schedule Job",
  },
  scheduled: {
    status: "scheduled",
    label: "Scheduled",
    description:
      "The job has been scheduled. The next step is to begin installation work.",
    nextStatus: "in_progress",
    nextActionLabel: "Start Installation",
  },
  in_progress: {
    status: "in_progress",
    label: "In Progress",
    description:
      "Installation work is currently underway. Mark the job installed once field work is complete.",
    nextStatus: "installed",
    nextActionLabel: "Mark Installed",
  },
  installed: {
    status: "installed",
    label: "Installed",
    description:
      "The installation is complete. The next step is project closeout and completion review.",
    nextStatus: "completed",
    nextActionLabel: "Complete Job",
  },
  completed: {
    status: "completed",
    label: "Completed",
    description:
      "The job has been completed. The next step is invoicing.",
    nextStatus: "invoiced",
    nextActionLabel: "Mark Invoiced",
  },
  invoiced: {
    status: "invoiced",
    label: "Invoiced",
    description:
      "The job has been invoiced. Once no longer active, it can be archived.",
    nextStatus: "archived",
    nextActionLabel: "Archive Job",
  },
  archived: {
    status: "archived",
    label: "Archived",
    description:
      "This job has been archived and is no longer part of the active operations workflow.",
    nextStatus: null,
    nextActionLabel: null,
  },
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

export function JobStatusControls({
  jobId,
  status,
}: JobStatusControlsProps) {
  const currentStep = statusSteps[status];

  async function updateStatusAction() {
    "use server";

    if (!currentStep.nextStatus) return;

    await updateJobStatus(jobId, currentStep.nextStatus);
  }

  return (
    <AppSection
      title="Status Controls"
      description="Move this job through the operational workflow one stage at a time."
    >
      <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#626872]">
              Current Status
            </p>

            <div className="mt-3">
              <StatusPill tone={statusTones[status]}>
                {currentStep.label}
              </StatusPill>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#A7ABB1]">
              {currentStep.description}
            </p>
          </div>

          {currentStep.nextStatus && currentStep.nextActionLabel ? (
            <form action={updateStatusAction}>
              <button
                type="submit"
                className="rounded-full bg-[#D6B36A] px-5 py-2.5 text-sm font-semibold text-[#0B0C0E] transition hover:bg-[#E2C983]"
              >
                {currentStep.nextActionLabel}
              </button>
            </form>
          ) : (
            <div className="rounded-full border border-white/[0.08] px-4 py-2 text-sm text-[#A7ABB1]">
              No further action
            </div>
          )}
        </div>
      </div>
    </AppSection>
  );
}