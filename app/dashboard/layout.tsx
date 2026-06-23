import DashboardHeader from "./_components/DashboardHeader";

export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-stone-50 text-stone-900">
      {/* WRAPPER */}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}
        <DashboardHeader />

        {/* CONTENT */}
        <main className="flex-1">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            {children}
          </div>
        </main>

        {/* FOOTER */}
        <footer className="text-center text-xs text-stone-400">
          © {new Date().getFullYear()} Nepal Handicraft. All rights reserved.
        </footer>
      </div>
    </section>
  );
}
