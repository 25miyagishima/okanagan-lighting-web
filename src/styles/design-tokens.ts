export const designTokens = {
  radius: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
  },

  shadow: {
    sm: "shadow-[0_4px_24px_rgba(0,0,0,0.24)]",
    md: "shadow-[0_8px_40px_rgba(0,0,0,0.32)]",
  },

  spacing: {
    section: "space-y-4",
    card: "p-4",
    compactCard: "p-3",
  },

  typography: {
    pageTitle: "text-2xl font-semibold tracking-tight text-[#F5F5F1]",
    sectionTitle: "text-base font-medium text-[#F5F5F1]",
    body: "text-sm text-[#9EA3AA]",
    label: "text-sm font-medium text-[#F5F5F1]",
    caption: "text-xs text-[#5B6068]",
  },

  surfaces: {
    card:
      "rounded-2xl border border-white/5 bg-[#181A1D]",
    subtle:
      "rounded-xl border border-white/5 bg-white/[0.03]",
    elevated:
      "rounded-2xl border border-white/5 bg-[#181A1D] shadow-[0_8px_40px_rgba(0,0,0,0.32)]",
  },

  status: {
    success:
      "border border-green-500/20 bg-green-500/10 text-green-300",

    warning:
      "border border-yellow-500/20 bg-yellow-500/10 text-yellow-300",

    danger:
      "border border-red-500/20 bg-red-500/10 text-red-300",

    info:
      "border border-blue-500/20 bg-blue-500/10 text-blue-300",
  },
} as const;