import Link from "next/link";
import Image from "next/image";
import {
  getFeaturedProducts,
  getProductCategories,
  getProductImageUrl,
  Product,
} from "@/lib/api/product";

export default async function Home() {
  const [featuredRes, categoriesRes] = await Promise.all([
    getFeaturedProducts(8).catch(() => null),
    getProductCategories().catch(() => null),
  ]);

  const featured: Product[] = featuredRes?.data ?? [];
  const categories: string[] = categoriesRes?.data ?? [];

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-700">
              Handmade in Nepal
            </p>
            <h1 className="text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
              Authentic handicrafts, made by hand, made with heart.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-stone-600">
              Discover thangka paintings, statues, jewelry, and more —
              handcrafted by skilled Nepali artisans and shipped to your door.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="mb-6 text-2xl font-bold text-stone-900">
            Shop by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="rounded-full border border-stone-300 bg-white px-5 py-2 text-sm font-medium text-stone-700 transition hover:border-amber-700 hover:text-amber-700"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-stone-900">
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
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
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
      </section>
    </div>
  );
}
