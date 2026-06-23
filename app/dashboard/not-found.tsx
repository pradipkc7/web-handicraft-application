import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="text-center max-w-md">
        {/* ICON */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-3xl">
          404
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-stone-900">Page Not Found</h1>

        {/* MESSAGE */}
        <p className="mt-3 text-sm text-stone-500">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* ACTION BUTTON */}
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-amber-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
