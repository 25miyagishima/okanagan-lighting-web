import { theme } from "@/styles/theme";

export const formStyles = {
  label: `mb-1.5 block text-sm font-medium ${theme.text.primary}`,

  input: `
    ${theme.input}
    mt-1
    w-full
  `,

  textarea: `
    mt-1
    min-h-[110px]
    w-full
    rounded-2xl
    border
    border-white/[0.06]
    bg-[#1D2024]/90
    px-3
    py-3
    text-sm
    text-[#F5F5F1]
    placeholder:text-[#626872]
    shadow-inner
    outline-none
    transition-all
    duration-200
    focus:border-[#D88B2D]/45
    focus:ring-4
    focus:ring-[#D88B2D]/10
  `,

  textareaLarge: `
    mt-1
    min-h-[160px]
    w-full
    rounded-2xl
    border
    border-white/[0.06]
    bg-[#1D2024]/90
    px-3
    py-3
    text-sm
    text-[#F5F5F1]
    placeholder:text-[#626872]
    shadow-inner
    outline-none
    transition-all
    duration-200
    focus:border-[#D88B2D]/45
    focus:ring-4
    focus:ring-[#D88B2D]/10
  `,

  select: `
    ${theme.input}
    mt-1
    w-full
    appearance-none
  `,

  helperText: `
    mt-1
    text-xs
    leading-relaxed
    ${theme.text.muted}
  `,

  errorText:
    "text-sm text-red-300",

  successText:
    "text-sm text-green-300",

  primaryButton: `
    ${theme.button.primary}
    w-full
    sm:w-auto
  `,

  secondaryButton: `
    ${theme.button.secondary}
    w-full
    sm:w-auto
  `,

  ghostButton: `
    ${theme.button.ghost}
    w-full
    sm:w-auto
  `,

  dangerButton: `
    ${theme.button.danger}
    w-full
    sm:w-auto
  `,
} as const;