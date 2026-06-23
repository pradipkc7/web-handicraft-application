import UpdateForm from "../_components/UpdateForm";
import { handleUserDetails } from "@/lib/actions/auth-action";

export default async function Page() {
  const userDetails = await handleUserDetails();

  if (!userDetails.success) {
    throw new Error(userDetails.message || "Failed to fetch user details");
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-stone-900">User Account</h1>

          <p className="mt-2 text-sm text-stone-500">
            Manage your profile and personalize your handicraft experience
          </p>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <UpdateForm user={userDetails.data} />
        </div>

        {/* FOOT NOTE */}
        <p className="mt-6 text-center text-xs text-stone-400">
          Your information is securely stored and used only for your account.
        </p>
      </div>
    </div>
  );
}
