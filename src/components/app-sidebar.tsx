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
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white p-4">
      <div>
        <div className="mb-8">
          <p className="text-lg font-semibold">
            Okanagan Lighting
          </p>

          <p className="text-xs text-neutral-500">
            Business Dashboard
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
}