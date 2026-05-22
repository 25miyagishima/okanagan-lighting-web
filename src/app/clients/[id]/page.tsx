import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import {
  getClientById,
  updateClientRecord,
  updateClientStatus,
} from "@/features/clients/client-actions";

type ClientDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClientDetailPage({
  params,
}: ClientDetailPageProps) {
  const { id } = await params;

  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  async function updateClient(formData: FormData) {
    "use server";

    await updateClientRecord(id, formData);
  }

  async function setLeadStatus() {
    "use server";

    await updateClientStatus(id, "lead");
  }

  async function setActiveStatus() {
    "use server";

    await updateClientStatus(id, "active");
  }

  async function setArchivedStatus() {
    "use server";

    await updateClientStatus(id, "archived");
  }

  return (
    <div className="min-h-screen bg-[#0D0E10] px-3 py-4 text-[#F5F5F1] md:px-6 md:py-6">
      <div className="mb-4">
        <Link
          href="/clients"
          className="text-sm text-[#9EA3AA] transition-colors hover:text-[#F5F5F1]"
        >
          ← Back to Clients
        </Link>
      </div>

      <PageHeader
        title={client.name}
        description={
          client.siteAddress || "No site address entered."
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium text-[#F5F5F1]">
              Client Information
            </h2>

            <StatusPill>
              {client.status}
            </StatusPill>
          </div>

          <form action={updateClient} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-[#F5F5F1]"
              >
                Client Name
              </label>

              <input
                id="name"
                name="name"
                defaultValue={client.name}
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1] outline-none transition-colors placeholder:text-[#5B6068] focus:border-[#E2B15A]/40"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-[#F5F5F1]"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                defaultValue={client.phone || ""}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1] outline-none transition-colors placeholder:text-[#5B6068] focus:border-[#E2B15A]/40"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#F5F5F1]"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                defaultValue={client.email || ""}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1] outline-none transition-colors placeholder:text-[#5B6068] focus:border-[#E2B15A]/40"
              />
            </div>

            <div>
              <label
                htmlFor="siteAddress"
                className="text-sm font-medium text-[#F5F5F1]"
              >
                Site Address
              </label>

              <input
                id="siteAddress"
                name="siteAddress"
                defaultValue={client.siteAddress || ""}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1] outline-none transition-colors placeholder:text-[#5B6068] focus:border-[#E2B15A]/40"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="text-sm font-medium text-[#F5F5F1]"
              >
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                defaultValue={client.notes || ""}
                className="mt-1 min-h-24 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1] outline-none transition-colors placeholder:text-[#5B6068] focus:border-[#E2B15A]/40"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] px-4 py-2 text-sm font-medium text-[#0D0E10] transition-opacity hover:opacity-90"
            >
              Save Changes
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <h2 className="mb-4 font-medium text-[#F5F5F1]">
            Client Workflow
          </h2>

          <div className="space-y-3">
            <form action={setLeadStatus}>
              <button
                type="submit"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[#F5F5F1] transition-colors hover:bg-white/[0.06]"
              >
                Mark as Lead
              </button>
            </form>

            <form action={setActiveStatus}>
              <button
                type="submit"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[#F5F5F1] transition-colors hover:bg-white/[0.06]"
              >
                Mark as Active
              </button>
            </form>

            <form action={setArchivedStatus}>
              <button
                type="submit"
                className="w-full rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/15"
              >
                Archive Client
              </button>
            </form>
          </div>

          <div className="mt-6 border-t border-white/5 pt-6">
            <h3 className="mb-3 font-medium text-[#F5F5F1]">
              Quote Workflow
            </h3>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full rounded-xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] px-4 py-2 text-sm font-medium text-[#0D0E10] transition-opacity hover:opacity-90"
              >
                Create Quote
              </button>

              <button
                type="button"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[#F5F5F1] transition-colors hover:bg-white/[0.06]"
              >
                Schedule Quote
              </button>
            </div>

            <p className="mt-4 text-sm text-[#9EA3AA]">
              Quote creation and scheduling will be
              connected in later phases.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
