import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/ui/empty-state";

export default function TaxLabourSettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Settings"
        title="Tax & Labour"
        description="Manage taxation and labour calculation defaults."
      />

      <EmptyState
        title="Tax & labour settings coming soon"
        description="Operational pricing controls will appear here."
      />
    </PageContainer>
  );
}