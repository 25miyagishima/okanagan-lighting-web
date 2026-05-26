type WorkspaceLayoutProps = {
  content: React.ReactNode;
  actions?: React.ReactNode;
};

export function WorkspaceLayout({
  content,
  actions,
}: WorkspaceLayoutProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-5">
      <div className="min-w-0 space-y-4">
        {content}
      </div>

      {actions ? (
        <aside className="space-y-4 xl:sticky xl:top-5 xl:self-start">
          <div className="space-y-4">
            {actions}
          </div>
        </aside>
      ) : null}
    </div>
  );
}