import type { Metadata } from "next";
import { AuthLink, ForgotPasswordForm, RedirectIfAuthenticated } from "@/components/auth";
import { AuthLayout } from "@/components/shared";

export const metadata: Metadata = {
  title: "Forgot password | Linko",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      heading="Forgot your password?"
      subtext="Enter your email and we will send you a link to reset it."
      footer={
        <>
          Remembered it? <AuthLink href="/login">Back to log in</AuthLink>
        </>
      }
    >
      <RedirectIfAuthenticated />
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
