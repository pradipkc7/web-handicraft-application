"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { productSchema, ProductFormData, slugify } from "./schema";
import { handleCreateProduct } from "@/lib/actions/admin/product-action";
import { uploadFile } from "@/lib/api/admin/product";
import ImagePicker, { PickedImage } from "./ImagePicker";

const fieldClass =
  "h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";
const areaClass =
  "w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";
const labelClass = "mb-1.5 block text-xs font-medium text-gray-500";
const errClass = "mt-1.5 block text-xs text-red-500";

export default function ProductForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [images, setImages] = useState<PickedImage[]>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormData) => {
    setError("");
    startTransition(async () => {
      try {
        const uploadedPaths = await Promise.all(
          images.map(async (img) => {
            if (img.path) return img.path;
            const result = await uploadFile(img.file as File);
            return result.data.path as string;
          }),
        );

        const result = await handleCreateProduct({
          name: data.name,
          slug: slugify(data.name),
          description: data.description,
          category: data.category,
          price: data.price,
          stock: data.stock,
          artisanName: data.artisanName,
          images: uploadedPaths,
        });
        if (!result.success) throw new Error(result.message);
        toast.success("Product created successfully");
        router.push("/admin/products");
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
              Admin / Products
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
              Create Product
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
              Images
            </h2>
            <ImagePicker images={images} onChange={setImages} />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-semibold text-gray-700">
              Product Info
            </h2>

            <div className="mb-4">
              <label className={labelClass}>Product name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Handwoven bamboo basket"
                className={fieldClass}
              />
              {errors.name && (
                <span className={errClass}>{errors.name.message}</span>
              )}
            </div>

            <div className="mb-4">
              <label className={labelClass}>Description</label>
              <textarea
                rows={4}
                {...register("description")}
                placeholder="Tell customers about this product…"
                className={areaClass}
              />
              {errors.description && (
                <span className={errClass}>{errors.description.message}</span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Category</label>
                <input
                  type="text"
                  {...register("category")}
                  placeholder="Baskets"
                  className={fieldClass}
                />
                {errors.category && (
                  <span className={errClass}>{errors.category.message}</span>
                )}
              </div>
              <div>
                <label className={labelClass}>Price</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price")}
                  placeholder="0.00"
                  className={fieldClass}
                />
                {errors.price && (
                  <span className={errClass}>{errors.price.message}</span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className={labelClass}>Stock</label>
              <input
                type="number"
                step="1"
                {...register("stock")}
                placeholder="0"
                className={fieldClass}
              />
              {errors.stock && (
                <span className={errClass}>{errors.stock.message}</span>
              )}
            </div>

            <div className="mt-4">
              <label className={labelClass}>Artisan name</label>
              <input
                type="text"
                {...register("artisanName")}
                placeholder="Sita Gurung"
                className={fieldClass}
              />
              {errors.artisanName && (
                <span className={errClass}>{errors.artisanName.message}</span>
              )}
            </div>
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
                "Create product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
