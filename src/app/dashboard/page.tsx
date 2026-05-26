import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { AppSection } from "@/components/ui/app-section";
import { EmptyState } from "@/components/ui/empty-state";
import { MetricCard } from "@/components/ui/metric-card";
import { PageContainer } from "@/components/ui/page-container";
import { theme } from "@/styles/theme";
import { getDashboardMetrics } from "@/features/dashboard/dashboard-actions";

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Today’s quotes, upcoming installs, approvals, unpaid invoices, and follow-ups."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Clients" value={metrics.totalClients} />

        <MetricCard
          label="Leads"
          value={metrics.leadClients}
          tone="brand"
        />

        <MetricCard
          label="Active Clients"
          value={metrics.activeClients}
          tone="success"
        />

        <MetricCard
          label="Archived"
          value={metrics.archivedClients}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <AppSection
          title="Recent Clients"
          description="Latest client and lead records added to the system."
        >
          <div className="mb-4 flex justify-end">
            <Link
              href="/clients"
              className={`${theme.button.ghost} px-0 sm:px-3`}
            >
              View all
            </Link>
          </div>

          {metrics.recentClients.length === 0 ? (
            <EmptyState
              title="No clients yet"
              description="Add your first client to begin building quotes, proposals, and project workflows."
            />
          ) : (
            <div className="space-y-3">
              {metrics.recentClients.map((client) => (
                <Link
                  key={client.id}
                  href={`/clients/${client.id}`}
                  className="block rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-200 hover:border-[#D88B2D]/25 hover:bg-white/[0.045]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-[#F5F5F1]">
                        {client.name}
                      </p>

                      <p className="mt-1 text-sm leading-relaxed text-[#A7ABB1]">
                        {client.siteAddress || "No site address"}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <StatusPill>{client.status}</StatusPill>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </AppSection>

        <AppSection
          title="Upcoming Workflow"
          description="Operational modules that will continue expanding as the platform grows."
        >
          <div className="space-y-3 text-sm text-[#A7ABB1]">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 leading-relaxed">
              Quotes, proposals, and PDF exports are active.
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 leading-relaxed">
              Jobs and install workflows will continue expanding next.
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 leading-relaxed">
              Invoices and payment tracking will build from the quote system.
            </div>
          </div>
        </AppSection>
      </div>
    </PageContainer>
  );
}