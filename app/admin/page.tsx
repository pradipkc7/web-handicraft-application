import Link from "next/link";
import Image from "next/image";
import { handleGetAllProducts } from "@/lib/actions/admin/product-action";
import { handleGetAllUsers } from "@/lib/actions/admin/user-action";
import { getProductImageUrl, Product } from "@/lib/api/product";

const CARDS = [
  {
    href: "/admin/users",
    label: "Users",
    desc: "Manage accounts, roles and access.",
  },
  {
    href: "/admin/products",
    label: "Products",
    desc: "Add, edit and publish handicraft listings.",
  },
];

export default async function Page() {
  const [productsResult, usersResult] = await Promise.all([
    handleGetAllProducts({ page: 1, limit: 5 }),
    handleGetAllUsers({ page: 1, limit: 1 }),
  ]);

  const recentProducts = productsResult.success ? productsResult.data : [];
  const totalProducts = productsResult.success
    ? productsResult.pagination?.total ?? recentProducts.length
    : 0;
  const totalUsers = usersResult.success
    ? usersResult.pagination?.total ?? 0
    : 0;

  return (
    <section className="mx-auto w-full max-w-[1100px]">
      <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted text-black">
        Admin
      </p>
      <h2 className="mb-8 text-3xl font-bold text-black">Overview</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-lg border border-hairline bg-surface-card p-6 transition-colors border-black"
          >
            <h3 className="mb-1 text-lg font-bold text-black">{label}</h3>
            <p className="text-sm text-muted text-black">{desc}</p>
            <span className="mt-4 inline-block text-xs font-medium tracking-[0.5px] text-body-strong opacity-0 transition-opacity opacity-100 text-black">
              Manage →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-hairline border-black p-6">
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-black">
            Total Products
          </p>
          <p className="mt-1 text-3xl font-bold text-black">{totalProducts}</p>
        </div>
        <div className="rounded-lg border border-hairline border-black p-6">
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-black">
            Total Users
          </p>
          <p className="mt-1 text-3xl font-bold text-black">{totalUsers}</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-black">Recent Products</h3>
          <Link
            href="/admin/products"
            className="text-xs font-medium text-black underline"
          >
            View all →
          </Link>
        </div>

        {recentProducts.length === 0 ? (
          <p className="rounded-lg border border-hairline border-black p-6 text-sm text-black">
            No products yet.{" "}
            <Link href="/admin/products/create" className="underline">
              Add your first product
            </Link>
            .
          </p>
        ) : (
          <div className="divide-y divide-black/10 rounded-lg border border-hairline border-black">
            {recentProducts.map((product: Product) => (
              <Link
                key={product._id}
                href={`/admin/products/${product._id}`}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-black/5"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-black/5">
                  {product.images?.[0] && (
                    <Image
                      src={getProductImageUrl(product.images[0])}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-black">
                    {product.name}
                  </p>
                  <p className="text-xs text-black/60">{product.category}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-black">
                  Rs. {product.discountPrice ?? product.price}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
