import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ClientForm } from "@/features/clients/client-form";
import { getClients } from "@/features/clients/client-actions";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <>
      <PageHeader
        title="Clients / Leads"
        description="Create, edit, and manage leads and active clients."
      />

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <ClientForm />

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 font-medium">Client List</h2>

          {clients.length === 0 ? (
            <p className="text-sm text-neutral-600">
              No clients yet. Add your first client using the form.
            </p>
          ) : (
            <div className="space-y-3">
              {clients.map((client) => (
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

                  <div className="mt-2 text-xs text-neutral-500">
                    {client.phone || "No phone"} · {client.email || "No email"}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
