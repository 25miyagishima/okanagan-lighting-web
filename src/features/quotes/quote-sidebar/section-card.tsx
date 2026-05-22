"use client";

import { useState } from "react";

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
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <h2 className="font-medium">{title}</h2>

        <span className="text-xs text-neutral-500">
          {open ? "Hide" : "Show"}
        </span>
      </button>

      {open ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}