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
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
      >
        <h2 className={`font-medium ${theme.text.primary}`}>{title}</h2>

        <span className={`text-xs ${theme.text.muted}`}>
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