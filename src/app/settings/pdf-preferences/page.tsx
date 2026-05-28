import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/ui/empty-state";

export default function PdfPreferencesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Settings"
        title="PDF Preferences"
        description="Manage proposal formatting and document defaults."
      />

      <EmptyState
        title="PDF preferences coming soon"
        description="Proposal document controls will appear here."
      />
    </PageContainer>
  );
}