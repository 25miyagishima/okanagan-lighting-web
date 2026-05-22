type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-[-0.02em] text-[#F5F5F1]">
          {title}
        </h1>

        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-[#9EA3AA]">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}