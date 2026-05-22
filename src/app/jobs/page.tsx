import { PageHeader } from "@/components/page-header";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-[#0D0E10] px-3 py-4 text-[#F5F5F1] md:px-6 md:py-6">
      <PageHeader
        title="Jobs"
        description="Schedule approved quotes, assign installers, and track job progress."
      />

      <section className="rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
        <div className="rounded-xl border border-white/5 bg-[#23262B] p-4 text-sm text-[#9EA3AA]">
          Job workflow will be built in Phase 9.
        </div>
      </section>
    </div>
  );
}