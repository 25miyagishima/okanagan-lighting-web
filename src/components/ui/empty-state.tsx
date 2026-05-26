import { theme } from "@/styles/theme";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div
      className={`${theme.surface.secondary} flex flex-col items-center justify-center p-6 text-center`}
    >
      <p className="text-sm font-medium text-[#F5F5F1]">
        {title}
      </p>

      <p className="mt-2 max-w-sm text-sm text-[#9EA3AA]">
        {description}
      </p>
    </div>
  );
}