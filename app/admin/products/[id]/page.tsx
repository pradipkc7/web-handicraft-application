import Link from "next/link";
import { notFound } from "next/navigation";
import { handleGetProductById } from "@/lib/actions/admin/product-action";

const getImageUrl = (path: string) =>
  (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088") + path;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await handleGetProductById(id);
  if (!result.success || !result.data) notFound();

  const product = result.data;

  const infoRows: [string, string][] = [
    ["Category", product.category],
    ["Price", `Rs ${product.price}`],
    ["Stock", `${product.stock ?? 0}`],
    ["Artisan", product.artisanName || "—"],
    [
      "Created",
      product.createdAt ? new Date(product.createdAt).toLocaleString() : "—",
    ],
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
              Admin / Products
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
              Product Details
            </h1>
          </div>
          <Link
            href="/admin/products"
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
          </Link>
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-5">
            {product.images?.[0] ? (
              <img
                src={getImageUrl(product.images[0])}
                alt={product.name}
                className="h-18 w-18 rounded-lg object-cover ring-2 ring-gray-200"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-indigo-50 ring-2 ring-gray-200">
                <span className="text-xs font-medium text-indigo-400">
                  No img
                </span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                {product.name}
              </h2>
              <p className="mt-0.5 truncate text-sm text-gray-400">
                {product.description}
              </p>
            </div>

            <Link
              href={`/admin/products/${product._id}/edit`}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-blue-50 px-4 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
            >
              <svg
                width="13"
                height="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </Link>
          </div>

          {product.images?.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.images.slice(1).map((img: string, i: number) => (
                <img
                  key={i}
                  src={getImageUrl(img)}
                  alt={`${product.name} ${i + 2}`}
                  className="h-14 w-14 rounded-md object-cover ring-1 ring-gray-200"
                />
              ))}
            </div>
          )}
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Product Info
            </h3>
          </div>
          <dl className="divide-y divide-gray-100">
            {infoRows.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between px-6 py-3.5"
              >
                <dt className="text-xs font-medium text-gray-400">{label}</dt>
                <dd className="font-mono text-sm text-gray-800">
                  {value || "—"}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 flex justify-end pb-10">
          <Link
            href={`/admin/products/${product._id}/edit`}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-indigo-600 px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit product
          </Link>
        </div>
      </div>
    </div>
  );
}
