"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
  ResetPasswordFormData,
  resetPasswordSchema,
} from "./schema";
import { handleForgotPassword, handleResetPassword } from "@/lib/actions/auth-action";

const inputClass =
  "w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-900 focus:ring-2 focus:ring-amber-100";

const labelClass = "block text-sm font-medium text-zinc-700";

export default function ForgotPasswordFormZod() {
  const [email, setEmail] = useState("");
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const router = useRouter();

  const emailForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: "", newPassword: "", confirmPassword: "" },
  });

  const requestCode = async (data: ForgotPasswordFormData) => {
    setSubmissionError(null);

    try {
      const result = await handleForgotPassword(data.email);
      if (result.success) {
        setEmail(data.email);
        toast.success(result.message || "Reset code sent to your email");
      } else {
        setSubmissionError(result.message || "Failed to send reset code");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to send reset code";
      setSubmissionError(message);
    }
  };

  const submitReset = async (data: ResetPasswordFormData) => {
    setSubmissionError(null);

    try {
      const result = await handleResetPassword({
        email,
        code: data.code,
        newPassword: data.newPassword,
      });

      if (result.success) {
        toast.success(result.message || "Password reset successfully");
        router.push("/login");
      } else {
        setSubmissionError(result.message || "Failed to reset password");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to reset password";
      setSubmissionError(message);
    }
  };

  // STEP 1 — request code
  if (!email) {
    return (
      <form
        onSubmit={emailForm.handleSubmit(requestCode)}
        className="space-y-6"
      >
        <div className="space-y-3">
          <label className={labelClass}>Email address</label>
          <input
            type="email"
            className={inputClass}
            placeholder="you@example.com"
            {...emailForm.register("email")}
          />
          {emailForm.formState.errors.email && (
            <p className="text-sm text-red-600">
              {emailForm.formState.errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={emailForm.formState.isSubmitting}
          className="w-full rounded-3xl bg-amber-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Send Reset Code
        </button>

        {submissionError ? (
          <p className="mt-4 text-sm text-red-600">{submissionError}</p>
        ) : null}
      </form>
    );
  }

  // STEP 2 — enter code + new password
  return (
    <form onSubmit={resetForm.handleSubmit(submitReset)} className="space-y-6">
      <p className="text-sm text-zinc-600">
        We sent a verification code to <strong>{email}</strong>. Enter it
        below along with your new password.
      </p>

      <div className="space-y-3">
        <label className={labelClass}>Verification code</label>
        <input
          type="text"
          inputMode="numeric"
          className={inputClass}
          placeholder="Enter the code"
          {...resetForm.register("code")}
        />
        {resetForm.formState.errors.code && (
          <p className="text-sm text-red-600">
            {resetForm.formState.errors.code.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label className={labelClass}>New password</label>
        <input
          type="password"
          className={inputClass}
          {...resetForm.register("newPassword")}
        />
        {resetForm.formState.errors.newPassword && (
          <p className="text-sm text-red-600">
            {resetForm.formState.errors.newPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label className={labelClass}>Confirm new password</label>
        <input
          type="password"
          className={inputClass}
          {...resetForm.register("confirmPassword")}
        />
        {resetForm.formState.errors.confirmPassword && (
          <p className="text-sm text-red-600">
            {resetForm.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={resetForm.formState.isSubmitting}
        className="w-full rounded-3xl bg-amber-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Reset Password
      </button>

      <button
        type="button"
        onClick={() => setEmail("")}
        className="w-full text-center text-sm font-medium text-amber-900 hover:underline"
      >
        Use a different email
      </button>

      {submissionError ? (
        <p className="mt-4 text-sm text-red-600">{submissionError}</p>
      ) : null}
    </form>
  );
}
