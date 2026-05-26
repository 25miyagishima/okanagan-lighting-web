"use client";

import { useState } from "react";
import type { Client } from "@/types/database";
import { formStyles } from "@/styles/form-styles";
import { createQuote } from "./quote-actions";
import { theme } from "@/styles/theme";

type QuoteFormProps = {
  clients: Client[];
  defaultClientId?: string;
};

export function QuoteForm({
  clients,
  defaultClientId,
}: QuoteFormProps) {
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
      className={`${theme.surface.card} ${theme.form.stack}`}
    >
      <div>
        <p className={theme.typography.eyebrow}>Quote Creation</p>

        <h2 className="mt-1 font-serif text-2xl font-medium tracking-[-0.03em] text-[#F5F5F1]">
          New Quote
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-[#A7ABB1]">
          Create a quote shell before adding zones, fixtures, labour,
          media, and PDFs.
        </p>
      </div>

      <div className={theme.surface.goldLine} />

      <div className={theme.form.stack}>
        <div>
          <label htmlFor="clientId" className={formStyles.label}>
            Client
          </label>

          <select
            id="clientId"
            name="clientId"
            required
            defaultValue={defaultClientId ?? ""}
            className={formStyles.select}
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
          <label htmlFor="quoteType" className={formStyles.label}>
            Quote Type
          </label>

          <select
            id="quoteType"
            name="quoteType"
            defaultValue="outdoor"
            className={formStyles.select}
          >
            <option value="outdoor">Outdoor</option>
            <option value="indoor">Indoor</option>
          </select>
        </div>

        <div>
          <label htmlFor="scope" className={formStyles.label}>
            Scope
          </label>

          <textarea
            id="scope"
            name="scope"
            className={formStyles.textareaLarge}
            placeholder="Manual scope of work"
          />
        </div>
      </div>

      <div className={theme.surface.goldLine} />

      <div className={theme.form.stack}>
        <div>
          <p className={theme.typography.cardTitle}>
            Pricing Configuration
          </p>
        </div>

        <div className={theme.form.rowTwo}>
          <div>
            <label
              htmlFor="discountType"
              className={formStyles.label}
            >
              Discount Type
            </label>

            <select
              id="discountType"
              name="discountType"
              defaultValue="none"
              className={formStyles.select}
            >
              <option value="none">None</option>
              <option value="fixed">Fixed $</option>
              <option value="percentage">Percentage %</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="discountValue"
              className={formStyles.label}
            >
              Discount Value
            </label>

            <input
              id="discountValue"
              name="discountValue"
              type="number"
              step="0.01"
              defaultValue="0"
              className={formStyles.input}
            />
          </div>
        </div>

        <div className={theme.form.rowTwo}>
          <div>
            <label
              htmlFor="depositType"
              className={formStyles.label}
            >
              Deposit Type
            </label>

            <select
              id="depositType"
              name="depositType"
              defaultValue="none"
              className={formStyles.select}
            >
              <option value="none">None</option>
              <option value="fixed">Fixed $</option>
              <option value="percentage">Percentage %</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="depositValue"
              className={formStyles.label}
            >
              Deposit Value
            </label>

            <input
              id="depositValue"
              name="depositValue"
              type="number"
              step="0.01"
              defaultValue="0"
              className={formStyles.input}
            />
          </div>
        </div>
      </div>

      <div className={theme.surface.goldLine} />

      <div className={theme.form.stack}>
        <div>
          <p className={theme.typography.cardTitle}>
            Labour Configuration
          </p>
        </div>

        <div className={theme.form.rowTwo}>
          <div>
            <label
              htmlFor="quoteLevelLabourHours"
              className={formStyles.label}
            >
              Quote-Level Labour Hours
            </label>

            <input
              id="quoteLevelLabourHours"
              name="quoteLevelLabourHours"
              type="number"
              step="0.01"
              defaultValue="0"
              className={formStyles.input}
            />
          </div>

          <div>
            <label
              htmlFor="quoteLevelHourlyRate"
              className={formStyles.label}
            >
              Hourly Rate
            </label>

            <input
              id="quoteLevelHourlyRate"
              name="quoteLevelHourlyRate"
              type="number"
              step="0.01"
              defaultValue="100"
              className={formStyles.input}
            />
          </div>
        </div>
      </div>

      <div className={theme.surface.goldLine} />

      <div className={theme.form.stack}>
        <div>
          <label
            htmlFor="clientNotes"
            className={formStyles.label}
          >
            Client-Facing Notes
          </label>

          <textarea
            id="clientNotes"
            name="clientNotes"
            className={formStyles.textarea}
          />
        </div>

        <div>
          <label
            htmlFor="internalNotes"
            className={formStyles.label}
          >
            Internal Notes
          </label>

          <textarea
            id="internalNotes"
            name="internalNotes"
            className={formStyles.textarea}
          />
        </div>
      </div>

      {errorMessage ? (
        <div className={theme.surface.danger}>
          <p className={formStyles.errorText}>{errorMessage}</p>
        </div>
      ) : null}

      <div className={theme.form.actions}>
        <button
          type="submit"
          className={theme.button.primary}
        >
          Create Quote
        </button>
      </div>
    </form>
  );
}