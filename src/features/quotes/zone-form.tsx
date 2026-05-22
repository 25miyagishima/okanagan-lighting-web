"use client";

import { useState } from "react";
import { formStyles } from "@/styles/form-styles";
import { createZone } from "./zone-actions";

type ZoneFormProps = {
  quoteId: string;
};

export function ZoneForm({ quoteId }: ZoneFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = await createZone(quoteId, formData);

    if (result?.error) {
      setErrorMessage(result.error);
      return;
    }

    setSuccessMessage("Zone added successfully.");
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className={formStyles.label}>
          Zone Name
        </label>

        <input
          id="name"
          name="name"
          required
          className={formStyles.input}
          placeholder="Front Entry, Backyard, Garage..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="wireLengthFeet" className={formStyles.label}>
            Wire Length / ft
          </label>

          <input
            id="wireLengthFeet"
            name="wireLengthFeet"
            type="number"
            step="0.01"
            defaultValue="0"
            className={formStyles.input}
          />
        </div>

        <div>
          <label htmlFor="labourHours" className={formStyles.label}>
            Labour Hours
          </label>

          <input
            id="labourHours"
            name="labourHours"
            type="number"
            step="0.01"
            defaultValue="0"
            className={formStyles.input}
          />
        </div>

        <div>
          <label htmlFor="hourlyRate" className={formStyles.label}>
            Hourly Rate
          </label>

          <input
            id="hourlyRate"
            name="hourlyRate"
            type="number"
            step="0.01"
            defaultValue="100"
            className={formStyles.input}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="transformerAssignmentNote"
          className={formStyles.label}
        >
          Transformer Assignment Note
        </label>

        <textarea
          id="transformerAssignmentNote"
          name="transformerAssignmentNote"
          className={formStyles.textarea}
          placeholder="Front yard should remain on front outlet transformer. Avoid crossing driveway."
        />
      </div>

      <div>
        <label htmlFor="clientNotes" className={formStyles.label}>
          Client-Facing Notes
        </label>

        <textarea
          id="clientNotes"
          name="clientNotes"
          className={formStyles.textarea}
        />
      </div>

      <div>
        <label htmlFor="internalNotes" className={formStyles.label}>
          Internal Notes
        </label>

        <textarea
          id="internalNotes"
          name="internalNotes"
          className={formStyles.textarea}
        />
      </div>

      {errorMessage ? (
        <p className={formStyles.errorText}>{errorMessage}</p>
      ) : null}

      {successMessage ? (
        <p className={formStyles.successText}>{successMessage}</p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] px-4 py-2 text-sm font-medium text-[#0D0E10] shadow-sm transition-all duration-200 hover:shadow-[0_0_18px_rgba(216,139,45,0.24)]"
      >
        Add Zone
      </button>
    </form>
  );
}