type StatusTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "brand";

type StatusPillProps = {
  children: React.ReactNode;
  tone?: StatusTone;
};

const toneClassNames: Record<StatusTone, string> = {
  neutral:
    "border-white/[0.08] bg-white/[0.04] text-[#A7ABB1]",

  success:
    "border-green-400/20 bg-green-500/10 text-green-300",

  warning:
    "border-yellow-400/20 bg-yellow-500/10 text-yellow-300",

  danger:
    "border-red-400/20 bg-red-500/10 text-red-300",

  info:
    "border-blue-400/20 bg-blue-500/10 text-blue-300",

  brand:
    "border-[#D88B2D]/20 bg-[#D88B2D]/10 text-[#E2B15A]",
};

export function StatusPill({
  children,
  tone = "neutral",
}: StatusPillProps) {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-medium
        tracking-wide
        capitalize
        whitespace-nowrap
        ${toneClassNames[tone]}
      `}
    >
      {children}
    </span>
  );
}