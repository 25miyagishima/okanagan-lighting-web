import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { AppSection } from "@/components/ui/app-section";
import { EmptyState } from "@/components/ui/empty-state";
import { PageContainer } from "@/components/ui/page-container";
import { theme } from "@/styles/theme";
import { ClientForm } from "@/features/clients/client-form";
import { getClients } from "@/features/clients/client-actions";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Contacts"
        title="Clients / Leads"
        description="Create, edit, and manage leads and active clients."
      />

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <ClientForm />

        <AppSection
          title="Client List"
          description="All leads and active clients currently saved in the system."
        >
          {clients.length === 0 ? (
            <EmptyState
              title="No clients yet"
              description="Add your first client using the form to begin building quotes, proposals, and project workflows."
            />
          ) : (
            <div className="space-y-3">
              {clients.map((client) => (
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

                      <div className="mt-2 text-xs text-[#626872]">
                        {client.phone || "No phone"} ·{" "}
                        {client.email || "No email"}
                      </div>
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
      </div>
    </PageContainer>
  );
}