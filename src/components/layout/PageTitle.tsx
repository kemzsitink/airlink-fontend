interface PageTitleProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageTitle({ title, description, actions }: PageTitleProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="sm:flex-auto">
        <h1 className="text-base font-medium leading-6 text-neutral-800 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-300">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
