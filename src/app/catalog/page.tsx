import { PageHeader } from "@/components/page-header";
import { AppSection } from "@/components/ui/app-section";
import { PageContainer } from "@/components/ui/page-container";
import { CatalogForm } from "@/features/catalog/catalog-form";
import { CatalogList } from "../../features/catalog/catalog-list";
import { getCatalogItems } from "@/features/catalog/catalog-actions";
export default async function CatalogPage() {
  const items = await getCatalogItems();

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Products"
        title="Catalog"
        description="Manage fixtures, wire, controls, materials, labour items, and categories."
      />

      <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
        <CatalogForm />

        <AppSection
          title="Catalog Items"
          description="Fixture, material, labour, and control items available for quotes."
        >
          <CatalogList items={items} />
        </AppSection>
      </div>
    </PageContainer>
  );
}