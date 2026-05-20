"use client";

import { useState } from "react";
import { createQuote } from "./quote-actions";
import type { Client } from "@/types/database";

type QuoteFormProps = {
  clients: Client[];
  defaultClientId?: string;
};

export function QuoteForm({ clients, defaultClientId }: QuoteFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setErrorMessage(null);

    const result = await createQuote(formData);

    if (result?.error) {
      setErrorMessage(result.error);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm"
    >
      <div>
        <label htmlFor="clientId" className="text-sm font-medium">
          Client
        </label>

        <select
          id="clientId"
          name="clientId"
          required
          defaultValue={defaultClientId ?? ""}
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
        >
          <option value="">Select client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="quoteType" className="text-sm font-medium">
          Quote Type
        </label>

        <select
          id="quoteType"
          name="quoteType"
          defaultValue="outdoor"
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
        >
          <option value="outdoor">Outdoor</option>
          <option value="indoor">Indoor</option>
        </select>
      </div>

      <div>
        <label htmlFor="scope" className="text-sm font-medium">
          Scope
        </label>

        <textarea
          id="scope"
          name="scope"
          className="mt-1 min-h-28 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Manual scope of work"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="discountType" className="text-sm font-medium">
            Discount Type
          </label>

          <select
            id="discountType"
            name="discountType"
            defaultValue="none"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="none">None</option>
            <option value="fixed">Fixed $</option>
            <option value="percentage">Percentage %</option>
          </select>
        </div>

        <div>
          <label htmlFor="discountValue" className="text-sm font-medium">
            Discount Value
          </label>

          <input
            id="discountValue"
            name="discountValue"
            type="number"
            step="0.01"
            defaultValue="0"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="depositType" className="text-sm font-medium">
            Deposit Type
          </label>

          <select
            id="depositType"
            name="depositType"
            defaultValue="none"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="none">None</option>
            <option value="fixed">Fixed $</option>
            <option value="percentage">Percentage %</option>
          </select>
        </div>

        <div>
          <label htmlFor="depositValue" className="text-sm font-medium">
            Deposit Value
          </label>

          <input
            id="depositValue"
            name="depositValue"
            type="number"
            step="0.01"
            defaultValue="0"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="quoteLevelLabourHours"
            className="text-sm font-medium"
          >
            Quote-Level Labour Hours
          </label>

          <input
            id="quoteLevelLabourHours"
            name="quoteLevelLabourHours"
            type="number"
            step="0.01"
            defaultValue="0"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="quoteLevelHourlyRate"
            className="text-sm font-medium"
          >
            Hourly Rate
          </label>

          <input
            id="quoteLevelHourlyRate"
            name="quoteLevelHourlyRate"
            type="number"
            step="0.01"
            defaultValue="100"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="clientNotes" className="text-sm font-medium">
          Client-Facing Notes
        </label>

        <textarea
          id="clientNotes"
          name="clientNotes"
          className="mt-1 min-h-20 w-full rounded-lg border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="internalNotes" className="text-sm font-medium">
          Internal Notes
        </label>

        <textarea
          id="internalNotes"
          name="internalNotes"
          className="mt-1 min-h-20 w-full rounded-lg border px-3 py-2 text-sm"
        />
      </div>

      {errorMessage ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
      >
        Create Quote
      </button>
    </form>
  );
}