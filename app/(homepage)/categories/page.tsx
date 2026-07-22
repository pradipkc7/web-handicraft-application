import Link from "next/link";
import Image from "next/image";
import {
  getProducts,
  getProductCategories,
  getProductImageUrl,
} from "@/lib/api/product";

export default async function CategoriesPage() {
  const categoriesRes = await getProductCategories().catch(() => null);
  const categories: string[] = categoriesRes?.data ?? [];

  const cards = await Promise.all(
    categories.map(async (category) => {
      const res = await getProducts({ category, limit: 1 }).catch(() => null);
      return {
        category,
        total: res?.meta?.total ?? 0,
        image: res?.data?.[0]?.images?.[0] as string | undefined,
      };
    }),
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-700">
          Browse
        </p>
        <h1 className="text-4xl font-bold text-stone-900">
          Shop by Category
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-600">
          Explore handmade crafts grouped by what they&apos;re made of and how
          they&apos;re used.
        </p>
      </div>

      {cards.length === 0 ? (
        <p className="py-20 text-center text-sm text-stone-400">
          No categories found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {cards.map(({ category, total, image }) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-square w-full bg-stone-100">
                {image && (
                  <Image
                    src={getProductImageUrl(image)}
                    alt={category}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="truncate text-sm font-semibold capitalize text-stone-900">
                  {category}
                </p>
                <p className="mt-0.5 text-xs text-stone-500">
                  {total} product{total === 1 ? "" : "s"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
