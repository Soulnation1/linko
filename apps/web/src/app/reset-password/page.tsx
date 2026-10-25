import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLink, RedirectIfAuthenticated, ResetPasswordForm } from "@/components/auth";
import { AuthLayout } from "@/components/shared";

export const metadata: Metadata = {
  title: "Reset password | Linko",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      heading="Choose a new password"
      subtext="Pick a password you have not used before."
      footer={<AuthLink href="/login">Back to log in</AuthLink>}
    >
      <RedirectIfAuthenticated />
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
