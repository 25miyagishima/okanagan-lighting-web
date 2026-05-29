import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { AppSection } from "@/components/ui/app-section";
import { PageContainer } from "@/components/ui/page-container";
import { ChangeOrderPanel } from "@/features/change-orders/change-order-panel";
import { getChangeOrdersByQuoteId } from "@/features/change-orders/change-order-actions";
import { getInstallReadinessByQuoteId } from "@/features/install-readiness/install-readiness-actions";
import { InstallReadinessPanel } from "@/features/install-readiness/install-readiness-panel";
import { JobHandoffPanel } from "@/features/job-handoff/job-handoff-panel";
import { createJobHandoffSummary } from "@/features/job-handoff/job-handoff-summary";
import { getJobs } from "@/features/jobs/job-actions";
import { JobStatusControls } from "@/features/jobs/job-status-controls";
import { getQuoteAcceptanceByQuoteId } from "@/features/quote-acceptance/quote-acceptance-actions";
import { getQuoteById } from "@/features/quotes/quote-actions";
import { getQuoteItemsByQuoteId } from "@/features/quotes/quote-item-actions";
import { calculateQuoteTotals } from "@/features/quotes/quote-totals";
import { getZonesByQuoteId } from "@/features/quotes/zone-actions";
import {
  calculateTransformerLoads,
  calculateZoneLoads,
} from "@/features/transformers/load-calculations";
import { getTransformersByQuoteId } from "@/features/transformers/transformer-actions";
import type { JobStatus } from "@/types/app";

type JobDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const statusLabels: Record<JobStatus, string> = {
  approved: "Approved",
  scheduled: "Scheduled",
  in_progress: "In Progress",
  installed: "Installed",
  completed: "Complete",
  invoiced: "Invoiced",
  archived: "Archived",
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

const workspaceSections = [
  {
    title: "Photos",
    description:
      "Store before photos, site references, transformer locations, flag placement, and installation documentation.",
  },
  {
    title: "Crew Notes",
    description:
      "Internal project notes, access details, site constraints, client preferences, and install reminders.",
  },
  {
    title: "Schedule Management",
    description:
      "Manage install date, expected duration, crew assignment, and future calendar integration.",
  },
];

function formatDate(value: string | null) {
  if (!value) return "Not scheduled";

  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;

  const jobs = await getJobs();
  const job = jobs.find((item) => item.id === id);

  if (!job) {
    notFound();
  }

  const quote = await getQuoteById(job.quoteId);

  if (!quote) {
    notFound();
  }

  const installReadiness = await getInstallReadinessByQuoteId(job.quoteId);
  const zones = await getZonesByQuoteId(job.quoteId);
  const quoteItems = await getQuoteItemsByQuoteId(job.quoteId);
  const transformers = await getTransformersByQuoteId(job.quoteId);
  const acceptance = await getQuoteAcceptanceByQuoteId(job.quoteId);
  const changeOrders = await getChangeOrdersByQuoteId(job.quoteId);

  const totals = calculateQuoteTotals({
    zones,
    quoteItems,
    quoteLevelLabourHours: quote.quoteLevelLabourHours,
    quoteLevelHourlyRate: quote.quoteLevelHourlyRate,
    discountType: quote.discountType,
    discountValue: quote.discountValue,
    depositType: quote.depositType,
    depositValue: quote.depositValue,
    materialTaxRate: 12,
    labourTaxable: false,
  });

  const zoneLoads = calculateZoneLoads(zones, quoteItems);

  const transformerLoads = calculateTransformerLoads(
    transformers,
    zoneLoads,
  );

  const jobHandoffSummary = createJobHandoffSummary({
    quote,
    zones,
    quoteItems,
    transformers,
    zoneLoads,
    transformerLoads,
    totals,
    acceptance,
    installReadiness,
    changeOrders,
  });

  return (
    <PageContainer>
      <div className="mb-5">
        <Link
          href="/jobs"
          className="text-sm font-medium text-[#A7ABB1] transition-colors hover:text-[#F5F5F1]"
        >
          ← Back to Jobs
        </Link>
      </div>

      <PageHeader
        eyebrow="Operations Workspace"
        title={job.jobAddress || quote.clientSiteAddress || "Job address pending"}
        description="Manage the operational side of this approved project from scheduling through installation, closeout, invoicing, and archive."
      />

      <div className="grid gap-5 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[#626872]">
            Status
          </p>

          <div className="mt-3">
            <StatusPill tone={statusTones[job.status]}>
              {statusLabels[job.status]}
            </StatusPill>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[#626872]">
            Scheduled Start
          </p>

          <p className="mt-3 text-sm font-medium text-[#F5F5F1]">
            {formatDate(job.scheduledStart)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[#626872]">
            Scheduled End
          </p>

          <p className="mt-3 text-sm font-medium text-[#F5F5F1]">
            {formatDate(job.scheduledEnd)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[#626872]">
            Quote Link
          </p>

          <Link
            href={`/quotes/${job.quoteId}`}
            className="mt-3 block text-sm font-medium text-[#F5F5F1] transition-colors hover:text-[#D6B36A]"
          >
            View source quote →
          </Link>
        </div>
      </div>

      <AppSection
        title="Overview"
        description="Core operational details for this approved job."
      >
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <DetailCard label="Client" value={quote.clientName} />
          <DetailCard label="Client ID" value={job.clientId} />
          <DetailCard label="Job Address" value={job.jobAddress} />
          <DetailCard label="Quote Number" value={quote.quoteNumber} />
          <DetailCard label="Assigned Installer" value={job.assignedInstallerId} />
          <DetailCard label="Special Instructions" value={job.specialInstructions} />
          <DetailCard label="Install Notes" value={job.installNotes} />
          <DetailCard label="Crew Notes" value={job.crewNotes} />
        </div>
      </AppSection>

      <InstallReadinessPanel
        quoteId={job.quoteId}
        readiness={installReadiness}
      />

      <JobHandoffPanel summary={jobHandoffSummary} />

      <ChangeOrderPanel
        quoteId={job.quoteId}
        changeOrders={changeOrders}
        quoteLocked={false}
      />

      <JobStatusControls jobId={job.id} status={job.status} />

      <div className="grid gap-5 md:grid-cols-2">
        {workspaceSections.map((section) => (
          <AppSection
            key={section.title}
            title={section.title}
            description={section.description}
          >
            <div className="mt-5 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] p-5">
              <p className="text-sm text-[#A7ABB1]">
                Workspace module coming next.
              </p>
            </div>
          </AppSection>
        ))}
      </div>
    </PageContainer>
  );
}

function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-[#626872]">
        {label}
      </p>

      <p className="mt-2 text-sm text-[#F5F5F1]">{value || "Not set"}</p>
    </div>
  );
}