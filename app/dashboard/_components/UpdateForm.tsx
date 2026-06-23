"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Slide, toast } from "react-toastify";

import { UpdateProfileFormData, updateProfileSchema } from "./schema";

import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { useAuth } from "@/lib/contexts/AuthContexts";

type ProfileUser = {
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  gender?: "male" | "female" | "other";
  profileImage?: string;
  profileImageUrl?: string;
  imageUrl?: string;
  image?: string;
};

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export default function UpdateForm({ user }: { user: ProfileUser | null }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const router = useRouter();
  const { setUser } = useAuth();
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088";
  const currentImage =
    user?.profileImage || user?.profileImageUrl || user?.imageUrl || user?.image;
  const imageSrc =
    typeof currentImage === "string" && currentImage.startsWith("http")
      ? currentImage
      : currentImage
        ? `${baseUrl}${currentImage}`
        : null;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      phoneNumber: user?.phoneNumber || "",
      gender: user?.gender || "male",
    },
  });

  // IMAGE CHANGE
  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  // REMOVE IMAGE
  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    setFileInputKey((key) => key + 1);
  };

  // SUBMIT
  const onSubmit = (data: UpdateProfileFormData) => {
    setError("");
    setSuccessMessage("");

    startTransition(async () => {
      try {
        const formdata = new FormData();

        formdata.append("email", data.email);
        formdata.append("firstName", data.firstName);
        formdata.append("lastName", data.lastName);
        formdata.append("username", data.username);
        formdata.append("phoneNumber", data.phoneNumber);
        formdata.append("gender", data.gender);

        if (data.image) {
          formdata.append("profileImage", data.image);
        }

        const result = await handleUpdateProfile(formdata);

        if (!result.success) {
          throw new Error(result.message || "Update failed");
        }

        const message = result.message || "Profile updated successfully";

        setSuccessMessage(message);
        toast.success(message, {
          position: "top-center",
          transition: Slide,
        });

        const updatedUser = result.data?.user || result.data;
        if (updatedUser && typeof updatedUser === "object") {
          setUser(updatedUser as ProfileUser);
        }

        handleDismissImage();
        router.refresh();
      } catch (err: unknown) {
        const message = getErrorMessage(err, "Something went wrong");
        setSuccessMessage("");
        toast.error(message);
        setError(message);
      }
    });
  };

  // STYLES (handicraft theme)
  const fieldClass =
    "h-12 w-full rounded-lg border border-stone-300 bg-white px-4 text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-amber-600";

  const labelClass = "mb-2 block text-sm font-medium text-stone-700";

  const errClass = "mt-1 block text-sm text-red-600";

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900">User Profile</h1>
          <p className="mt-2 text-sm text-stone-500">
            Update your handicraft account details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ERROR */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {successMessage}
            </div>
          )}

          {/* IMAGE PREVIEW */}
          <div className="mb-6 flex justify-center">
            {previewImage ? (
              <div className="relative">
                <Image
                  src={previewImage}
                  alt="preview"
                  width={112}
                  height={112}
                  unoptimized
                  className="h-28 w-28 rounded-full object-cover border-4 border-amber-100"
                />

                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <button
                      type="button"
                      onClick={() => handleDismissImage(onChange)}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white"
                    >
                      ✕
                    </button>
                  )}
                />
              </div>
            ) : imageSrc ? (
              <Image
                src={imageSrc}
                alt="profile"
                width={112}
                height={112}
                className="h-28 w-28 rounded-full object-cover border-4 border-amber-100"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-stone-200 flex items-center justify-center text-stone-500">
                No Image
              </div>
            )}
          </div>

          {/* IMAGE INPUT */}
          <div className="mb-5">
            <label className={labelClass}>Profile Image</label>

            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <input
                  key={fileInputKey}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0], onChange)
                  }
                />
              )}
            />

            {errors.image && <p className={errClass}>{errors.image.message}</p>}
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label className={labelClass}>Email</label>
            <input type="email" {...register("email")} className={fieldClass} />
            {errors.email && <p className={errClass}>{errors.email.message}</p>}
          </div>

          {/* NAME */}
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>First Name</label>
              <input {...register("firstName")} className={fieldClass} />
              {errors.firstName && (
                <p className={errClass}>{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Last Name</label>
              <input {...register("lastName")} className={fieldClass} />
              {errors.lastName && (
                <p className={errClass}>{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* USERNAME */}
          <div className="mb-5">
            <label className={labelClass}>Username</label>
            <input {...register("username")} className={fieldClass} />
            {errors.username && (
              <p className={errClass}>{errors.username.message}</p>
            )}
          </div>

          {/* PHONE */}
          <div className="mb-5">
            <label className={labelClass}>Phone Number</label>
            <input {...register("phoneNumber")} className={fieldClass} />
            {errors.phoneNumber && (
              <p className={errClass}>{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* GENDER */}
          <div className="mb-6">
            <label className={labelClass}>Gender</label>

            <select {...register("gender")} className={fieldClass}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {errors.gender && (
              <p className={errClass}>{errors.gender.message}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="h-12 w-full rounded-lg bg-amber-700 text-white font-semibold hover:bg-amber-800 disabled:opacity-50"
          >
            {isPending ? "Updating Profile..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
