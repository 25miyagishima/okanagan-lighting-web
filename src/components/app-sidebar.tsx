"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { theme } from "@/styles/theme";

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

function SidebarLogo() {
  const gradientId = "okltsSidebarRidgeGold";
  const filterId = "okltsSidebarRidgeGlow";
  const ridgePath =
    "M250 386 C360 350, 475 326, 565 318 C642 312, 690 330, 760 318 C820 308, 860 280, 920 282 C990 284, 1050 318, 1202 326 C1285 328, 1355 340, 1450 388";

  return (
    <Link
      href="/dashboard"
      className="relative flex flex-col items-center leading-none transition-opacity duration-300 hover:opacity-90"
      aria-label="Okanagan Lighting Systems dashboard"
    >
      <div className="-mb-4 flex h-12 w-52 justify-center">
        <svg
          viewBox="240 285 1220 190"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#8A5200" stopOpacity="0" />
              <stop offset="18%" stopColor="#D99313" />
              <stop offset="50%" stopColor="#FFF4C2" />
              <stop offset="82%" stopColor="#D99313" />
              <stop offset="100%" stopColor="#8A5200" stopOpacity="0" />
            </linearGradient>

            <filter id={filterId}>
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={ridgePath}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${filterId})`}
          />

          <path
            d={ridgePath}
            fill="none"
            stroke="#FFE8A3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="-mt-2 font-serif text-[22px] tracking-[0.28em] text-[#FFF9EA] drop-shadow-[0_0_10px_rgba(255,249,234,.16)]">
        OKANAGAN
      </div>

      <div className="mt-[2px] text-center text-[10px] tracking-[0.38em] text-[#D99A18]">
        LIGHTING
      </div>

      <div className="mt-2 text-[9px] uppercase tracking-[0.28em] text-[#626872]">
        Systems Platform
      </div>
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-[#0B0C0E]/95 px-4 py-4 backdrop-blur-xl lg:flex">
      <div className="mb-7 flex justify-center px-2">
        <SidebarLogo />
      </div>

      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={[
                "group flex h-10 items-center rounded-2xl px-3 text-sm transition-all duration-200",
                active
                  ? "border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-transparent font-medium text-[#E2B15A] shadow-[0_0_0_1px_rgba(216,139,45,0.06)]"
                  : "text-[#9EA3AA] hover:bg-white/[0.04] hover:text-[#F5F5F1]",
              ].join(" ")}
            >
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-5">
        <div className={`${theme.surface.inset} p-4`}>
          <p className="text-xs font-medium text-[#F5F5F1]">System Status</p>

          <p className="mt-1.5 text-xs leading-relaxed text-[#9EA3AA]">
            Proposal exports, engineering tools, media uploads, and workflow
            systems are active.
          </p>
        </div>
      </div>
    </aside>
  );
}