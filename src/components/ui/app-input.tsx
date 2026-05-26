import { theme } from "@/styles/theme";

type AppInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function AppInput({
  className = "",
  ...props
}: AppInputProps) {
  return (
    <input
      className={`${theme.input} w-full ${className}`}
      {...props}
    />
  );
}