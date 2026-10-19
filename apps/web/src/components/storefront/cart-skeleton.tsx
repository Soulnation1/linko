import { Card, Skeleton } from '@/components/ui';

export function CartSkeleton() {
  return (
    <div role="status" aria-busy="true" className="space-y-4">
      <span className="sr-only">Loading your cart</span>
      <Card className="animate-pulse overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        {[0, 1].map((row) => (
          <div
            key={row}
            className="flex items-center gap-3.5 border-b border-[var(--border-subtle)] px-4 py-4 last:border-b-0"
          >
            <Skeleton className="size-12 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        ))}
      </Card>
      <Card className="animate-pulse space-y-3 p-4">
        <div className="flex justify-between">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-3.5 w-20" />
        </div>
        <Skeleton className="h-3 w-3/4" />
      </Card>
      <div className="grid animate-pulse grid-cols-[auto_1fr] gap-3">
        <Skeleton className="h-12 w-28 rounded-lg" />
        <Skeleton className="h-12 rounded-lg" />
      </div>
    </div>
  );
}
