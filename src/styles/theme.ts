export const theme = {
  background: {
    primary: "bg-[#0D0E10]",
    elevated: "bg-[#181A1D]",
    secondary: "bg-[#23262B]",
  },

  border: {
    subtle: "border border-white/5",
    active: "border border-amber-500/30",
  },

  text: {
    primary: "text-[#F5F5F1]",
    secondary: "text-[#9EA3AA]",
    muted: "text-[#5B6068]",
  },

  accent: {
    amber: "text-[#D88B2D]",
    gold: "text-[#E2B15A]",
    glow: "text-[#F6D08A]",
  },

  surface: {
    card:
      "rounded-2xl border border-white/5 bg-[#181A1D] shadow-[0_4px_24px_rgba(0,0,0,0.32)]",

    secondary:
      "rounded-2xl border border-white/5 bg-[#23262B]",

    glow:
      "shadow-[0_0_0_1px_rgba(216,139,45,0.12),0_0_24px_rgba(216,139,45,0.08)]",
  },

  input:
    "rounded-xl border border-white/5 bg-[#23262B] text-[#F5F5F1] placeholder:text-[#5B6068] focus:border-amber-500/40 focus:ring-4 focus:ring-amber-500/10",

  button: {
    primary:
      "rounded-xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] text-[#0D0E10] shadow-sm transition-all duration-200 hover:shadow-[0_0_18px_rgba(216,139,45,0.24)]",

    secondary:
      "rounded-xl border border-white/10 bg-white/5 text-[#F5F5F1] transition-colors hover:bg-white/10",
  },

  motion: {
    standard: "transition-all duration-200 ease-out",
  },
} as const;