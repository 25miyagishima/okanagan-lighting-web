import { AppButton } from "@/components/ui/app-button";
import { AppTextarea } from "@/components/ui/app-textarea";
import { StatusPill } from "@/components/status-pill";
import { SectionCard } from "@/features/quotes/quote-sidebar/section-card";
import type { InstallReadiness } from "@/types/database";
import { upsertInstallReadiness } from "@/features/install-readiness/install-readiness-actions";

type InstallReadinessPanelProps = {
  quoteId: string;
  readiness: InstallReadiness | null;
};

function ReadinessCheckbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-sm text-[#A7ABB1]">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1"
      />

      <span>{label}</span>
    </label>
  );
}

export function InstallReadinessPanel({
  quoteId,
  readiness,
}: InstallReadinessPanelProps) {
  async function saveReadinessAction(formData: FormData) {
    "use server";
    await upsertInstallReadiness(quoteId, formData);
  }

  const readyCount = [
    readiness?.materialsReady,
    readiness?.transformersReady,
    readiness?.clientConfirmed,
    readiness?.siteAccessConfirmed,
    readiness?.installDateConfirmed,
    readiness?.crewAssigned,
  ].filter(Boolean).length;

  const readyForInstall = readiness?.readyForInstall ?? false;

  return (
    <SectionCard
      title="Install Readiness"
      actions={
        readyForInstall ? (
          <StatusPill tone="success">ready</StatusPill>
        ) : (
          <StatusPill tone="warning">{readyCount}/6 ready</StatusPill>
        )
      }
    >
      <div className="space-y-4">
        {readyForInstall ? (
          <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-4">
            <p className="text-sm font-medium text-green-300">
              Ready for install.
            </p>

            <p className="mt-2 text-xs leading-relaxed text-[#A7ABB1]">
              Materials, transformer planning, client confirmation, site access,
              install date, and crew assignment are all marked ready.
            </p>

            {readiness?.readyAt ? (
              <p className="mt-2 text-xs text-[#A7ABB1]">
                Marked ready{" "}
                {new Date(readiness.readyAt).toLocaleDateString()}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#D88B2D]/20 bg-[#D88B2D]/10 p-4">
            <p className="text-sm font-medium text-[#E2B15A]">
              Install preparation in progress.
            </p>

            <p className="mt-2 text-xs leading-relaxed text-[#A7ABB1]">
              Complete the readiness checklist before handing this quote off to
              scheduling or field installation.
            </p>
          </div>
        )}

        <form action={saveReadinessAction} className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <ReadinessCheckbox
              name="materialsReady"
              label="Materials are confirmed and ready."
              defaultChecked={readiness?.materialsReady ?? false}
            />

            <ReadinessCheckbox
              name="transformersReady"
              label="Transformers and load planning are confirmed."
              defaultChecked={readiness?.transformersReady ?? false}
            />

            <ReadinessCheckbox
              name="clientConfirmed"
              label="Client has confirmed the project."
              defaultChecked={readiness?.clientConfirmed ?? false}
            />

            <ReadinessCheckbox
              name="siteAccessConfirmed"
              label="Site access is confirmed."
              defaultChecked={readiness?.siteAccessConfirmed ?? false}
            />

            <ReadinessCheckbox
              name="installDateConfirmed"
              label="Install date is confirmed."
              defaultChecked={readiness?.installDateConfirmed ?? false}
            />

            <ReadinessCheckbox
              name="crewAssigned"
              label="Crew or installer is assigned."
              defaultChecked={readiness?.crewAssigned ?? false}
            />
          </div>

          <div>
            <label
              htmlFor="readinessNotes"
              className="text-sm font-medium text-[#F5F5F1]"
            >
              Readiness Notes
            </label>

            <p className="mt-1 text-xs leading-relaxed text-[#A7ABB1]">
              Add any scheduling, access, staging, material, or handoff notes.
            </p>

            <AppTextarea
              id="readinessNotes"
              name="readinessNotes"
              defaultValue={readiness?.readinessNotes ?? ""}
              className="mt-3 min-h-24"
              placeholder="Gate code, preferred install window, material staging notes..."
            />
          </div>

          <AppButton type="submit" variant="primary" className="w-full">
            Save Install Readiness
          </AppButton>
        </form>
      </div>
    </SectionCard>
  );
}