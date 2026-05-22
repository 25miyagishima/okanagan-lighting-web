"use client";

import { useState } from "react";
import { theme } from "@/styles/theme";

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function SectionCard({
  title,
  children,
  defaultOpen = true,
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={theme.surface.card}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="group flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.025]"
      >
        <h2 className={`text-sm font-medium tracking-wide ${theme.text.primary}`}>
          {title}
        </h2>

        <span className={`text-xs transition-colors group-hover:text-[#E2B15A] ${theme.text.muted}`}>
          {open ? "Hide" : "Show"}
        </span>
      </button>

      {open ? (
        <div className="border-t border-white/5 px-4 pb-4 pt-4">
          {children}
        </div>
      ) : null}
    </section>
  );
}