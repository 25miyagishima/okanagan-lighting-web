import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/ui/empty-state";

export default function ProfileSettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Settings"
        title="User / Profile"
        description="Manage account and workspace preferences."
      />

      <EmptyState
        title="Profile settings coming soon"
        description="User profile and workspace settings will appear here."
      />
    </PageContainer>
  );
}