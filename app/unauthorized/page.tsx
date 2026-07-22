import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-3xl">
          403
        </div>

        <h1 className="text-3xl font-bold text-stone-900">Access Denied</h1>

        <p className="mt-3 text-sm text-stone-500">
          You don&apos;t have permission to view this page.
        </p>

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
