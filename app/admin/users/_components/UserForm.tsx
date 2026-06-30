"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createUserSchema } from "./schema";
import { handleCreateUser } from "@/lib/actions/admin/user-action";

const fieldClass =
  "h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";
const labelClass = "mb-1.5 block text-xs font-medium text-gray-500";
const errClass = "mt-1.5 block text-xs text-red-500";

export default function UserForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = (data: any) => {
    setError("");
    startTransition(async () => {
      try {
        let result = await handleCreateUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          username: data.username,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          role: data.role,
          password: data.password,
        });
        if (!result.success) throw new Error(result.message);
        toast.success("User created successfully");
        router.push("/admin/users");
        router.refresh();
      } catch (err: any) {
        toast.error(err?.message);
        setError(err?.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
              Admin / Users
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
              Create User
            </h1>
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-4 text-xs font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900"
          >
            <svg
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3">
              <svg
                className="mt-0.5 shrink-0 text-red-500"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-semibold text-gray-700">
              Account Info
            </h2>

            <div className="mb-4">
              <label className={labelClass}>Email address</label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className={fieldClass}
              />
              {errors.email && (
                <span className={errClass}>
                  {errors.email.message as string}
                </span>
              )}
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>First name</label>
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder="Jane"
                  className={fieldClass}
                />
                {errors.firstName && (
                  <span className={errClass}>
                    {errors.firstName.message as string}
                  </span>
                )}
              </div>
              <div>
                <label className={labelClass}>Last name</label>
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Doe"
                  className={fieldClass}
                />
                {errors.lastName && (
                  <span className={errClass}>
                    {errors.lastName.message as string}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className={labelClass}>Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  @
                </span>
                <input
                  type="text"
                  {...register("username")}
                  placeholder="janedoe"
                  className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              {errors.username && (
                <span className={errClass}>
                  {errors.username.message as string}
                </span>
              )}
            </div>

            <div>
              <label className={labelClass}>Phone number</label>
              <input
                type="tel"
                {...register("phoneNumber")}
                placeholder="98XXXXXXXX"
                className={fieldClass}
              />
              {errors.phoneNumber && (
                <span className={errClass}>
                  {errors.phoneNumber.message as string}
                </span>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-semibold text-gray-700">
              Permissions & Details
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Role</label>
                <select {...register("role")} className={fieldClass}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <span className={errClass}>
                    {errors.role.message as string}
                  </span>
                )}
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <select {...register("gender")} className={fieldClass}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <span className={errClass}>
                    {errors.gender.message as string}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold text-gray-700">
              Password
            </h2>
            <p className="mb-4 text-xs text-gray-400">
              Must be at least 8 characters long.
            </p>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={fieldClass}
            />
            {errors.password && (
              <span className={errClass}>
                {errors.password.message as string}
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pb-10">
            <button
              type="button"
              onClick={() => router.back()}
              className="h-10 rounded-md border border-gray-200 px-5 text-sm font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-indigo-600 px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Creating…
                </>
              ) : (
                "Create user"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
