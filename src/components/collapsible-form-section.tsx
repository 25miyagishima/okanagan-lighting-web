"use client";

import { useState } from "react";

type CollapsibleFormSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function CollapsibleFormSection({
  title,
  children,
  defaultOpen = false,
}: CollapsibleFormSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-2xl border bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <h2 className="font-medium">{title}</h2>

        <span className="text-xs text-neutral-500">
          {open ? "Hide" : "Show"}
        </span>
      </button>

      {open ? (
        <div className="border-t p-4">
          {children}
        </div>
      ) : null}
    </section>
  );
}