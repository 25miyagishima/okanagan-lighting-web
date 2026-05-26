"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { StatusPill } from "@/components/status-pill";
import { theme } from "@/styles/theme";
import type { QuoteWithClient } from "@/features/quotes/quote-actions";

type QuoteListProps = {
  quotes: QuoteWithClient[];
};

function getQuoteStatusTone(status: string) {
  if (status === "approved" || status === "paid") {
    return "success";
  }

  if (
    status === "sent" ||
    status === "scheduled" ||
    status === "invoiced"
  ) {
    return "warning";
  }

  if (status === "archived") {
    return "danger";
  }

  return "neutral";
}

function formatStableDate(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}

export function QuoteList({
  quotes,
}: QuoteListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const matchesSearch =
        quote.quoteNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        quote.clientName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (quote.clientSiteAddress ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : quote.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [quotes, search, statusFilter]);

  return (
    <section className={theme.surface.card}>
      <div className="mb-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className={theme.typography.eyebrow}>
              Quote Library
            </p>

            <h2 className="mt-1 font-serif text-2xl font-medium tracking-[-0.03em] text-[#F5F5F1]">
              Saved Quotes
            </h2>
          </div>

          <p className="text-xs text-[#626872]">
            {filteredQuotes.length} result(s)
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_180px]">
          <input
            type="text"
            placeholder="Search quotes, clients, or addresses..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className={theme.input}
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className={theme.input}
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="approved">Approved</option>
            <option value="scheduled">Scheduled</option>
            <option value="installed">Installed</option>
            <option value="invoiced">Invoiced</option>
            <option value="paid">Paid</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {filteredQuotes.length === 0 ? (
        <div className={theme.surface.inset}>
          <p className="p-4 text-sm text-[#A7ABB1]">
            No matching quotes found.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredQuotes.map((quote) => (
            <Link
              key={quote.id}
              href={`/quotes/${quote.id}`}
              className="group block rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-200 hover:border-[#D88B2D]/25 hover:bg-white/[0.045]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-medium text-[#F5F5F1]">
                        {quote.quoteNumber} Rev{" "}
                        {quote.revisionNumber}
                      </p>

                      {quote.revisionNumber > 0 ? (
                        <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[#E2B15A]">
                          Revision
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-1 text-sm leading-relaxed text-[#A7ABB1]">
                      {quote.clientName} ·{" "}
                      {quote.clientSiteAddress ||
                        "No site address"}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <StatusPill
                      tone={getQuoteStatusTone(quote.status)}
                    >
                      {quote.status}
                    </StatusPill>
                  </div>
                </div>

                <div className="grid gap-2 rounded-xl border border-white/[0.04] bg-[#16181B]/70 p-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-[#626872]">
                      Quote Type
                    </p>

                    <p className="mt-1 text-sm capitalize text-[#F5F5F1]">
                      {quote.quoteType}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-[#626872]">
                      Revision
                    </p>

                    <p className="mt-1 text-sm text-[#F5F5F1]">
                      Rev {quote.revisionNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-[#626872]">
                      Created
                    </p>

                    <p className="mt-1 text-sm text-[#F5F5F1]">
                      {formatStableDate(quote.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-[#626872]">
                      Updated
                    </p>

                    <p className="mt-1 text-sm text-[#F5F5F1]">
                      {formatStableDate(quote.updatedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#626872]">
                    Open quote workspace
                  </p>

                  <span className="text-sm text-[#E2B15A] transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}