import { Avatar } from "@/components/ui/avatar";
import type { Business } from "@/types";

export function BusinessIdentity({
  business,
  compact = false,
}: {
  business: Business;
  compact?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar
        src={business.logoUrl}
        name={business.name}
        alt={`${business.name} logo`}
        accentColor={business.accentColor ?? "#4F46E5"}
        size={compact ? 36 : 44}
        className="rounded-xl"
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-slate-900">
          {business.name}
        </p>
        {!compact && (
          <p className="mt-0.5 truncate text-xs text-slate-500">
            Linko Business
          </p>
        )}
      </div>
    </div>
  );
}
