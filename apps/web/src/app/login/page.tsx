import type { Metadata } from "next";
import { AuthLink, LoginForm, RedirectIfAuthenticated } from "@/components/auth";
import { AuthLayout } from "@/components/shared";

export const metadata: Metadata = {
  title: "Log in | Linko",
};

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Log in to Linko"
      subtext="Manage your business page, listings and orders."
      footer={
        <>
          New to Linko? <AuthLink href="/signup">Create an account</AuthLink>
        </>
      }
    >
      <RedirectIfAuthenticated />
      <LoginForm />
    </AuthLayout>
  );
}
