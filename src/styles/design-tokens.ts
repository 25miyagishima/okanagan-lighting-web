export const designTokens = {
  radius: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
  },

  spacing: {
    section: "space-y-4",
    card: "p-4",
    compactCard: "p-3",
  },

  typography: {
    pageTitle: "text-2xl font-semibold tracking-tight",
    sectionTitle: "text-base font-medium",
    body: "text-sm text-neutral-600",
    label: "text-sm font-medium",
    caption: "text-xs text-neutral-500",
  },

  surfaces: {
    card: "border bg-white",
    subtle: "bg-neutral-50",
    elevated: "bg-white shadow-sm",
  },

  status: {
    success: "bg-green-50 text-green-700",
    warning: "bg-yellow-50 text-yellow-700",
    danger: "bg-red-50 text-red-700",
    info: "bg-blue-50 text-blue-700",
  },
} as const;