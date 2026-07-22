"use client";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Modal from "../../_components/Modal";
import { handleDeleteProduct } from "@/lib/actions/admin/product-action";

const getImageUrl = (path: string) =>
  (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088") + path;

const StatCard = ({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub: string;
}) => (
  <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
    <p className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-gray-400">
      {label}
    </p>
    <p className="text-[22px] font-semibold leading-none tracking-tight text-gray-900">
      {value}
    </p>
    <p className="mt-1 text-[11px] text-gray-400">{sub}</p>
  </div>
);

export default function ProductTable({
  data,
  pagination,
  search,
}: {
  data: any[];
  pagination: any;
  search: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [target, setTarget] = useState<any | null>(null);

  const page = pagination?.page ?? 1;
  const limit = pagination?.limit ?? 10;
  const totalPages = pagination?.totalPages ?? 1;
  const total = pagination?.total ?? 0;

  const setQuery = (next: Record<string, string | number>) => {
    const q = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([k, v]) => q.set(k, String(v)));
    router.push(`/admin/products?${q.toString()}`);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("search") as string;
    setQuery({ search: value ?? "", page: 1 });
  };

  const onDelete = () => {
    if (!target) return;
    startTransition(async () => {
      const result = await handleDeleteProduct(target._id);
      if (result.success) {
        toast.success("Product deleted");
        setTarget(null);
      } else {
        toast.error(result.message || "Failed to delete product");
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1100px] bg-white min-h-screen p-6">
      <div className="mb-7 grid grid-cols-2 gap-3">
        <StatCard label="Total products" value={total} sub="items listed" />
        <StatCard
          label="Current page"
          value={`${page} / ${totalPages}`}
          sub="pages total"
        />
      </div>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            Products
          </h2>
          <p className="mt-0.5 text-xs text-gray-400">{total} items listed</p>
        </div>
        <Link
          href="/admin/products/create"
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-indigo-600 px-4 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New product
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={onSearch} className="flex w-full max-w-sm gap-2">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              name="search"
              defaultValue={search}
              placeholder="Search products…"
              className="h-9 w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button className="h-9 rounded-md border border-gray-200 bg-white px-4 text-xs font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-900">
            Search
          </button>
        </form>

        <label className="flex items-center gap-2 text-xs text-gray-500">
          Rows
          <select
            value={limit}
            onChange={(e) => setQuery({ limit: e.target.value, page: 1 })}
            className="h-9 rounded-md border border-gray-200 bg-white px-2 text-sm text-gray-700 outline-none transition-colors focus:border-indigo-500"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-[10px] font-medium uppercase tracking-widest text-gray-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Artisan</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.length ? (
              data.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      {p.images?.[0] ? (
                        <img
                          src={getImageUrl(p.images[0])}
                          alt={p.name}
                          className="h-9 w-9 rounded-md object-cover ring-1 ring-gray-200"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-[9px] text-gray-400 ring-1 ring-gray-200">
                          No img
                        </div>
                      )}
                      <span className="font-medium text-gray-900">
                        {p.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">
                    {p.category}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-gray-700">
                    Rs {p.price}
                  </td>
                  <td className="px-4 py-3.5 text-xs">
                    <span
                      className={
                        "inline-flex items-center rounded px-2 py-0.5 font-medium " +
                        (p.stock > 10
                          ? "bg-emerald-50 text-emerald-600"
                          : p.stock > 0
                            ? "bg-amber-50 text-amber-600"
                            : "bg-red-50 text-red-500")
                      }
                    >
                      {p.stock ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">
                    {p.artisanName || "—"}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <Link
                        href={`/admin/products/${p._id}`}
                        className="inline-flex h-7 items-center rounded px-2.5 text-xs font-medium bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/products/${p._id}/edit`}
                        className="inline-flex h-7 items-center rounded px-2.5 text-xs font-medium bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setTarget(p)}
                        className="inline-flex h-7 items-center rounded px-2.5 text-xs font-medium bg-red-50 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-14 text-center text-sm text-gray-400"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>
          Page {page} of {totalPages} · {total} products
        </span>
        <div className="flex gap-1.5">
          <button
            disabled={page <= 1}
            onClick={() => setQuery({ page: page - 1 })}
            className="inline-flex h-8 items-center gap-1 rounded-md border border-gray-200 bg-white px-3 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-30"
          >
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setQuery({ page: page + 1 })}
            className="inline-flex h-8 items-center gap-1 rounded-md border border-gray-200 bg-white px-3 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-30"
          >
            Next
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <Modal
        open={!!target}
        onClose={() => setTarget(null)}
        title="Delete product"
      >
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-500">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </div>
        <p className="mb-6 text-sm leading-relaxed text-gray-500">
          Delete <span className="font-medium text-gray-900">{target?.name}</span>?
          This action is permanent and cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setTarget(null)}
            className="h-9 rounded-md border border-gray-200 px-4 text-xs font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={isPending}
            className="h-9 rounded-md bg-red-600 px-4 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Deleting…" : "Delete product"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
