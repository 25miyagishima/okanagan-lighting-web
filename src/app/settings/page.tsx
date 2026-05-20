import { PageHeader } from "@/components/page-header";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings / Admin"
        description="Manage business settings, branding, tax, labour rate, warranty, payment terms, and users."
      />

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        Settings/Admin will be built in Phase 2 and expanded later.
      </div>
    </>
  );
}
