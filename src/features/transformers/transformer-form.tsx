"use client";

import { useState } from "react";
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
    <form
      action={handleSubmit}
      className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm"
    >
      <h2 className="font-medium">Add Transformer</h2>

      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Transformer Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Transformer 1, Front Yard, Garage..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="capacityWatts" className="text-sm font-medium">
            Capacity / Watts
          </label>
          <input
            id="capacityWatts"
            name="capacityWatts"
            type="number"
            step="0.01"
            defaultValue="300"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="voltage" className="text-sm font-medium">
            Voltage
          </label>
          <input
            id="voltage"
            name="voltage"
            type="number"
            step="0.01"
            defaultValue="12"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="locationNote" className="text-sm font-medium">
          Location Note
        </label>
        <input
          id="locationNote"
          name="locationNote"
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Near outlet, garage wall, side yard..."
        />
      </div>

      {errorMessage ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      {successMessage ? (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
      >
        Add Transformer
      </button>
    </form>
  );
}