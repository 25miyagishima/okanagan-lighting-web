import { AppButton } from "@/components/ui/app-button";
import { AppTextarea } from "@/components/ui/app-textarea";
import { FormField } from "@/components/ui/form-field";
import { StatusPill } from "@/components/status-pill";
import { SectionCard } from "@/features/quotes/quote-sidebar/section-card";
import type { QuoteAcceptance } from "@/types/database";
import { acceptQuote } from "@/features/quote-acceptance/quote-acceptance-actions";
import { theme } from "@/styles/theme";

type QuoteAcceptancePanelProps = {
  quoteId: string;
  acceptance: QuoteAcceptance | null;
};

export function QuoteAcceptancePanel({
  quoteId,
  acceptance,
}: QuoteAcceptancePanelProps) {
  async function acceptQuoteAction(formData: FormData) {
    "use server";
    await acceptQuote(quoteId, formData);
  }

  return (
    <SectionCard
      title="Proposal Acceptance"
      actions={
        acceptance ? (
          <StatusPill tone="success">accepted</StatusPill>
        ) : (
          <StatusPill tone="warning">pending</StatusPill>
        )
      }
    >
      {acceptance ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-4">
            <p className="text-sm font-medium text-green-300">
              This proposal has been accepted.
            </p>

            <p className="mt-2 text-xs leading-relaxed text-[#A7ABB1]">
              The quote is now locked as an approved project record.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
              <p className="text-[10px] uppercase tracking-wide text-[#626872]">
                Accepted By
              </p>

              <p className="mt-1 text-sm text-[#F5F5F1]">
                {acceptance.acceptedByName}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
              <p className="text-[10px] uppercase tracking-wide text-[#626872]">
                Accepted Date
              </p>

              <p className="mt-1 text-sm text-[#F5F5F1]">
                {new Date(acceptance.acceptedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
              <p className="text-[10px] uppercase tracking-wide text-[#626872]">
                Email
              </p>

              <p className="mt-1 text-sm text-[#F5F5F1]">
                {acceptance.acceptedByEmail || "Not provided"}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
              <p className="text-[10px] uppercase tracking-wide text-[#626872]">
                Signature
              </p>

              <p className="mt-1 text-sm text-[#F5F5F1]">
                {acceptance.clientSignature || acceptance.acceptedByName}
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-green-400/20 bg-green-500/10 p-3">
              <p className="text-sm text-green-300">
                Deposit acknowledged
              </p>
            </div>

            <div className="rounded-xl border border-green-400/20 bg-green-500/10 p-3">
              <p className="text-sm text-green-300">
                Terms acknowledged
              </p>
            </div>
          </div>

          {acceptance.acceptanceNotes ? (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
              <p className="text-[10px] uppercase tracking-wide text-[#626872]">
                Notes
              </p>

              <p className="mt-1 text-sm leading-relaxed text-[#A7ABB1]">
                {acceptance.acceptanceNotes}
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <form action={acceptQuoteAction} className="space-y-4">
          <div className="rounded-2xl border border-[#D88B2D]/20 bg-[#D88B2D]/10 p-4">
            <p className="text-sm font-medium text-[#E2B15A]">
              Accept Proposal
            </p>

            <p className="mt-2 text-xs leading-relaxed text-[#A7ABB1]">
              Use this form once the client has approved the proposal. This will
              mark the quote as approved and lock the project scope.
            </p>
          </div>

          <FormField
            id="acceptedByName"
            label="Accepted By"
            helperText="Name of the person approving this proposal."
          >
            <input
              id="acceptedByName"
              name="acceptedByName"
              type="text"
              required
              className={theme.input}
              placeholder="Client full name"
            />
          </FormField>

          <FormField
            id="acceptedByEmail"
            label="Client Email"
            helperText="Optional email for acceptance record."
          >
            <input
              id="acceptedByEmail"
              name="acceptedByEmail"
              type="email"
              className={theme.input}
              placeholder="client@example.com"
            />
          </FormField>

          <FormField
            id="clientSignature"
            label="Signature"
            helperText="Typed signature for now. Digital drawing signature can be added later."
          >
            <input
              id="clientSignature"
              name="clientSignature"
              type="text"
              className={theme.input}
              placeholder="Typed signature"
            />
          </FormField>

          <FormField
            id="acceptanceNotes"
            label="Acceptance Notes"
            helperText="Optional internal note about approval context."
          >
            <AppTextarea
              id="acceptanceNotes"
              name="acceptanceNotes"
              className="min-h-24"
              placeholder="Approved by phone/email/in person..."
            />
          </FormField>

          <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
            <label className="flex items-start gap-3 text-sm text-[#A7ABB1]">
              <input
                type="checkbox"
                name="depositAcknowledged"
                className="mt-1"
                required
              />

              <span>
                Deposit/payment requirements have been reviewed and
                acknowledged.
              </span>
            </label>

            <label className="flex items-start gap-3 text-sm text-[#A7ABB1]">
              <input
                type="checkbox"
                name="termsAcknowledged"
                className="mt-1"
                required
              />

              <span>
                Proposal scope, terms, and conditions have been reviewed and
                acknowledged.
              </span>
            </label>
          </div>

          <AppButton type="submit" variant="primary" className="w-full">
            Accept Proposal
          </AppButton>
        </form>
      )}
    </SectionCard>
  );
}