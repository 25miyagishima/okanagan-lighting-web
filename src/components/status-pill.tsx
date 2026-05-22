type StatusTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

type StatusPillProps = {
  children: React.ReactNode;
  tone?: StatusTone;
};

const toneClassNames: Record<StatusTone, string> = {
  neutral:
    "border-white/5 bg-white/[0.04] text-[#9EA3AA]",
  success:
    "border-green-400/20 bg-green-500/10 text-green-300",
  warning:
    "border-yellow-400/20 bg-yellow-500/10 text-yellow-300",
  danger:
    "border-red-400/20 bg-red-500/10 text-red-300",
  info:
    "border-blue-400/20 bg-blue-500/10 text-blue-300",
};

export function StatusPill({
  children,
  tone = "neutral",
}: StatusPillProps) {
  return (
    <span
      className={`rounded-full border px-2 py-1 text-xs capitalize ${toneClassNames[tone]}`}
    >
      {children}
    </span>
  );
}