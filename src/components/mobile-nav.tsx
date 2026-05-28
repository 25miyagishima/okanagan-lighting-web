"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clients", label: "Clients" },
  { href: "/quotes", label: "Quotes" },
  { href: "/jobs", label: "Jobs" },
  { href: "/calendar", label: "Calendar" },
  { href: "/settings", label: "Settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  if (pathname === "/professional-access") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0B0C0E]/95 px-3 py-2 backdrop-blur-xl lg:hidden">
      <nav className="flex gap-2 overflow-x-auto pb-safe">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={[
                "flex h-10 shrink-0 items-center justify-center rounded-2xl px-4 text-xs font-medium transition-all duration-200",
                active
                  ? "border border-[#D88B2D]/25 bg-[#D88B2D]/10 text-[#E2B15A]"
                  : "text-[#A7ABB1] hover:bg-white/[0.04] hover:text-[#F5F5F1]",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}