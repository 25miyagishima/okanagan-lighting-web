import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getDashboardMetrics } from "@/features/dashboard/dashboard-actions";

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Today’s quotes, upcoming installs, approvals, unpaid invoices, and follow-ups."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-neutral-500">Total Clients</p>
          <p className="mt-2 text-3xl font-semibold">{metrics.totalClients}</p>
        </section>

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-neutral-500">Leads</p>
          <p className="mt-2 text-3xl font-semibold">{metrics.leadClients}</p>
        </section>

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-neutral-500">Active Clients</p>
          <p className="mt-2 text-3xl font-semibold">{metrics.activeClients}</p>
        </section>

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-neutral-500">Archived</p>
          <p className="mt-2 text-3xl font-semibold">{metrics.archivedClients}</p>
        </section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">Recent Clients</h2>

            <Link
              href="/clients"
              className="text-sm text-neutral-600 hover:text-neutral-950"
            >
              View all
            </Link>
          </div>

          {metrics.recentClients.length === 0 ? (
            <p className="text-sm text-neutral-600">
              No clients yet. Add your first client to begin.
            </p>
          ) : (
            <div className="space-y-3">
              {metrics.recentClients.map((client) => (
                <Link
                  key={client.id}
                  href={`/clients/${client.id}`}
                  className="block rounded-xl border p-3 hover:bg-neutral-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-neutral-600">
                        {client.siteAddress || "No site address"}
                      </p>
                    </div>

                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs capitalize text-neutral-700">
                      {client.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 font-medium">Upcoming Workflow</h2>

          <div className="space-y-3 text-sm text-neutral-700">
            <div className="rounded-xl border p-3">
              Quotes will appear here in Phase 6.
            </div>

            <div className="rounded-xl border p-3">
              Jobs will appear here in Phase 9.
            </div>

            <div className="rounded-xl border p-3">
              Invoices will appear here in Phase 10.
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
