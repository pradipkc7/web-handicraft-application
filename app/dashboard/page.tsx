import { getUserData } from "@/lib/cookies";

export default async function DashboardPage() {
  const user = await getUserData();

  const name =
    user?.firstName || user?.username || user?.name || user?.email || "User";

  return (
    <section className="min-h-screen bg-stone-50 px-4 py-12">
      <div className="mx-auto w-full max-w-6xl">
        {/* HEADER CARD */}
        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            Handicraft Dashboard
          </p>

          <h1 className="mt-3 text-3xl font-bold text-stone-900 md:text-4xl">
            Welcome back, {name}
          </h1>

          <p className="mt-3 text-sm text-stone-500">
            Manage your user profile, products, and account activity from here.
          </p>

          {/* QUICK STATS (optional visual blocks) */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs text-stone-500">Profile Status</p>
              <p className="mt-1 font-semibold text-stone-900">
                Active User
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs text-stone-500">Products</p>
              <p className="mt-1 font-semibold text-stone-900">Coming Soon</p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs text-stone-500">Orders</p>
              <p className="mt-1 font-semibold text-stone-900">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
