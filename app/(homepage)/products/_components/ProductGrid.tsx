"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Product, getProductImageUrl } from "@/lib/api/product";
import AddToCartButton from "./AddToCartButton";

interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export default function ProductGrid({
  data,
  pagination,
  search,
  category,
  categories,
}: {
  data: Product[];
  pagination: Pagination;
  search: string;
  category: string;
  categories: string[];
}) {
  const router = useRouter();
  const params = useSearchParams();

  const page = pagination?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const total = pagination?.total ?? 0;

  const setQuery = (next: Record<string, string | number>) => {
    const q = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([k, v]) => q.set(k, String(v)));
    router.push(`/products?${q.toString()}`);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("search") as string;
    setQuery({ search: value ?? "", page: 1 });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">All Products</h1>
        <p className="mt-1 text-sm text-stone-500">
          {total} product{total === 1 ? "" : "s"} found
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={onSearch} className="flex w-full max-w-sm gap-2">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search products…"
            className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
          />
          <button className="h-10 rounded-lg border border-stone-300 bg-white px-4 text-sm font-medium text-stone-600 transition hover:border-stone-400 hover:text-stone-900">
            Search
          </button>
        </form>

        {categories.length > 0 && (
          <select
            value={category}
            onChange={(e) => setQuery({ category: e.target.value, page: 1 })}
            className="h-10 rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-700 outline-none transition focus:border-amber-700"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </div>

      {data.length === 0 ? (
        <p className="py-20 text-center text-sm text-stone-400">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {data.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-square w-full bg-stone-100">
                {product.images?.[0] && (
                  <Image
                    src={getProductImageUrl(product.images[0])}
                    alt={product.name}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="truncate text-sm font-medium text-stone-900">
                  {product.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-stone-500">
                  {product.category}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  {product.discountPrice ? (
                    <>
                      <span className="text-sm font-semibold text-amber-700">
                        Rs. {product.discountPrice}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        Rs. {product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-amber-700">
                      Rs. {product.price}
                    </span>
                  )}
                </div>
                <AddToCartButton
                  product={product}
                  className="mt-3 h-9 w-full rounded-lg bg-amber-700 text-xs font-medium text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-stone-300"
                />
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-between text-xs text-stone-500">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-1.5">
            <button
              disabled={page <= 1}
              onClick={() => setQuery({ page: page - 1 })}
              className="inline-flex h-9 items-center rounded-lg border border-stone-300 bg-white px-3 text-stone-600 transition hover:border-stone-400 hover:text-stone-900 disabled:pointer-events-none disabled:opacity-30"
            >
              Prev
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setQuery({ page: page + 1 })}
              className="inline-flex h-9 items-center rounded-lg border border-stone-300 bg-white px-3 text-stone-600 transition hover:border-stone-400 hover:text-stone-900 disabled:pointer-events-none disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
