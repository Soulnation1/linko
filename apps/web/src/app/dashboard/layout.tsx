import type { ReactNode } from "react";
import { AuthGuard } from "@/components/auth";
import { DashboardShell } from "@/components/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // TODO(auth): a real backend must also enforce access server-side.
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}
