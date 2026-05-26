import { theme } from "@/styles/theme";

type AppTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function AppTextarea({
  className = "",
  ...props
}: AppTextareaProps) {
  return (
    <textarea
      className={`${theme.input} min-h-[120px] w-full py-3 ${className}`}
      {...props}
    />
  );
}