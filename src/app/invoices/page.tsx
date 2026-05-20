import { PageHeader } from "@/components/page-header";

export default function InvoicesPage() {
  return (
    <>
      <PageHeader
        title="Invoices"
        description="Create invoices manually from completed jobs and track payment status."
      />

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        Invoice workflow will be built in Phase 10.
      </div>
    </>
  );
}
