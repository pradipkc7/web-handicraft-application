import Link from "next/link";
import { handleVerifyOrderPayment } from "@/lib/actions/order-action";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const pidx = query.pidx as string | undefined;

  let heading = "Order placed!";
  let message = "Thank you — pay in cash when your order is delivered.";
  let failed = false;
  let orderId = (query.orderId as string) || "";

  if (pidx) {
    const result = await handleVerifyOrderPayment(pidx);
    if (!result.success) {
      failed = true;
      heading = "Couldn't verify payment";
      message = result.message || "Please contact support with your payment reference.";
    } else if (result.paid) {
      heading = "Payment successful!";
      message = "Your Khalti payment was received and your order is confirmed.";
      orderId = result.order?._id || orderId;
    } else {
      failed = true;
      heading = "Payment not completed";
      message = `Payment status: ${result.status}. If money was deducted, it will be refunded automatically.`;
      orderId = result.order?._id || orderId;
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-6 py-24 text-center">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl ${
          failed ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
        }`}
      >
        {failed ? "✕" : "✓"}
      </div>
      <h1 className="mt-6 text-2xl font-bold text-stone-900">{heading}</h1>
      <p className="mt-2 text-sm text-stone-500">{message}</p>
      {orderId && (
        <p className="mt-4 font-mono text-xs text-stone-400">Order ID: {orderId}</p>
      )}
      <Link
        href="/products"
        className="mt-8 rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-800"
      >
        Continue shopping
      </Link>
    </div>
  );
}
