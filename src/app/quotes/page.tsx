import { PageHeader } from "@/components/page-header";
import { QuoteForm } from "@/features/quotes/quote-form";
import { QuoteList } from "@/features/quotes/quote-list";
import { getClients } from "@/features/clients/client-actions";
import { getQuotes } from "@/features/quotes/quote-actions";
import { theme } from "@/styles/theme";

export default async function QuotesPage() {
  const clients = await getClients();
  const quotes = await getQuotes();

  return (
    <div className={theme.layout.pageLuxury}>
      <div className={theme.layout.pageInner}>
        <PageHeader
          title="Quotes"
          description="Create quote shells connected to clients before adding zones, fixtures, and PDFs."
        />

        <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
          <QuoteForm clients={clients} />
          <QuoteList quotes={quotes} />
        </div>
      </div>
    </div>
  );
}