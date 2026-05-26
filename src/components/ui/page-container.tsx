import { theme } from "@/styles/theme";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div className={`${theme.layout.page} ${className}`}>
      <div className={theme.layout.pageInner}>
        {children}
      </div>
    </div>
  );
}