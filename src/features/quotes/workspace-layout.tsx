type WorkspaceLayoutProps = {
  content: React.ReactNode;
  actions?: React.ReactNode;
};

export function WorkspaceLayout({ content, actions }: WorkspaceLayoutProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">{content}</div>

      {actions ? (
        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          {actions}
        </aside>
      ) : null}
    </div>
  );
}