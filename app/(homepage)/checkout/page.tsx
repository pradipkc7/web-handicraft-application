"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCart } from "@/lib/contexts/CartContext";
import { handlePlaceOrder } from "@/lib/actions/order-action";

const fieldClass =
  "h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-amber-700 focus:ring-1 focus:ring-amber-700";
const labelClass = "mb-1.5 block text-xs font-medium text-stone-500";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, removeItem } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "khalti">("cod");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    startTransition(async () => {
      const result = await handlePlaceOrder({
        items,
        shippingLocation: `${address}, ${city}`,
        paymentMethod,
      });

      if (!result.success) {
        toast.error(result.message || "Failed to place order");
        result.unavailableProductIds?.forEach((id: string) => removeItem(id));
        return;
      }

      if (paymentMethod === "khalti" && result.paymentUrl) {
        clearCart();
        window.location.href = result.paymentUrl;
        return;
      }

      clearCart();
      toast.success("Order placed! Pay cash on delivery.");
      router.push(`/checkout/success?orderId=${result.order?._id}`);
    });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-stone-500">Add products before checking out.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900">Checkout</h1>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Address</label>
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, ward, landmark"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Kathmandu"
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass}>Payment method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                  paymentMethod === "cod"
                    ? "border-amber-700 bg-amber-50 text-amber-800"
                    : "border-stone-300 text-stone-600 hover:border-stone-400"
                }`}
              >
                <p className="font-medium">Cash on Delivery</p>
                <p className="mt-0.5 text-xs text-stone-500">Pay when it arrives</p>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("khalti")}
                className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                  paymentMethod === "khalti"
                    ? "border-amber-700 bg-amber-50 text-amber-800"
                    : "border-stone-300 text-stone-600 hover:border-stone-400"
                }`}
              >
                <p className="font-medium">Pay with Khalti</p>
                <p className="mt-0.5 text-xs text-stone-500">Online payment</p>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="h-11 w-full rounded-lg bg-amber-700 text-sm font-medium text-white transition hover:bg-amber-800 disabled:opacity-50"
          >
            {isPending
              ? "Placing order…"
              : paymentMethod === "khalti"
                ? "Continue to Khalti"
                : "Place order"}
          </button>
        </form>

        <div className="h-fit rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-stone-900">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-stone-600">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-stone-900">
                  Rs. {item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 text-base font-bold text-stone-900">
            <span>Total</span>
            <span>Rs. {totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
