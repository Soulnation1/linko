import {
  ClipboardList,
  LayoutDashboard,
  PackageOpen,
  QrCode,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  href: string;
  labelKey: "dashboard" | "catalog" | "orders" | "share" | "settings";
  icon: LucideIcon;
  matches: (pathname: string) => boolean;
};

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  {
    href: "/dashboard",
    labelKey: "dashboard",
    icon: LayoutDashboard,
    matches: (pathname) => pathname === "/dashboard",
  },
  {
    href: "/dashboard/listings",
    labelKey: "catalog",
    icon: PackageOpen,
    matches: (pathname) =>
      pathname === "/dashboard/listings" ||
      pathname.startsWith("/dashboard/listings/"),
  },
  {
    href: "/dashboard/orders",
    labelKey: "orders",
    icon: ClipboardList,
    matches: (pathname) => pathname.startsWith("/dashboard/orders"),
  },
  {
    href: "/dashboard/share",
    labelKey: "share",
    icon: QrCode,
    matches: (pathname) => pathname.startsWith("/dashboard/share"),
  },
  {
    href: "/dashboard/settings",
    labelKey: "settings",
    icon: Settings,
    matches: (pathname) => pathname.startsWith("/dashboard/settings"),
  },
];

export function getDashboardNavLabel(
  labelKey: DashboardNavItem["labelKey"],
  terms: {
    catalogNavLabel: string;
    ordersTitle: string;
  },
): string {
  switch (labelKey) {
    case "dashboard":
      return "Dashboard";
    case "catalog":
      return terms.catalogNavLabel;
    case "orders":
      return terms.ordersTitle;
    case "share":
      return "Share & QR";
    case "settings":
      return "Settings";
  }
}

export function getDashboardSectionTitle(
  pathname: string,
  terms: {
    catalogNavLabel: string;
    ordersTitle: string;
  },
): string {
  const item = DASHBOARD_NAV_ITEMS.find(({ matches }) => matches(pathname));
  if (item) return getDashboardNavLabel(item.labelKey, terms);
  return "Business workspace";
}
