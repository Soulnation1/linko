import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white px-6 py-10 text-center ${className}`}
    >
      {icon && (
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
          {icon}
        </span>
      )}
      <h2 className="mt-3 text-base font-bold text-slate-900">{title}</h2>
      {description && (
        <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-600">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </section>
  );
}
