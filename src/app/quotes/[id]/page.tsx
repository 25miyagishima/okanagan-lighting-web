import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import {
  archiveQuote,
  getQuoteById,
  updateQuote,
} from "@/features/quotes/quote-actions";

type QuoteDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QuoteDetailPage({
  params,
}: QuoteDetailPageProps) {
  const { id } = await params;
  const quote = await getQuoteById(id);

  if (!quote) {
    notFound();
  }

  async function updateQuoteAction(formData: FormData) {
    "use server";

    await updateQuote(id, formData);
  }

  async function archiveQuoteAction() {
    "use server";

    await archiveQuote(id);
  }

  return (
    <>
      <div className="mb-4">
        <Link
          href="/quotes"
          className="text-sm text-neutral-600 hover:text-neutral-950"
        >
          ← Back to Quotes
        </Link>
      </div>

      <PageHeader
        title={`${quote.quoteNumber} Rev ${quote.revisionNumber}`}
        description={`${quote.clientName} · ${
          quote.clientSiteAddress || "No site address"
        }`}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">Quote Details</h2>

            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs capitalize text-neutral-700">
              {quote.status}
            </span>
          </div>

          <form action={updateQuoteAction} className="space-y-4">
            <input type="hidden" name="clientId" value={quote.clientId} />

            <div>
              <label htmlFor="quoteType" className="text-sm font-medium">
                Quote Type
              </label>

              <select
                id="quoteType"
                name="quoteType"
                defaultValue={quote.quoteType}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option value="outdoor">Outdoor</option>
                <option value="indoor">Indoor</option>
              </select>
            </div>

            <div>
              <label htmlFor="scope" className="text-sm font-medium">
                Scope
              </label>

              <textarea
                id="scope"
                name="scope"
                defaultValue={quote.scope}
                className="mt-1 min-h-28 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="discountType" className="text-sm font-medium">
                  Discount Type
                </label>

                <select
                  id="discountType"
                  name="discountType"
                  defaultValue={quote.discountType}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                >
                  <option value="none">None</option>
                  <option value="fixed">Fixed $</option>
                  <option value="percentage">Percentage %</option>
                </select>
              </div>

              <div>
                <label htmlFor="discountValue" className="text-sm font-medium">
                  Discount Value
                </label>

                <input
                  id="discountValue"
                  name="discountValue"
                  type="number"
                  step="0.01"
                  defaultValue={quote.discountValue}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="depositType" className="text-sm font-medium">
                  Deposit Type
                </label>

                <select
                  id="depositType"
                  name="depositType"
                  defaultValue={quote.depositType}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                >
                  <option value="none">None</option>
                  <option value="fixed">Fixed $</option>
                  <option value="percentage">Percentage %</option>
                </select>
              </div>

              <div>
                <label htmlFor="depositValue" className="text-sm font-medium">
                  Deposit Value
                </label>

                <input
                  id="depositValue"
                  name="depositValue"
                  type="number"
                  step="0.01"
                  defaultValue={quote.depositValue}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="quoteLevelLabourHours"
                  className="text-sm font-medium"
                >
                  Quote-Level Labour Hours
                </label>

                <input
                  id="quoteLevelLabourHours"
                  name="quoteLevelLabourHours"
                  type="number"
                  step="0.01"
                  defaultValue={quote.quoteLevelLabourHours}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="quoteLevelHourlyRate"
                  className="text-sm font-medium"
                >
                  Hourly Rate
                </label>

                <input
                  id="quoteLevelHourlyRate"
                  name="quoteLevelHourlyRate"
                  type="number"
                  step="0.01"
                  defaultValue={quote.quoteLevelHourlyRate}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="clientNotes" className="text-sm font-medium">
                Client-Facing Notes
              </label>

              <textarea
                id="clientNotes"
                name="clientNotes"
                defaultValue={quote.clientNotes || ""}
                className="mt-1 min-h-20 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label htmlFor="internalNotes" className="text-sm font-medium">
                Internal Notes
              </label>

              <textarea
                id="internalNotes"
                name="internalNotes"
                defaultValue={quote.internalNotes || ""}
                className="mt-1 min-h-20 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
            >
              Save Quote
            </button>
          </form>
        </section>

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 font-medium">Quote Workflow</h2>

          <div className="space-y-3">
            <form action={archiveQuoteAction}>
              <button
                type="submit"
                className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
              >
                Archive Quote
              </button>
            </form>
          </div>

          <div className="mt-6 border-t pt-6 text-sm text-neutral-600">
            <p>Zones, catalog items, transformer planning, and live totals begin in Phase 7.</p>
          </div>
        </section>
      </div>
    </>
  );
}