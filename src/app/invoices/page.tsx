import { PageHeader } from "@/components/page-header";
import { AppSection } from "@/components/ui/app-section";
import { EmptyState } from "@/components/ui/empty-state";
import { MetricCard } from "@/components/ui/metric-card";
import { PageContainer } from "@/components/ui/page-container";

export default function InvoicesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Finance"
        title="Invoices"
        description="Create invoices from completed jobs, track balances, and manage payment workflows."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Outstanding"
          value="$0"
          tone="warning"
          helperText="Open balances awaiting payment."
        />

        <MetricCard
          label="Paid"
          value="$0"
          tone="success"
          helperText="Completed invoice payments."
        />

        <MetricCard
          label="Draft Invoices"
          value="0"
          helperText="Invoices not yet finalized."
        />

        <MetricCard
          label="Overdue"
          value="0"
          tone="danger"
          helperText="Invoices past due date."
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <AppSection
          title="Invoice Workflow"
          description="Financial systems and payment tracking planned for future platform phases."
        >
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              Manual invoice generation from approved and completed jobs.
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              Deposit tracking, balances, and payment history workflows.
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              Future accounting integrations and reporting infrastructure.
            </div>
          </div>
        </AppSection>

        <AppSection
          title="Invoice Queue"
          description="Generated invoices and payment activity will appear here."
        >
          <EmptyState
            title="No invoices yet"
            description="Completed jobs and approved billing workflows will populate this area once invoice systems are active."
          />
        </AppSection>
      </div>
    </PageContainer>
  );
}