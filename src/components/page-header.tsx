import { theme } from "@/styles/theme";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <p className={theme.typography.eyebrow}>
            {eyebrow}
          </p>
        ) : null}

        <h1 className={theme.typography.pageTitle}>
          {title}
        </h1>

        {description ? (
          <p className={theme.typography.pageDescription}>
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          {actions}
        </div>
      ) : null}
    </header>
  );
}