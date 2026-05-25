"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "./schema";

export default function SignupFormZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "default@gmail.com",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    alert(
      `Submitted data: ${data.fullname}, ${data.email}, ${data.dateOfBirth}, ${data.password}`,
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-zinc-700">
          Full name
        </label>
        <input
          type="text"
          className="w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-900 focus:ring-2 focus:ring-amber-100"
          {...register("fullname")}
        />
        {errors.fullname && (
          <p className="text-sm text-red-600">{errors.fullname.message}</p>
        )}
      </div>

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
          Date of birth
        </label>
        <input
          type="date"
          className="w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-900 focus:ring-2 focus:ring-amber-100"
          {...register("dateOfBirth")}
        />
        {errors.dateOfBirth && (
          <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>
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

      <div className="space-y-3">
        <label className="block text-sm font-medium text-zinc-700">
          Confirm password
        </label>
        <input
          type="password"
          className="w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-900 focus:ring-2 focus:ring-amber-100"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-3xl bg-amber-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Signup
      </button>
    </form>
  );
}
