import Link from "next/link";
import Image from "next/image";
import { getUserData } from "@/lib/cookies";
import { getFeaturedProducts, getProductImageUrl, Product } from "@/lib/api/product";

export default async function DashboardPage() {
  const [user, featuredRes] = await Promise.all([
    getUserData(),
    getFeaturedProducts(4).catch(() => null),
  ]);

  const featured: Product[] = featuredRes?.data ?? [];

  const name =
    user?.firstName || user?.username || user?.name || user?.email || "User";

  return (
    <section className="min-h-screen bg-stone-50 px-4 py-12">
      <div className="mx-auto w-full max-w-6xl">
        {/* HEADER CARD */}
        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            Handicraft Dashboard
          </p>

          <h1 className="mt-3 text-3xl font-bold text-stone-900 md:text-4xl">
            Welcome back, {name}
          </h1>

          <p className="mt-3 text-sm text-stone-500">
            Manage your user profile, products, and account activity from here.
          </p>

          {/* QUICK STATS (optional visual blocks) */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs text-stone-500">Profile Status</p>
              <p className="mt-1 font-semibold text-stone-900">
                Active User
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs text-stone-500">Products</p>
              <p className="mt-1 font-semibold text-stone-900">
                {featured.length} Featured
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs text-stone-500">Orders</p>
              <p className="mt-1 font-semibold text-stone-900">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* FEATURED PRODUCTS */}
        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-900">
              Featured Products
            </h2>
            <Link
              href="/products"
              className="text-sm font-medium text-amber-700 hover:text-amber-900"
            >
              View all →
            </Link>
          </div>

          {featured.length === 0 ? (
            <p className="text-sm text-stone-500">
              No featured products yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {featured.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
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
                  <div className="p-3">
                    <p className="truncate text-sm font-medium text-stone-900">
                      {product.name}
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
