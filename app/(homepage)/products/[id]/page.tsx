import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, getProductImageUrl, Product } from "@/lib/api/product";
import AddToCartButton from "../_components/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: Product | undefined;
  try {
    const res = await getProductById(id);
    product = res?.data;
  } catch {
    product = undefined;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Images */}
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-stone-200 bg-stone-100">
            {product.images?.[0] && (
              <Image
                src={getProductImageUrl(product.images[0])}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-xl border border-stone-200 bg-stone-100"
                >
                  <Image
                    src={getProductImageUrl(img)}
                    alt={`${product.name} ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-stone-900">
            {product.name}
          </h1>

          {(product.rating ?? 0) > 0 && (
            <p className="mt-2 text-sm text-stone-500">
              ★ {product.rating?.toFixed(1)} ({product.totalReviews ?? 0}{" "}
              review{product.totalReviews === 1 ? "" : "s"})
            </p>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            {product.discountPrice ? (
              <>
                <span className="text-2xl font-bold text-amber-700">
                  Rs. {product.discountPrice}
                </span>
                <span className="text-base text-stone-400 line-through">
                  Rs. {product.price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-amber-700">
                Rs. {product.price}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm">
            {product.stock > 0 ? (
              <span className="text-emerald-600">
                In stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </p>

          <div className="mt-6 max-w-xs">
            <AddToCartButton product={product} />
          </div>

          <p className="mt-6 text-sm leading-6 text-stone-600">
            {product.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-200 pt-6 text-sm">
            {product.materials && (
              <div>
                <dt className="text-stone-400">Materials</dt>
                <dd className="mt-0.5 text-stone-900">{product.materials}</dd>
              </div>
            )}
            {product.size && (
              <div>
                <dt className="text-stone-400">Size</dt>
                <dd className="mt-0.5 text-stone-900">{product.size}</dd>
              </div>
            )}
            {product.artisanName && (
              <div>
                <dt className="text-stone-400">Artisan</dt>
                <dd className="mt-0.5 text-stone-900">
                  {product.artisanName}
                </dd>
              </div>
            )}
            {product.location && (
              <div>
                <dt className="text-stone-400">Origin</dt>
                <dd className="mt-0.5 text-stone-900">{product.location}</dd>
              </div>
            )}
          </dl>

          {product.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
