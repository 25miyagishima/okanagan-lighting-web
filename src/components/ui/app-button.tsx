import { theme } from "@/styles/theme";

type AppButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "ghost";

type AppButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: AppButtonVariant;
  };

const variantClassName: Record<AppButtonVariant, string> = {
  primary: theme.button.primary,

  secondary: theme.button.secondary,

  danger: theme.button.danger,

  success:
    "inline-flex h-10 items-center justify-center rounded-2xl border border-green-400/20 bg-green-500/10 px-4 text-sm font-medium text-green-300 transition-all duration-200 hover:bg-green-500/20",

  ghost:
    "inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium text-[#A7ABB1] transition-all duration-200 hover:bg-white/[0.04] hover:text-[#F5F5F1]",
};

export function AppButton({
  variant = "secondary",
  className = "",
  children,
  ...props
}: AppButtonProps) {
  return (
    <button
      type="button"
      className={`
        ${variantClassName[variant]}
        inline-flex
        items-center
        justify-center
        whitespace-nowrap
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${theme.motion.standard}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}