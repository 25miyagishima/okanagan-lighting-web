import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { QuoteForm } from "@/features/quotes/quote-form";
import { getClients } from "@/features/clients/client-actions";
import { getQuotes } from "@/features/quotes/quote-actions";

export default async function QuotesPage() {
  const clients = await getClients();
  const quotes = await getQuotes();

  return (
    <div className="min-h-screen bg-[#0D0E10] px-3 py-4 text-[#F5F5F1] md:px-6 md:py-6">
      <PageHeader
        title="Quotes"
        description="Create quote shells connected to clients before adding zones, fixtures, and PDFs."
      />

      <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
        <QuoteForm clients={clients} />

        <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
          <h2 className="mb-4 font-medium text-[#F5F5F1]">Quotes</h2>

          {quotes.length === 0 ? (
            <p className="text-sm text-[#9EA3AA]">
              No quotes yet. Create your first quote using the form.
            </p>
          ) : (
            <div className="space-y-3">
              {quotes.map((quote) => (
                <Link
                  key={quote.id}
                  href={`/quotes/${quote.id}`}
                  className="block rounded-xl border border-white/5 bg-[#23262B] p-3 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-[#F5F5F1]">
                        {quote.quoteNumber} Rev {quote.revisionNumber}
                      </p>

                      <p className="text-sm text-[#9EA3AA]">
                        {quote.clientName} ·{" "}
                        {quote.clientSiteAddress || "No site address"}
                      </p>
                    </div>

                    <span className="rounded-full border border-white/5 bg-white/[0.04] px-2 py-1 text-xs capitalize text-[#9EA3AA]">
                      {quote.status}
                    </span>
                  </div>

                  <div className="mt-2 text-xs capitalize text-[#5B6068]">
                    {quote.quoteType} quote
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