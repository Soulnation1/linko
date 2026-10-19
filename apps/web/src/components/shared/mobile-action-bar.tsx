import type { ReactNode } from "react";

export function MobileActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none sticky bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-20 mt-6 lg:hidden">
      <div className="pointer-events-auto rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg shadow-slate-900/10 backdrop-blur">
        {children}
      </div>
    </div>
  );
}
