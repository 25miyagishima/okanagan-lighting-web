import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { AppSection } from "@/components/ui/app-section";
import { EmptyState } from "@/components/ui/empty-state";
import { MetricCard } from "@/components/ui/metric-card";
import { PageContainer } from "@/components/ui/page-container";
import { LogoutButton } from "@/features/auth/logout-button";
import { theme } from "@/styles/theme";

const settingsModules = [
  {
    title: "Business Settings",
    description: "Business identity, company details, service defaults, and operational preferences.",
    href: "/settings/business",
  },
  {
    title: "Branding",
    description: "Proposal branding, PDF presentation, logo, colours, and customer-facing identity.",
    href: "/settings/branding",
  },
  {
    title: "Tax & Labour",
    description: "Tax profiles, labour rates, pricing defaults, and quote calculation preferences.",
    href: "/settings/tax-labour",
  },
  {
    title: "PDF Preferences",
    description: "Proposal structure, document defaults, warranty language, and payment terms.",
    href: "/settings/pdf-preferences",
  },
  {
    title: "Archive Center",
    description: "Search, review, and restore archived clients, quotes, jobs, and invoices.",
    href: "/settings/archive",
  },
  {
    title: "User / Profile",
    description: "Account access, user preferences, and professional workspace controls.",
    href: "/settings/profile",
  },
];

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Administration"
        title="Settings"
        description="Manage business configuration, branding, tax rules, archive access, and account controls."
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
          label="Archive Center"
          value="Ready"
          helperText="Archived workflow access point."
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <AppSection
          title="Settings Modules"
          description="Organized system controls for the operational platform."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {settingsModules.map((module) => (
              <Link
                key={module.href}
                href={module.href}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-200 hover:border-[#D88B2D]/25 hover:bg-white/[0.045]"
              >
                <p className="font-medium text-[#F5F5F1]">{module.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#A7ABB1]">
                  {module.description}
                </p>
              </Link>
            ))}
          </div>
        </AppSection>

        <div className="space-y-5">
          <AppSection
            title="Account"
            description="Professional access controls."
          >
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-relaxed text-[#A7ABB1]">
                Signed in to the operational workspace.
              </div>

              <LogoutButton />
            </div>
          </AppSection>

          <AppSection
            title="Configuration Queue"
            description="Future administrative tools will appear here."
          >
            <EmptyState
              title="No pending configuration changes"
              description="Business configuration tools will continue expanding as the platform stabilizes."
            />
          </AppSection>
        </div>
      </div>
    </PageContainer>
  );
}