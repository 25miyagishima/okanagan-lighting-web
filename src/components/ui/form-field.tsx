import { theme } from "@/styles/theme";

type FormFieldProps = {
  id: string;
  label: string;
  helperText?: string;
  errorText?: string;
  children: React.ReactNode;
};

export function FormField({
  id,
  label,
  helperText,
  errorText,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={theme.typography.label}>
        {label}
      </label>

      <div className="mt-1.5">{children}</div>

      {helperText ? (
        <p className={`${theme.typography.helper} mt-1.5`}>
          {helperText}
        </p>
      ) : null}

      {errorText ? (
        <p className="mt-1.5 text-xs leading-relaxed text-red-300">
          {errorText}
        </p>
      ) : null}
    </div>
  );
}