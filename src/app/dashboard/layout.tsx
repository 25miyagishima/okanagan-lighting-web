import { AppSidebar } from "@/components/app-sidebar";
import { MobileNav } from "@/components/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0D0E10] pb-16 lg:pb-0">
      <AppSidebar />

      <main className="relative min-h-screen w-full overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,139,45,0.06),transparent_42%)]" />

        <div className="relative z-10 w-full">{children}</div>
      </main>

      <MobileNav />
    </div>
  );
}