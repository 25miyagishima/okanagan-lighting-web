import { theme } from "@/styles/theme";

export const formStyles = {
  label: `text-sm font-medium ${theme.text.primary}`,

  input:
    "mt-1 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] placeholder:text-[#5B6068] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10",

  textarea:
    "mt-1 min-h-20 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] placeholder:text-[#5B6068] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10",

  textareaLarge:
    "mt-1 min-h-28 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] placeholder:text-[#5B6068] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10",

  select:
    "mt-1 w-full rounded-xl border border-white/5 bg-[#23262B] px-3 py-2 text-sm text-[#F5F5F1] focus:border-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10",

  helperText: `text-xs ${theme.text.muted}`,

  errorText:
    "rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-300",

  successText:
    "rounded-lg border border-green-400/20 bg-green-500/10 px-3 py-2 text-sm text-green-300",

  primaryButton:
    "w-full rounded-xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] px-4 py-2 text-sm font-medium text-[#0D0E10] shadow-sm transition-all duration-200 hover:shadow-[0_0_18px_rgba(216,139,45,0.24)]",

  dangerButton:
    "w-full rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20",
} as const;