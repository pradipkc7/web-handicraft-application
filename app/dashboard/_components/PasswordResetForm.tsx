"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { handleUpdatePassword } from "@/lib/actions/auth-action";
import { UpdatePasswordFormData, updatePasswordSchema } from "./schema";

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export default function UpdatePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: UpdatePasswordFormData) => {
    setError("");

    startTransition(async () => {
      try {
        const result = await handleUpdatePassword(data);

        if (!result.success) {
          throw new Error(result.message || "Failed to update password");
        }

        toast.success("Password updated successfully");
      } catch (error: unknown) {
        const message = getErrorMessage(error, "Failed to update password");
        toast.error(message);
        setError(message);
      }
    });
  };

  const fieldClass =
    "h-12 w-full rounded-lg border border-stone-300 bg-white px-4 text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-amber-600";

  const labelClass = "mb-2 block text-sm font-medium text-stone-700";

  const errClass = "mt-1 block text-sm text-red-600";

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900">
            Account Security
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Update your password to keep your handicraft account secure.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className={labelClass}>Current Password</label>

            <input
              type="password"
              {...register("currentPassword")}
              placeholder="Enter current password"
              className={fieldClass}
            />

            {errors.currentPassword && (
              <span className={errClass}>{errors.currentPassword.message}</span>
            )}
          </div>

          <div className="mb-5">
            <label className={labelClass}>New Password</label>

            <input
              type="password"
              {...register("newPassword")}
              placeholder="Enter new password"
              className={fieldClass}
            />

            {errors.newPassword && (
              <span className={errClass}>{errors.newPassword.message}</span>
            )}
          </div>

          <div className="mb-6">
            <label className={labelClass}>Confirm New Password</label>

            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm new password"
              className={fieldClass}
            />

            {errors.confirmPassword && (
              <span className={errClass}>{errors.confirmPassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-amber-700 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Updating Password..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
