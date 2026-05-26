"use client";

import { useState } from "react";
import { theme } from "@/styles/theme";

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  actions?: React.ReactNode;
};

export function SectionCard({
  title,
  children,
  defaultOpen = true,
  actions,
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      className={`${theme.surface.card} overflow-hidden`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.05] px-4 py-3.5">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="group flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
        >
          <h2
            className={`truncate text-sm font-medium tracking-wide ${theme.text.primary}`}
          >
            {title}
          </h2>

          <span
            className={`shrink-0 text-xs transition-colors group-hover:text-[#E2B15A] ${theme.text.muted}`}
          >
            {open ? "Hide" : "Show"}
          </span>
        </button>

        {actions ? (
          <div className="shrink-0">
            {actions}
          </div>
        ) : null}
      </div>

      {open ? (
        <div className="px-4 pb-4 pt-4">
          {children}
        </div>
      ) : null}
    </section>
  );
}