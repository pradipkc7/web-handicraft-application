"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { editUserSchema } from "./schema";
import { handleUpdateUser } from "@/lib/actions/admin/user-action";

const fieldClass =
  "h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";
const labelClass = "mb-1.5 block text-xs font-medium text-gray-500";
const errClass = "mt-1.5 block text-xs text-red-500";

export default function UserFormEdit({ user }: { user?: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      username: user?.username || "",
      phoneNumber: user?.phoneNumber || "",
      gender: user?.gender || "",
      role: user?.role || "user",
      password: "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = (data: any) => {
    setError("");
    startTransition(async () => {
      try {
        const formdata = new FormData();
        formdata.append("firstName", data.firstName || "");
        formdata.append("lastName", data.lastName || "");
        formdata.append("email", data.email || "");
        formdata.append("username", data.username || "");
        formdata.append("phoneNumber", data.phoneNumber || "");
        formdata.append("gender", data.gender || "");
        formdata.append("role", data.role || "user");
        if (data.image) formdata.append("profileImage", data.image);
        let result = await handleUpdateUser(user._id, formdata);
        if (!result.success) throw new Error(result.message);
        toast.success("User updated successfully");
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
              Edit User
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
              Profile Photo
            </h2>
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                {previewImage ? (
                  <>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-20 w-20 rounded-full object-cover ring-2 ring-gray-200"
                    />
                    <Controller
                      name="image"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <button
                          type="button"
                          onClick={() => handleDismissImage(onChange)}
                          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white shadow-sm transition-opacity hover:opacity-90"
                        >
                          ✕
                        </button>
                      )}
                    />
                  </>
                ) : user?.imageUrl ? (
                  <Image
                    src={process.env.NEXT_PUBLIC_API_BASE_URL + user.imageUrl}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full object-cover ring-2 ring-gray-200"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-400 ring-2 ring-gray-200">
                    No photo
                  </div>
                )}
              </div>

              <div className="flex-1">
                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <label className="group flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-5 transition-colors hover:border-indigo-400 hover:bg-indigo-50/40">
                      <svg
                        className="text-gray-400 group-hover:text-indigo-500"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span className="text-xs text-gray-500 group-hover:text-indigo-600">
                        Click to upload
                      </span>
                      <span className="text-[10px] text-gray-400">
                        JPG, PNG, WEBP
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) =>
                          handleImageChange(e.target.files?.[0], onChange)
                        }
                      />
                    </label>
                  )}
                />
                {errors.image && (
                  <span className={errClass}>
                    {errors.image.message as string}
                  </span>
                )}
              </div>
            </div>
          </div>

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

            <div>
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
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-semibold text-gray-700">
              Permissions & Details
            </h2>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

            <div>
              <label className={labelClass}>Phone number</label>
              <input
                type="text"
                {...register("phoneNumber")}
                placeholder="+1 (555) 000-0000"
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
            <h2 className="mb-1 text-sm font-semibold text-gray-700">
              Change Password
            </h2>
            <p className="mb-4 text-xs text-gray-400">
              Leave blank to keep the current password.
            </p>
            <label className={labelClass}>New password</label>
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
                  Saving…
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
