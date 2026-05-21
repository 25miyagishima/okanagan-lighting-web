"use client";

import { useState } from "react";
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
    <form
      action={handleSubmit}
      className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm"
    >
      <h2 className="font-medium">Add Zone</h2>

      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Zone Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Front Entry, Backyard, Garage..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="wireLengthFeet" className="text-sm font-medium">
            Wire Length / ft
          </label>
          <input
            id="wireLengthFeet"
            name="wireLengthFeet"
            type="number"
            step="0.01"
            defaultValue="0"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="labourHours" className="text-sm font-medium">
            Labour Hours
          </label>
          <input
            id="labourHours"
            name="labourHours"
            type="number"
            step="0.01"
            defaultValue="0"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="hourlyRate" className="text-sm font-medium">
            Hourly Rate
          </label>
          <input
            id="hourlyRate"
            name="hourlyRate"
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

      {successMessage ? (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
      >
        Add Zone
      </button>
    </form>
  );
}