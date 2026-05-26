"use client";

import { useState } from "react";
import { AppButton } from "@/components/ui/app-button";
import { AppCard } from "@/components/ui/app-card";
import { AppInput } from "@/components/ui/app-input";
import { AppTextarea } from "@/components/ui/app-textarea";
import { FormField } from "@/components/ui/form-field";
import { theme } from "@/styles/theme";
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
    <AppCard>
      <form action={handleSubmit} className={theme.form.stack}>
        <div>
          <p className={theme.typography.eyebrow}>
            Client Management
          </p>

          <h2 className="mt-1 font-serif text-2xl font-medium tracking-[-0.03em] text-[#F5F5F1]">
            New Client
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-[#A7ABB1]">
            Add leads and active clients to begin building quotes,
            proposals, invoices, and installation workflows.
          </p>
        </div>

        <div className={theme.surface.goldLine} />

        <FormField id="name" label="Client Name">
          <AppInput
            id="name"
            name="name"
            required
            placeholder="Client name"
          />
        </FormField>

        <FormField id="phone" label="Phone">
          <AppInput
            id="phone"
            name="phone"
            placeholder="Phone number"
          />
        </FormField>

        <FormField id="email" label="Email">
          <AppInput
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
          />
        </FormField>

        <FormField id="siteAddress" label="Site Address">
          <AppInput
            id="siteAddress"
            name="siteAddress"
            placeholder="Project address"
          />
        </FormField>

        <FormField id="notes" label="Notes">
          <AppTextarea
            id="notes"
            name="notes"
            placeholder="Client notes"
          />
        </FormField>

        {errorMessage ? (
          <div className={theme.surface.danger}>
            <p className="text-sm text-red-300">
              {errorMessage}
            </p>
          </div>
        ) : null}

        {successMessage ? (
          <div className={theme.surface.success}>
            <p className="text-sm text-green-300">
              {successMessage}
            </p>
          </div>
        ) : null}

        <div className={theme.form.actions}>
          <AppButton
            type="submit"
            variant="primary"
            className="w-full sm:w-auto"
          >
            Save Client
          </AppButton>
        </div>
      </form>
    </AppCard>
  );
}