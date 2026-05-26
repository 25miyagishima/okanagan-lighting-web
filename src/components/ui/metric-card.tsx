import { AppCard } from "@/components/ui/app-card";
import { theme } from "@/styles/theme";

type MetricCardTone =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "brand";

type MetricCardProps = {
  label: string;
  value: string | number;
  helperText?: string;
  tone?: MetricCardTone;
};

const toneClassName: Record<MetricCardTone, string> = {
  default: "text-[#F5F5F1]",
  success: "text-green-300",
  warning: "text-yellow-300",
  danger: "text-red-300",
  brand: "text-[#E2B15A]",
};

export function MetricCard({
  label,
  value,
  helperText,
  tone = "default",
}: MetricCardProps) {
  return (
    <AppCard className="flex min-h-[148px] flex-col justify-between">
      <div>
        <p className={theme.typography.eyebrow}>
          {label}
        </p>

        <p
          className={`mt-4 text-4xl font-semibold tracking-[-0.04em] ${toneClassName[tone]}`}
        >
          {value}
        </p>
      </div>

      {helperText ? (
        <p className="mt-5 text-xs leading-relaxed text-[#626872]">
          {helperText}
        </p>
      ) : null}
    </AppCard>
  );
}