import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // TODO(auth): protect dashboard routes once real authentication is implemented.
  return <DashboardShell>{children}</DashboardShell>;
}
