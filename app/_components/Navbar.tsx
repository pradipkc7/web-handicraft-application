"use client";

import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContexts";
import Logo from "./Logo";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700"
          >
            Shop
          </Link>

          <Link
            href="/categories"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700"
          >
            Categories
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700"
          >
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-stone-700 hover:text-amber-700"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-amber-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="hidden text-sm text-stone-700 md:block">
                Welcome, {user.firstName}
              </span>

              <Link
                href="/dashboard"
                className="rounded-md border border-stone-300 px-4 py-2 text-sm hover:bg-stone-100"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
