"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormField, Input } from "@/components/ui";
import { signInSchema, type SignInInput } from "@/lib/auth";
import { useAuthStore } from "@/stores/auth-store";
import { AuthLink } from "./auth-link";
import { FormError } from "./form-error";
import { PasswordField } from "./password-field";

// A successful sign-in is picked up by RedirectIfAuthenticated, which leaves the screen.
export function LoginForm() {
  const signIn = useAuthStore((state) => state.signIn);
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({ resolver: zodResolver(signInSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const result = await signIn(values);
    if (!result.ok) setFormError(result.error);
  });

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
      <FormField label="Password" error={errors.password?.message}>
        <PasswordField autoComplete="current-password" {...register("password")} />
      </FormField>
      <div className="text-right text-sm">
        <AuthLink href="/forgot-password">Forgot password?</AuthLink>
      </div>
      <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
        {isSubmitting ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}
