import Link from "next/link";
import UpdatePasswordForm from "../_components/PasswordResetForm";

export default function Page() {
  return (
    <div className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-stone-900">
            Account Security
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Keep your handicraft account safe by updating your password
          </p>
        </div>

        {/* FORM CARD */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <UpdatePasswordForm />
        </div>

        {/* BACK LINK */}
        <div className="mt-6 text-center">
          <Link
            href="/dashboard/profile"
            className="text-sm font-medium text-stone-600 hover:text-amber-700 transition"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
