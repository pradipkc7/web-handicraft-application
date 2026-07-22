"use client";

import { useCart } from "@/lib/contexts/CartContext";
import { Product } from "@/lib/api/product";

export default function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const outOfStock = product.stock <= 0;

  return (
    <button
      type="button"
      disabled={outOfStock}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
          productId: product._id,
          name: product.name,
          price: product.discountPrice ?? product.price,
          image: product.images?.[0],
          stock: product.stock,
        });
      }}
      className={
        className ??
        "h-11 w-full rounded-lg bg-amber-700 px-4 text-sm font-medium text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-stone-300"
      }
    >
      {outOfStock ? "Out of stock" : "Add to Cart"}
    </button>
  );
}
