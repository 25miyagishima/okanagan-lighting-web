import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { getDashboardMetrics } from "@/features/dashboard/dashboard-actions";

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <div className="min-h-screen bg-[#0D0E10] px-3 py-4 text-[#F5F5F1] md:px-6 md:py-6">
      <PageHeader
        title="Dashboard"
        description="Today’s quotes, upcoming installs, approvals, unpaid invoices, and follow-ups."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <p className="text-sm text-[#9EA3AA]">Total Clients</p>
          <p className="mt-2 text-3xl font-semibold text-[#F5F5F1]">
            {metrics.totalClients}
          </p>
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <p className="text-sm text-[#9EA3AA]">Leads</p>
          <p className="mt-2 text-3xl font-semibold text-[#F5F5F1]">
            {metrics.leadClients}
          </p>
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <p className="text-sm text-[#9EA3AA]">Active Clients</p>
          <p className="mt-2 text-3xl font-semibold text-[#F5F5F1]">
            {metrics.activeClients}
          </p>
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <p className="text-sm text-[#9EA3AA]">Archived</p>
          <p className="mt-2 text-3xl font-semibold text-[#F5F5F1]">
            {metrics.archivedClients}
          </p>
        </section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium text-[#F5F5F1]">Recent Clients</h2>

            <Link
              href="/clients"
              className="text-sm text-[#D88B2D] transition-colors hover:text-[#E2B15A]"
            >
              View all
            </Link>
          </div>

          {metrics.recentClients.length === 0 ? (
            <p className="text-sm text-[#9EA3AA]">
              No clients yet. Add your first client to begin.
            </p>
          ) : (
            <div className="space-y-3">
              {metrics.recentClients.map((client) => (
                <Link
                  key={client.id}
                  href={`/clients/${client.id}`}
                  className="block rounded-xl border border-white/5 bg-[#23262B] p-3 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-[#F5F5F1]">
                        {client.name}
                      </p>
                      <p className="text-sm text-[#9EA3AA]">
                        {client.siteAddress || "No site address"}
                      </p>
                    </div>

                    <StatusPill>{client.status}</StatusPill>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <h2 className="mb-4 font-medium text-[#F5F5F1]">
            Upcoming Workflow
          </h2>

          <div className="space-y-3 text-sm text-[#9EA3AA]">
            <div className="rounded-xl border border-white/5 bg-[#23262B] p-3">
              Quotes will appear here in Phase 6.
            </div>

            <div className="rounded-xl border border-white/5 bg-[#23262B] p-3">
              Jobs will appear here in Phase 9.
            </div>

            <div className="rounded-xl border border-white/5 bg-[#23262B] p-3">
              Invoices will appear here in Phase 10.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}