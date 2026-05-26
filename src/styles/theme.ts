export const theme = {
  background: {
    primary: "bg-[#0D0E10]",
    elevated: "bg-[#141618]",
    secondary: "bg-[#1D2024]",
    subtle: "bg-white/[0.025]",
    heroGlow:
      "bg-[radial-gradient(circle_at_72%_18%,rgba(216,139,45,0.14),transparent_26%),linear-gradient(180deg,#050607_0%,#0D0E10_100%)]",
  },

  border: {
    subtle: "border border-white/[0.06]",
    strong: "border border-white/10",
    active: "border border-[#D88B2D]/35",
    danger: "border border-red-400/20",
    success: "border border-green-400/20",
    warning: "border border-yellow-400/20",
    gold: "border border-[#D88B2D]/20",
  },

  text: {
    primary: "text-[#F5F5F1]",
    secondary: "text-[#A7ABB1]",
    muted: "text-[#626872]",
    danger: "text-red-300",
    success: "text-green-300",
    warning: "text-yellow-300",
  },

  accent: {
    amber: "text-[#D88B2D]",
    gold: "text-[#E2B15A]",
    glow: "text-[#F6D08A]",
    soft: "text-[#E2B15A]/80",
  },

  layout: {
    page:
      "min-h-screen bg-[#0D0E10] px-4 py-5 text-[#F5F5F1] sm:px-6 lg:px-8",
    pageLuxury:
      "min-h-screen bg-[#0D0E10] bg-[radial-gradient(circle_at_72%_18%,rgba(216,139,45,0.08),transparent_26%)] px-4 py-5 text-[#F5F5F1] sm:px-6 lg:px-8",
    pageInner: "mx-auto w-full max-w-7xl space-y-6",
    section: "space-y-6",
    gridTwo: "grid gap-5 lg:grid-cols-2",
    sidebarGrid: "grid gap-5 xl:grid-cols-[1fr_360px]",
  },

  surface: {
    card:
      "rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-sm backdrop-blur-xl transition-all duration-200 ease-out hover:border-[#D88B2D]/20 hover:bg-white/[0.04] hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:p-6",

    secondary:
      "rounded-2xl border border-white/[0.06] bg-[#1D2024]/85 p-5 transition-all duration-200 ease-out hover:border-white/10 hover:bg-[#1D2024] sm:p-6",

    inset:
      "rounded-2xl border border-white/[0.06] bg-white/[0.025]",

    glass:
      "rounded-2xl border border-white/10 bg-[#0D0E10]/72 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-200 ease-out hover:border-[#D88B2D]/20 sm:p-6",

    danger:
      "rounded-2xl border border-red-400/20 bg-red-500/10 p-4",

    success:
      "rounded-2xl border border-green-400/20 bg-green-500/10 p-4",

    warning:
      "rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-4",

    glow:
      "shadow-[0_0_0_1px_rgba(216,139,45,0.14),0_0_34px_rgba(216,139,45,0.10)]",

    goldLine:
      "border-t border-[#D88B2D]/25",
  },

  typography: {
    pageTitle:
      "font-serif text-3xl font-medium tracking-[-0.035em] text-[#F5F5F1] md:text-4xl",
    pageDescription: "mt-2 max-w-2xl text-sm leading-relaxed text-[#A7ABB1]",
    sectionTitle:
      "font-serif text-xl font-medium tracking-[-0.02em] text-[#F5F5F1]",
    cardTitle: "text-sm font-medium tracking-[0.08em] text-[#E2B15A]",
    label: "text-sm font-medium text-[#F5F5F1]",
    helper: "text-xs leading-relaxed text-[#A7ABB1]",
    muted: "text-xs text-[#626872]",
    valueLarge: "text-xl font-semibold text-[#F5F5F1]",
    eyebrow: "text-xs font-medium tracking-[0.22em] text-[#D88B2D]",
  },

  input:
    "h-10 rounded-2xl border border-white/[0.06] bg-[#1D2024]/90 px-3 text-sm text-[#F5F5F1] placeholder:text-[#626872] shadow-inner outline-none transition-all duration-200 focus:border-[#D88B2D]/45 focus:ring-4 focus:ring-[#D88B2D]/10",

  button: {
    primary:
      "inline-flex h-10 items-center justify-center rounded-2xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] px-4 text-sm font-semibold text-[#0D0E10] shadow-[0_0_24px_rgba(216,139,45,0.12)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(216,139,45,0.24)] active:translate-y-0",

    secondary:
      "inline-flex h-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-[#F5F5F1] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#D88B2D]/25 hover:bg-white/[0.07] active:translate-y-0",

    ghost:
      "inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm text-[#A7ABB1] transition-all duration-200 ease-out hover:bg-white/[0.04] hover:text-[#E2B15A]",

    danger:
      "inline-flex h-10 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 px-4 text-sm text-red-300 transition-all duration-200 ease-out hover:bg-red-500/20",
  },

  form: {
    stack: "space-y-4",
    compactStack: "space-y-3",
    rowTwo: "grid gap-4 md:grid-cols-2",
    actions: "flex flex-col gap-3 sm:flex-row sm:items-center",
  },

  motion: {
    standard: "transition-all duration-200 ease-out",
    colors: "transition-colors duration-200 ease-out",
    opacity: "transition-opacity duration-200 ease-out",
    lift: "transition-all duration-200 ease-out hover:-translate-y-0.5",
    press: "active:translate-y-0",
  },
} as const;