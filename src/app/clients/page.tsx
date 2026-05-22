import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ClientForm } from "@/features/clients/client-form";
import { getClients } from "@/features/clients/client-actions";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="min-h-screen bg-[#0D0E10] px-3 py-4 text-[#F5F5F1] md:px-6 md:py-6">
      <PageHeader
        title="Clients / Leads"
        description="Create, edit, and manage leads and active clients."
      />

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <ClientForm />

        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <h2 className="mb-4 font-medium text-[#F5F5F1]">
            Client List
          </h2>

          {clients.length === 0 ? (
            <p className="text-sm text-[#9EA3AA]">
              No clients yet. Add your first client using the form.
            </p>
          ) : (
            <div className="space-y-3">
              {clients.map((client) => (
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

                    <span className="rounded-full border border-white/5 bg-white/[0.04] px-2 py-1 text-xs capitalize text-[#9EA3AA]">
                      {client.status}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-[#5B6068]">
                    {client.phone || "No phone"} ·{" "}
                    {client.email || "No email"}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}