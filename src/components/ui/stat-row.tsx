type StatRowProps = {
  label: string;
  value: string | number;
  tone?: "default" | "success" | "warning" | "danger";
};

const toneClassName = {
  default: "text-[#F5F5F1]",
  success: "text-green-300",
  warning: "text-yellow-300",
  danger: "text-red-300",
};

export function StatRow({
  label,
  value,
  tone = "default",
}: StatRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[#9EA3AA]">{label}</span>

      <span className={`font-medium ${toneClassName[tone]}`}>
        {value}
      </span>
    </div>
  );
}