"use client";

import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContexts";
import { useCart } from "@/lib/contexts/CartContext";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import Logo from "./Logo";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-500"
          >
            {t("nav.home")}
          </Link>

          <Link
            href="/products"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-500"
          >
            {t("nav.shop")}
          </Link>

          <Link
            href="/categories"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-500"
          >
            {t("nav.categories")}
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-500"
          >
            {t("nav.about")}
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-500"
          >
            {t("nav.contact")}
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-md text-stone-700 transition hover:bg-stone-100 hover:text-amber-700 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-amber-500"
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.694 2.591-7.234.16-.67-.394-1.298-1.081-1.298H5.106M7.5 14.25L5.106 5.272M6.75 18a.75.75 0 100 1.5.75.75 0 000-1.5zM17.25 18a.75.75 0 100 1.5.75.75 0 000-1.5z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-700 px-1 text-[10px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {!user ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-stone-700 hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-500"
              >
                {t("nav.login")}
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-amber-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
              >
                {t("nav.register")}
              </Link>
            </>
          ) : (
            <>
              <span className="hidden text-sm text-stone-700 dark:text-stone-300 md:block">
                {t("nav.welcome")}, {user.firstName}
              </span>

              <Link
                href="/dashboard"
                className="rounded-md border border-stone-300 px-4 py-2 text-sm hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                {t("nav.dashboard")}
              </Link>

              <button
                onClick={logout}
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                {t("nav.logout")}
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
