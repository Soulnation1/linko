export function FormError({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="rounded-lg border border-[var(--accent-error)] bg-[var(--status-error-bg)] px-3 py-2.5 text-sm text-[var(--status-error-text)]"
    >
      {message}
    </p>
  );
}
