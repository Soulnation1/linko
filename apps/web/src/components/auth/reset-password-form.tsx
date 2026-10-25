"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuccessModal } from "@/components/shared";
import { Button, FormField } from "@/components/ui";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/auth";
import { useAuthStore } from "@/stores/auth-store";
import { AuthLink } from "./auth-link";
import { FormError } from "./form-error";
import { PasswordField } from "./password-field";

export function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const { show } = useSuccessModal();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const result = await resetPassword({ ...values, token });
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    router.replace("/login");
    show({
      title: "Password updated",
      message: "You can now log in with your new password.",
      primaryAction: { label: "Log in", href: "/login" },
    });
  });

  if (!token) {
    return (
      <div className="space-y-4">
        <FormError message="This reset link is missing its token." />
        <p className="text-sm text-theme-secondary">
          <AuthLink href="/forgot-password">Request a new reset link</AuthLink>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormError message={formError} />
      <FormField
        label="New password"
        hint="At least 8 characters, with a letter and a number."
        error={errors.password?.message}
      >
        <PasswordField autoComplete="new-password" {...register("password")} />
      </FormField>
      <FormField label="Confirm new password" error={errors.confirmPassword?.message}>
        <PasswordField autoComplete="new-password" {...register("confirmPassword")} />
      </FormField>
      <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
        {isSubmitting ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
