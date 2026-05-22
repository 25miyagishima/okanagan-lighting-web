"use client";

import { useState } from "react";
import { formStyles } from "@/styles/form-styles";
import { createTransformer } from "./transformer-actions";

type TransformerFormProps = {
  quoteId: string;
};

export function TransformerForm({ quoteId }: TransformerFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = await createTransformer(quoteId, formData);

    if (result?.error) {
      setErrorMessage(result.error);
      return;
    }

    setSuccessMessage("Transformer added successfully.");
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className={formStyles.label}>
          Transformer Name
        </label>

        <input
          id="name"
          name="name"
          required
          className={formStyles.input}
          placeholder="Transformer 1, Front Yard, Garage..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="capacityWatts" className={formStyles.label}>
            Capacity / Watts
          </label>

          <input
            id="capacityWatts"
            name="capacityWatts"
            type="number"
            step="0.01"
            defaultValue="300"
            className={formStyles.input}
          />
        </div>

        <div>
          <label htmlFor="voltage" className={formStyles.label}>
            Voltage
          </label>

          <input
            id="voltage"
            name="voltage"
            type="number"
            step="0.01"
            defaultValue="12"
            className={formStyles.input}
          />
        </div>
      </div>

      <div>
        <label htmlFor="locationNote" className={formStyles.label}>
          Location Note
        </label>

        <input
          id="locationNote"
          name="locationNote"
          className={formStyles.input}
          placeholder="Near outlet, garage wall, side yard..."
        />
      </div>

      {errorMessage ? (
        <p className={formStyles.errorText}>{errorMessage}</p>
      ) : null}

      {successMessage ? (
        <p className={formStyles.successText}>{successMessage}</p>
      ) : null}

      <button type="submit" className={formStyles.primaryButton}>
        Add Transformer
      </button>
    </form>
  );
}