import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/ui/empty-state";

export default function BrandingSettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Settings"
        title="Branding"
        description="Manage proposal and customer-facing branding systems."
      />

      <EmptyState
        title="Branding settings coming soon"
        description="Brand configuration tools will appear here."
      />
    </PageContainer>
  );
}