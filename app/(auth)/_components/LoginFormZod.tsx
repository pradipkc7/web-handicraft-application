"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "./schema";
import { useAuth } from "@/lib/contexts/AuthContexts";

interface LoginFormZodProps {
  action: (
    data: LoginFormData,
  ) => Promise<{ success: boolean; message?: string | null; data?: unknown }>;
}

export default function LoginFormZod({ action }: LoginFormZodProps) {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const router = useRouter();
  const { checkAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setSubmissionError(null);

    try {
      const result = await action(data);
      if (result.success) {
        await checkAuth();
        router.push("/dashboard");
      } else {
        setSubmissionError(result.message || "Login failed");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Login failed";
      setSubmissionError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-zinc-700">
          Email address
        </label>
        <input
          type="email"
          className="w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-900 focus:ring-2 focus:ring-amber-100"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-zinc-700">
          Password
        </label>
        <input
          type="password"
          className="w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-900 focus:ring-2 focus:ring-amber-100"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-zinc-600">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-zinc-300 text-amber-900 focus:ring-amber-900"
          />
          Remember me
        </label>
        <a
          href="/forgot-password"
          className="font-medium text-amber-900 hover:underline"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-3xl bg-amber-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Enter HandiCraft
      </button>
      {submissionError ? (
        <p className="mt-4 text-sm text-red-600">{submissionError}</p>
      ) : null}
    </form>
  );
}
