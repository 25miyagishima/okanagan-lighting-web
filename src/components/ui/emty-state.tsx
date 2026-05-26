import { theme } from "@/styles/theme";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      className={`
        ${theme.surface.inset}
        flex
        min-h-[180px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-white/[0.08]
        px-6
        py-10
        text-center
      `}
    >
      <div className="max-w-md">
        <p className="font-serif text-xl font-medium tracking-[-0.03em] text-[#F5F5F1]">
          {title}
        </p>

        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-[#A7ABB1]">
            {description}
          </p>
        ) : null}

        {action ? (
          <div className="mt-6 flex justify-center">
            {action}
          </div>
        ) : null}
      </div>
    </div>
  );
}