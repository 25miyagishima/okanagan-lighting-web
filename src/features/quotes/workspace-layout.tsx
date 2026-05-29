type WorkspaceLayoutProps = {
  navigation?: React.ReactNode;
  content: React.ReactNode;
  actions?: React.ReactNode;
};

export function WorkspaceLayout({
  navigation,
  content,
  actions,
}: WorkspaceLayoutProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_320px] lg:gap-5 xl:grid-cols-[240px_minmax(0,1fr)_340px]">
      {navigation ? (
        <aside className="min-w-0 lg:sticky lg:top-5 lg:self-start">
          {navigation}
        </aside>
      ) : null}

      <div className="min-w-0 space-y-4">{content}</div>

      {actions ? (
        <aside className="space-y-4 lg:sticky lg:top-5 lg:self-start">
          {actions}
        </aside>
      ) : null}
    </div>
  );
}