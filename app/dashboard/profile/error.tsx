"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        {/* ICON */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 text-2xl">
          ⚠
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-stone-900">
          Something went wrong
        </h2>

        {/* MESSAGE */}
        <p className="mt-3 text-sm text-stone-500">
          {error.message ||
            "An unexpected error occurred while loading this page."}
        </p>

        {/* ACTION BUTTON */}
        <button
          onClick={reset}
          className="mt-6 w-full rounded-lg bg-amber-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
        >
          Try Again
        </button>

        {/* BACK HOME */}
        <Link
          href="/"
          className="mt-4 block text-sm text-stone-600 hover:text-amber-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
