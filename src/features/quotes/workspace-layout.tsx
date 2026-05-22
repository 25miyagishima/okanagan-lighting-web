type WorkspaceLayoutProps = {
  content: React.ReactNode;
  actions?: React.ReactNode;
};

export function WorkspaceLayout({
  content,
  actions,
}: WorkspaceLayoutProps) {
  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4">
      <div className="min-w-0">
        {content}
      </div>

      {actions ? (
        <aside className="space-y-3 lg:sticky lg:top-4 lg:self-start lg:space-y-4">
          {actions}
        </aside>
      ) : null}
    </div>
  );
}