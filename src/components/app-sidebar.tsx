"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/features/auth/logout-button";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clients", label: "Clients / Leads" },
  { href: "/quotes", label: "Quotes" },
  { href: "/catalog", label: "Catalog" },
  { href: "/jobs", label: "Jobs" },
  { href: "/invoices", label: "Invoices" },
  { href: "/calendar", label: "Calendar" },
  { href: "/settings", label: "Settings" },
];

export function AppSidebar() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-white/5 bg-[#0D0E10] p-4">
      <div>
        <div className="mb-8">
          <p className="text-lg font-semibold text-[#F5F5F1]">
            Okanagan Lighting
          </p>

          <p className="text-xs text-[#9EA3AA]">
            Business Dashboard
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "block rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm font-medium text-[#E2B15A]"
                    : "block rounded-xl px-3 py-2 text-sm text-[#9EA3AA] transition-colors hover:bg-white/[0.04] hover:text-[#F5F5F1]"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-white/5 pt-4">
        <LogoutButton />
      </div>
    </aside>
  );
}