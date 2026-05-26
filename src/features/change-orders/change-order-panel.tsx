import { AppButton } from "@/components/ui/app-button";
import { AppTextarea } from "@/components/ui/app-textarea";
import { FormField } from "@/components/ui/form-field";
import { StatusPill } from "@/components/status-pill";
import { SectionCard } from "@/features/quotes/quote-sidebar/section-card";
import type { ChangeOrder } from "@/types/database";
import {
  approveChangeOrder,
  createChangeOrder,
  deleteChangeOrder,
} from "@/features/change-orders/change-order-actions";
import { formatCurrency } from "@/lib/utils";
import { theme } from "@/styles/theme";

type ChangeOrderPanelProps = {
  quoteId: string;
  changeOrders: ChangeOrder[];
  quoteLocked?: boolean;
};

function getChangeOrderTone(status: string) {
  if (status === "approved") {
    return "success";
  }

  if (status === "draft") {
    return "warning";
  }

  return "neutral";
}

export function ChangeOrderPanel({
  quoteId,
  changeOrders,
  quoteLocked = false,
}: ChangeOrderPanelProps) {
  const approvedTotal = changeOrders
    .filter((changeOrder) => changeOrder.status === "approved")
    .reduce((total, changeOrder) => total + changeOrder.grandTotal, 0);

  async function createChangeOrderAction(formData: FormData) {
    "use server";
    await createChangeOrder(quoteId, formData);
  }

  async function approveChangeOrderAction(formData: FormData) {
    "use server";

    const changeOrderId = String(formData.get("changeOrderId") ?? "");
    if (!changeOrderId) return;

    await approveChangeOrder(changeOrderId, quoteId);
  }

  async function deleteChangeOrderAction(formData: FormData) {
    "use server";

    const changeOrderId = String(formData.get("changeOrderId") ?? "");
    if (!changeOrderId) return;

    await deleteChangeOrder(changeOrderId, quoteId);
  }

  return (
    <SectionCard
      title="Change Orders"
      actions={
        <StatusPill tone={approvedTotal > 0 ? "warning" : "neutral"}>
          {formatCurrency(approvedTotal)}
        </StatusPill>
      }
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
          <p className="text-sm font-medium text-[#F5F5F1]">
            Approved Change Orders
          </p>

          <p className="mt-1 text-2xl font-semibold text-[#E2B15A]">
            {formatCurrency(approvedTotal)}
          </p>

          <p className="mt-2 text-xs leading-relaxed text-[#A7ABB1]">
            Approved change orders represent extra approved scope beyond the
            original quote.
          </p>
        </div>

        {changeOrders.length === 0 ? (
          <p className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm text-[#A7ABB1]">
            No change orders have been created for this quote yet.
          </p>
        ) : (
          <div className="space-y-3">
            {changeOrders.map((changeOrder) => (
              <div
                key={changeOrder.id}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-[#F5F5F1]">
                        {changeOrder.changeOrderNumber} · {changeOrder.title}
                      </p>

                      <StatusPill tone={getChangeOrderTone(changeOrder.status)}>
                        {changeOrder.status}
                      </StatusPill>
                    </div>

                    {changeOrder.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-[#A7ABB1]">
                        {changeOrder.description}
                      </p>
                    ) : null}

                    <div className="mt-3 grid gap-2 text-xs text-[#A7ABB1] sm:grid-cols-3">
                      <div className="rounded-xl border border-white/[0.05] bg-[#16181B]/70 p-3">
                        <p className="text-[#626872]">Subtotal</p>
                        <p className="mt-1 text-[#F5F5F1]">
                          {formatCurrency(changeOrder.subtotal)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/[0.05] bg-[#16181B]/70 p-3">
                        <p className="text-[#626872]">Tax</p>
                        <p className="mt-1 text-[#F5F5F1]">
                          {formatCurrency(changeOrder.taxTotal)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-[#D88B2D]/20 bg-[#D88B2D]/10 p-3">
                        <p className="text-[#E2B15A]">Total</p>
                        <p className="mt-1 text-[#F5F5F1]">
                          {formatCurrency(changeOrder.grandTotal)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {changeOrder.status === "draft" ? (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <form action={approveChangeOrderAction}>
                      <input
                        type="hidden"
                        name="changeOrderId"
                        value={changeOrder.id}
                      />

                      <AppButton
                        type="submit"
                        variant="primary"
                        className="w-full"
                      >
                        Approve Change Order
                      </AppButton>
                    </form>

                    <form action={deleteChangeOrderAction}>
                      <input
                        type="hidden"
                        name="changeOrderId"
                        value={changeOrder.id}
                      />

                      <AppButton
                        type="submit"
                        variant="danger"
                        className="w-full"
                      >
                        Delete Draft
                      </AppButton>
                    </form>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-white/5 pt-4">
          <p className={theme.typography.cardTitle}>Create Change Order</p>

          {quoteLocked ? (
            <p className="mt-2 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm text-[#A7ABB1]">
              This quote is locked, so change orders should be used for
              approved post-quote scope changes.
            </p>
          ) : null}

          <form action={createChangeOrderAction} className="mt-4 space-y-4">
            <FormField
              id="title"
              label="Title"
              helperText="Example: Additional path lights, fixture upgrade, or onsite extra."
            >
              <input
                id="title"
                name="title"
                type="text"
                required
                className={theme.input}
                placeholder="Additional lighting scope"
              />
            </FormField>

            <FormField
              id="description"
              label="Description"
              helperText="Describe what changed and why."
            >
              <AppTextarea
                id="description"
                name="description"
                className="min-h-24"
                placeholder="Client requested additional fixtures near the driveway..."
              />
            </FormField>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="subtotal"
                label="Subtotal"
                helperText="Pre-tax amount for this change."
              >
                <input
                  id="subtotal"
                  name="subtotal"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue="0"
                  className={theme.input}
                />
              </FormField>

              <FormField
                id="taxTotal"
                label="Tax"
                helperText="Tax amount for this change."
              >
                <input
                  id="taxTotal"
                  name="taxTotal"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue="0"
                  className={theme.input}
                />
              </FormField>
            </div>

            <AppButton type="submit" variant="primary" className="w-full">
              Create Change Order
            </AppButton>
          </form>
        </div>
      </div>
    </SectionCard>
  );
}