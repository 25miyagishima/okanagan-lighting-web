import { theme } from "@/styles/theme";

type SkeletonCardProps = {
  rows?: number;
  className?: string;
};

export function SkeletonCard({
  rows = 3,
  className = "",
}: SkeletonCardProps) {
  return (
    <div
      className={`${theme.surface.card} animate-pulse overflow-hidden ${className}`}
    >
      <div className="h-3 w-24 rounded-full bg-white/[0.08]" />

      <div className="mt-5 h-8 w-32 rounded-full bg-white/[0.08]" />

      <div className="mt-6 space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="h-3 rounded-full bg-white/[0.06]"
            style={{
              width:
                index % 3 === 0
                  ? "100%"
                  : index % 3 === 1
                    ? "78%"
                    : "52%",
            }}
          />
        ))}
      </div>
    </div>
  );
}