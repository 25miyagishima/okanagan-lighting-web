"use client";

import { useState } from "react";
import { createClientRecord } from "./client-actions";

export function ClientForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = await createClientRecord(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      return;
    }

    setSuccessMessage("Client saved successfully.");
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Client Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Client name"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Phone number"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Email address"
        />
      </div>

      <div>
        <label htmlFor="siteAddress" className="text-sm font-medium">
          Site Address
        </label>
        <input
          id="siteAddress"
          name="siteAddress"
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Project address"
        />
      </div>

      <div>
        <label htmlFor="notes" className="text-sm font-medium">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          className="mt-1 min-h-24 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Client notes"
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
        Save Client
      </button>
    </form>
  );
}
