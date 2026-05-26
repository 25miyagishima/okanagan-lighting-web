import { theme } from "@/styles/theme";

type AppCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AppCard({
  children,
  className = "",
}: AppCardProps) {
  return (
    <section
      className={`
        ${theme.surface.card}
        ${theme.motion.standard}
        overflow-hidden
        ${className}
      `}
    >
      {children}
    </section>
  );
}