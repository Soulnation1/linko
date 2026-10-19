"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAV_ITEMS, getDashboardNavLabel } from "@/lib/nav";
import { getTerms } from "@/lib/business-config";
import type { Business } from "@/types";

export function DashboardNav({
  business,
  onNavigate,
}: {
  business: Business;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const terms = getTerms(business);

  return (
    <nav aria-label="Business workspace">
      <ul className="space-y-1">
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const active = item.matches(pathname);
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
                  active
                    ? "bg-indigo-50 font-semibold text-indigo-700"
                    : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{getDashboardNavLabel(item.labelKey, terms)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
