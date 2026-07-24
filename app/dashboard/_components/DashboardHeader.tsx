"use client";

import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContexts";
import { useLanguage } from "@/lib/contexts/LanguageContext";

export default function DashboardHeader() {
  const { logout } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 dark:border-stone-800 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
          {t("dashboard.title")}
        </h1>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          {t("dashboard.subtitle")}
        </p>
      </div>

      <nav
        aria-label="Dashboard Navigation"
        className="flex flex-wrap items-center gap-5"
      >
        <Link
          href="/dashboard"
          className="text-sm font-medium text-stone-600 hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-500"
        >
          {t("dashboard.overview")}
        </Link>

        <Link
          href="/dashboard/products"
          className="text-sm font-medium text-stone-600 hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-500"
        >
          {t("dashboard.products")}
        </Link>

        <Link
          href="/dashboard/profile"
          className="text-sm font-medium text-stone-600 hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-500"
        >
          {t("dashboard.profile")}
        </Link>

        <button
          onClick={async () => {
            await logout();
          }}
          className="rounded-md border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
        >
          {t("dashboard.logout")}
        </button>
      </nav>
    </div>
  );
}
