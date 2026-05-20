import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { QuoteForm } from "@/features/quotes/quote-form";
import { getClients } from "@/features/clients/client-actions";
import { getQuotes } from "@/features/quotes/quote-actions";

export default async function QuotesPage() {
  const clients = await getClients();
  const quotes = await getQuotes();

  return (
    <>
      <PageHeader
        title="Quotes"
        description="Create quote shells connected to clients before adding zones, fixtures, and PDFs."
      />

      <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
        <QuoteForm clients={clients} />

        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 font-medium">Quotes</h2>

          {quotes.length === 0 ? (
            <p className="text-sm text-neutral-600">
              No quotes yet. Create your first quote using the form.
            </p>
          ) : (
            <div className="space-y-3">
              {quotes.map((quote) => (
                <Link
                  key={quote.id}
                  href={`/quotes/${quote.id}`}
                  className="block rounded-xl border p-3 hover:bg-neutral-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">
                        {quote.quoteNumber} Rev {quote.revisionNumber}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {quote.clientName} ·{" "}
                        {quote.clientSiteAddress || "No site address"}
                      </p>
                    </div>

                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs capitalize text-neutral-700">
                      {quote.status}
                    </span>
                  </div>

                  <div className="mt-2 text-xs capitalize text-neutral-500">
                    {quote.quoteType} quote
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