import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
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
    <>
      <div className="mb-4">
        <Link
          href="/clients"
          className="text-sm text-neutral-600 hover:text-neutral-950"
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
        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">
              Client Information
            </h2>

            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs capitalize text-neutral-700">
              {client.status}
            </span>
          </div>

          <form action={updateClient} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium"
              >
                Client Name
              </label>

              <input
                id="name"
                name="name"
                defaultValue={client.name}
                required
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                defaultValue={client.phone || ""}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                defaultValue={client.email || ""}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="siteAddress"
                className="text-sm font-medium"
              >
                Site Address
              </label>

              <input
                id="siteAddress"
                name="siteAddress"
                defaultValue={client.siteAddress || ""}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="text-sm font-medium"
              >
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                defaultValue={client.notes || ""}
                className="mt-1 min-h-24 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
            >
              Save Changes
            </button>
          </form>
        </section>

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 font-medium">
            Client Workflow
          </h2>

          <div className="space-y-3">
            <form action={setLeadStatus}>
              <button
                type="submit"
                className="w-full rounded-lg border px-4 py-2 text-sm font-medium"
              >
                Mark as Lead
              </button>
            </form>

            <form action={setActiveStatus}>
              <button
                type="submit"
                className="w-full rounded-lg border px-4 py-2 text-sm font-medium"
              >
                Mark as Active
              </button>
            </form>

            <form action={setArchivedStatus}>
              <button
                type="submit"
                className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
              >
                Archive Client
              </button>
            </form>
          </div>

          <div className="mt-6 border-t pt-6">
            <h3 className="mb-3 font-medium">
              Quote Workflow
            </h3>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
              >
                Create Quote
              </button>

              <button
                type="button"
                className="w-full rounded-lg border px-4 py-2 text-sm font-medium"
              >
                Schedule Quote
              </button>
            </div>

            <p className="mt-4 text-sm text-neutral-600">
              Quote creation and scheduling will be
              connected in later phases.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
