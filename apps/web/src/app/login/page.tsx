import type { Metadata } from "next";
import { AuthLayout } from "@/components/shared";

export const metadata: Metadata = {
  title: "Log in · Linko",
};

// TODO(auth): replace this placeholder with the real login form in the authentication phase.
export default function LoginPage() {
  return (
    <AuthLayout
      heading="Log in to Linko"
      subtext="Manage your business page, listings and orders."
    >
      <p className="text-sm text-theme-secondary">
        The login form is coming soon.
      </p>
    </AuthLayout>
  );
}
