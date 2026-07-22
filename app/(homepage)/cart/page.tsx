"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/contexts/CartContext";
import { getProductImageUrl } from "@/lib/api/product";

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-stone-500">
          Browse our handicrafts and add something you love.
        </p>
        <Link
          href="/products"
          className="mt-6 rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-800"
        >
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900">Your Cart</h1>
      <p className="mt-1 text-sm text-stone-500">
        {totalItems} item{totalItems === 1 ? "" : "s"} in cart
      </p>

      <div className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 py-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
              {item.image && (
                <Image
                  src={getProductImageUrl(item.image)}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-stone-900">
                {item.name}
              </p>
              <p className="mt-0.5 text-sm text-amber-700">Rs. {item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="h-8 w-8 rounded-lg border border-stone-300 text-stone-600 transition hover:border-stone-400 disabled:pointer-events-none disabled:opacity-30"
              >
                −
              </button>
              <span className="w-6 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                className="h-8 w-8 rounded-lg border border-stone-300 text-stone-600 transition hover:border-stone-400 disabled:pointer-events-none disabled:opacity-30"
              >
                +
              </button>
            </div>

            <p className="w-20 shrink-0 text-right text-sm font-semibold text-stone-900">
              Rs. {item.price * item.quantity}
            </p>

            <button
              onClick={() => removeItem(item.productId)}
              className="shrink-0 text-xs font-medium text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="flex items-center gap-3 text-lg">
          <span className="text-stone-500">Subtotal:</span>
          <span className="font-bold text-stone-900">Rs. {totalPrice}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-600 transition hover:border-stone-400 hover:text-stone-900"
          >
            Clear cart
          </button>
          <Link
            href="/checkout"
            className="rounded-lg bg-amber-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-amber-800"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
