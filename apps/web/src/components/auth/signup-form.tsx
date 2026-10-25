"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuccessModal } from "@/components/shared";
import { Button, FormField, Input } from "@/components/ui";
import { signUpSchema, type SignUpInput } from "@/lib/auth";
import { useAuthStore } from "@/stores/auth-store";
import { DASHBOARD_PATH } from "./redirect-if-authenticated";
import { FormError } from "./form-error";
import { PasswordField } from "./password-field";

export function SignUpForm() {
  const signUp = useAuthStore((state) => state.signUp);
  const { show } = useSuccessModal();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const result = await signUp(values);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    show({
      title: "Your account is ready",
      message: "Welcome to Linko. Let's get your business page set up.",
      primaryAction: { label: "Continue", href: DASHBOARD_PATH },
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormError message={formError} />
      <FormField label="Your name" error={errors.name?.message}>
        <Input autoComplete="name" placeholder="Ada Okafor" {...register("name")} />
      </FormField>
      <FormField label="Email" error={errors.email?.message}>
        <Input
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          {...register("email")}
        />
      </FormField>
      <FormField
        label="Password"
        hint="At least 8 characters, with a letter and a number."
        error={errors.password?.message}
      >
        <PasswordField autoComplete="new-password" {...register("password")} />
      </FormField>
      <FormField label="Confirm password" error={errors.confirmPassword?.message}>
        <PasswordField autoComplete="new-password" {...register("confirmPassword")} />
      </FormField>
      <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
