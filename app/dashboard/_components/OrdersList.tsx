"use client";

import { useEffect, useState, useCallback } from "react";

import { handleGetMyOrders } from "@/lib/actions/order-action";
import { Order } from "@/lib/api/order";
import { useLanguage } from "@/lib/contexts/LanguageContext";

export default function OrdersList() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setError("");

    handleGetMyOrders()
      .then((result) => {
        if (!result.success) {
          setError(result.message || t("orders.error"));
          return;
        }
        setOrders(result.orders || []);
      })
      .catch(() => setError(t("orders.error")))
      .finally(() => setLoading(false));
  }, [t]);

  useEffect(() => {
    const timer = window.setTimeout(load, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            {t("orders.title")}
          </h1>

          <button
            type="button"
            onClick={load}
            className="text-sm font-medium text-amber-700 hover:text-amber-900 dark:text-amber-500 dark:hover:text-amber-400"
          >
            {t("orders.refresh")}
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-stone-500 dark:text-stone-400">…</p>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t("orders.empty")}
          </p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order._id}
                className="rounded-xl border border-stone-200 p-4 dark:border-stone-800"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    #{order._id.slice(-8)}
                  </span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-400">
                    {order.status || order.paymentStatus}
                  </span>
                </div>

                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                  {t("orders.placedOn")}{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                {typeof order.totalAmount === "number" && (
                  <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">
                    {t("orders.total")}: Rs. {order.totalAmount}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
