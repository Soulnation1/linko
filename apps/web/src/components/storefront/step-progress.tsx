const STEPS = ['Cart', 'Review', 'Send order'];

export type CheckoutStep = 1 | 2 | 3;

export function StepProgress({ step }: { step: CheckoutStep }) {
  return (
    <nav aria-label="Order progress" className="mb-8">
      <ol className="flex items-center">
        {STEPS.map((label, index) => {
          const number = index + 1;
          const active = number === step;
          const complete = number < step;
          return (
            <li
              key={label}
              className="flex min-w-0 flex-1 items-center last:flex-none"
              aria-current={active ? 'step' : undefined}
            >
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`flex size-7 items-center justify-center rounded-full text-[11px] font-bold ${
                    active
                      ? 'bg-[#4F46E5] text-white'
                      : complete
                        ? 'badge-success'
                        : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-theme-secondary'
                  }`}
                >
                  {complete ? '✓' : number}
                </span>
                <span
                  className={`hidden text-xs font-semibold sm:block ${
                    active ? 'text-theme-primary' : 'text-theme-secondary'
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`mx-3 h-px min-w-3 flex-1 ${
                    complete ? 'bg-[#4F46E5]' : 'bg-[var(--border-subtle)]'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
