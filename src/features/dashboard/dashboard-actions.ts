import { createClient } from "@/lib/supabase/server";
import type { Client } from "@/types/database";

export type RecentQuote = {
  id: string;
  quoteNumber: string;
  revisionNumber: number;
  status: string;
  quoteType: string;
  clientName: string;
  createdAt: string;
};

export type DashboardMetrics = {
  totalClients: number;
  leadClients: number;
  activeClients: number;
  archivedClients: number;
  totalQuotes: number;
  draftQuotes: number;
  archivedQuotes: number;
  recentClients: Client[];
  recentQuotes: RecentQuote[];
};

function mapClientRow(client: {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  site_address: string | null;
  notes: string | null;
  status: "lead" | "active" | "archived";
  created_at: string;
  updated_at: string;
  archived_at: string | null;
}): Client {
  return {
    id: client.id,
    name: client.name,
    phone: client.phone,
    email: client.email,
    siteAddress: client.site_address,
    notes: client.notes,
    status: client.status,
    createdAt: client.created_at,
    updatedAt: client.updated_at,
    archivedAt: client.archived_at,
  };
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const supabase = await createClient();

  const { count: totalClients } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true });

  const { count: leadClients } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("status", "lead");

  const { count: activeClients } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  const { count: archivedClients } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("status", "archived");

  const { count: totalQuotes } = await supabase
    .from("quotes")
    .select("*", { count: "exact", head: true });

  const { count: draftQuotes } = await supabase
    .from("quotes")
    .select("*", { count: "exact", head: true })
    .eq("status", "draft");

  const { count: archivedQuotes } = await supabase
    .from("quotes")
    .select("*", { count: "exact", head: true })
    .eq("status", "archived");

  const { data: recentClientRows } = await supabase
    .from("clients")
    .select(
      "id, name, phone, email, site_address, notes, status, created_at, updated_at, archived_at",
    )
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: recentQuoteRows } = await supabase
    .from("quotes")
    .select(
      `
      id,
      quote_number,
      revision_number,
      status,
      quote_type,
      created_at,
      clients (
        name
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    totalClients: totalClients ?? 0,
    leadClients: leadClients ?? 0,
    activeClients: activeClients ?? 0,
    archivedClients: archivedClients ?? 0,
    totalQuotes: totalQuotes ?? 0,
    draftQuotes: draftQuotes ?? 0,
    archivedQuotes: archivedQuotes ?? 0,
    recentClients: recentClientRows?.map(mapClientRow) ?? [],
    recentQuotes:
      recentQuoteRows?.map((quote) => {
        const client = Array.isArray(quote.clients)
          ? quote.clients[0]
          : quote.clients;

        return {
          id: quote.id,
          quoteNumber: quote.quote_number,
          revisionNumber: quote.revision_number,
          status: quote.status,
          quoteType: quote.quote_type,
          clientName: client?.name ?? "Unknown client",
          createdAt: quote.created_at,
        };
      }) ?? [],
  };
}