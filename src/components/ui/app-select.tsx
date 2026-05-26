import { theme } from "@/styles/theme";

type AppSelectProps =
  React.SelectHTMLAttributes<HTMLSelectElement>;

export function AppSelect({
  className = "",
  children,
  ...props
}: AppSelectProps) {
  return (
    <select
      className={`${theme.input} w-full px-3 py-2 text-sm outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}