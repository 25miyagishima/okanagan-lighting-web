import { PageHeader } from "@/components/page-header";
import { AppSection } from "@/components/ui/app-section";
import { EmptyState } from "@/components/ui/empty-state";
import { MetricCard } from "@/components/ui/metric-card";
import { PageContainer } from "@/components/ui/page-container";

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Administration"
        title="Settings / Admin"
        description="Manage branding, tax configuration, labour rates, warranties, payment terms, users, and operational preferences."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Users"
          value="1"
          helperText="Platform users with system access."
        />

        <MetricCard
          label="Tax Profiles"
          value="1"
          tone="brand"
          helperText="Configured taxation structures."
        />

        <MetricCard
          label="Active Branding"
          value="1"
          tone="success"
          helperText="Current proposal and PDF branding profiles."
        />

        <MetricCard
          label="Pending Changes"
          value="0"
          helperText="Administrative updates awaiting review."
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <AppSection
          title="Administrative Workflow"
          description="Core business configuration systems planned for future phases."
        >
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              Business identity, branding, and proposal customization tools.
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              Tax configuration, labour rate controls, and operational defaults.
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
              User permissions, workflow administration, and future system integrations.
            </div>
          </div>
        </AppSection>

        <AppSection
          title="Configuration Queue"
          description="Administrative systems and settings modules will appear here."
        >
          <EmptyState
            title="No configurable modules yet"
            description="Business configuration tools and administrative workflows will populate this area as platform systems continue expanding."
          />
        </AppSection>
      </div>
    </PageContainer>
  );
}