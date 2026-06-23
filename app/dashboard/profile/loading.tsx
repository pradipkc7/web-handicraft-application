export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        {/* SPINNER */}
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-stone-300 border-t-amber-700"></div>

        {/* TEXT */}
        <p className="text-sm font-medium text-stone-600">Loading...</p>
      </div>
    </div>
  );
}
