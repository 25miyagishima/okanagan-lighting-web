import { theme } from "@/styles/theme";

type AppSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
};

export function AppSection({
  title,
  description,
  children,
  className = "",
  actions,
}: AppSectionProps) {
  return (
    <section
      className={`${theme.surface.card} ${theme.layout.section} ${className}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className={theme.typography.sectionTitle}>
            {title}
          </h2>

          {description ? (
            <p className={`${theme.typography.helper} mt-1`}>
              {description}
            </p>
          ) : null}
        </div>

        {actions ? (
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            {actions}
          </div>
        ) : null}
      </div>

      {children}
    </section>
  );
}