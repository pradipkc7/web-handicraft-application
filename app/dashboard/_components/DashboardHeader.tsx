"use client";

import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContexts";

export default function DashboardHeader() {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">User Dashboard</h1>
        <p className="mt-1 text-sm text-stone-500">
          Manage your handicraft products and orders
        </p>
      </div>

      <nav
        aria-label="Dashboard Navigation"
        className="flex flex-wrap items-center gap-5"
      >
        <Link
          href="/dashboard"
          className="text-sm font-medium text-stone-600 hover:text-amber-700"
        >
          Overview
        </Link>

        <Link
          href="/dashboard/products"
          className="text-sm font-medium text-stone-600 hover:text-amber-700"
        >
          Products
        </Link>

        <Link
          href="/dashboard/orders"
          className="text-sm font-medium text-stone-600 hover:text-amber-700"
        >
          Orders
        </Link>

        <Link
          href="/dashboard/profile"
          className="text-sm font-medium text-stone-600 hover:text-amber-700"
        >
          Profile
        </Link>

        <button
          onClick={async () => {
            await logout();
          }}
          className="rounded-md border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
