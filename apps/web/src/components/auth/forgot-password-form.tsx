"use client";

import { MailCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormField, Input } from "@/components/ui";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/auth";
import { useAuthStore } from "@/stores/auth-store";
import { AuthLink } from "./auth-link";
import { FormError } from "./form-error";

type SentState = { email: string; resetToken: string | null };

export function ForgotPasswordForm() {
  const requestPasswordReset = useAuthStore((state) => state.requestPasswordReset);
  const [formError, setFormError] = useState<string | null>(null);
  const [sent, setSent] = useState<SentState | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const result = await requestPasswordReset(values);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setSent({ email: values.email, resetToken: result.resetToken ?? null });
  });

  if (sent) {
    return (
      <div role="status" className="space-y-4 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[var(--bg-element)] text-theme-accent">
          <MailCheck className="size-6" aria-hidden="true" />
        </span>
        <p className="text-sm leading-6 text-theme-secondary">
          If an account exists for{" "}
          <span className="font-semibold text-theme-primary">{sent.email}</span>, we
          have sent a link to reset your password.
        </p>
        {sent.resetToken && (
          <p className="rounded-lg border border-dashed border-[var(--border-subtle)] bg-[var(--bg-base)] p-3 text-xs leading-5 text-theme-secondary">
            Demo only, no email is sent.{" "}
            <AuthLink href={`/reset-password?token=${encodeURIComponent(sent.resetToken)}`}>
              Open your reset link
            </AuthLink>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormError message={formError} />
      <FormField label="Email" error={errors.email?.message}>
        <Input
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          {...register("email")}
        />
      </FormField>
      <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
        {isSubmitting ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
