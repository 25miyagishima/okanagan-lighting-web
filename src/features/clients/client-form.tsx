"use client";

import { useState } from "react";
import { formStyles } from "@/styles/form-styles";
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
    <form
      action={handleSubmit}
      className="space-y-4 rounded-2xl border border-white/5 bg-[#181A1D] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]"
    >
      <div>
        <label htmlFor="name" className={formStyles.label}>
          Client Name
        </label>

        <input
          id="name"
          name="name"
          required
          className={formStyles.input}
          placeholder="Client name"
        />
      </div>

      <div>
        <label htmlFor="phone" className={formStyles.label}>
          Phone
        </label>

        <input
          id="phone"
          name="phone"
          className={formStyles.input}
          placeholder="Phone number"
        />
      </div>

      <div>
        <label htmlFor="email" className={formStyles.label}>
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          className={formStyles.input}
          placeholder="Email address"
        />
      </div>

      <div>
        <label htmlFor="siteAddress" className={formStyles.label}>
          Site Address
        </label>

        <input
          id="siteAddress"
          name="siteAddress"
          className={formStyles.input}
          placeholder="Project address"
        />
      </div>

      <div>
        <label htmlFor="notes" className={formStyles.label}>
          Notes
        </label>

        <textarea
          id="notes"
          name="notes"
          className={formStyles.textarea}
          placeholder="Client notes"
        />
      </div>

      {errorMessage ? (
        <p className={formStyles.errorText}>{errorMessage}</p>
      ) : null}

      {successMessage ? (
        <p className={formStyles.successText}>{successMessage}</p>
      ) : null}

      <button type="submit" className={formStyles.primaryButton}>
        Save Client
      </button>
    </form>
  );
}