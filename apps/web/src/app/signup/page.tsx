import type { Metadata } from "next";
import { AuthLink, RedirectIfAuthenticated, SignUpForm } from "@/components/auth";
import { AuthLayout } from "@/components/shared";

export const metadata: Metadata = {
  title: "Create your account | Linko",
};

export default function SignUpPage() {
  return (
    <AuthLayout
      heading="Create your account"
      subtext="Set up your business page and start taking orders."
      footer={
        <>
          Already have an account? <AuthLink href="/login">Log in</AuthLink>
        </>
      }
    >
      <RedirectIfAuthenticated />
      <SignUpForm />
    </AuthLayout>
  );
}
