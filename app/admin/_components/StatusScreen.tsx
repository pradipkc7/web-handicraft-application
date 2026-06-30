export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-gray-200 border-t-indigo-600 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export default function StatusScreen({
  code,
  title,
  description,
  children,
}: {
  code?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-6 text-center">
      <div className="mb-6 h-1 w-12 rounded-full bg-indigo-600" />
      {code && (
        <p className="mb-2 font-mono text-5xl font-bold tracking-tight text-white-900">
          {code}
        </p>
      )}
      <h2 className="text-xl font-semibold text-white-900">{title}</h2>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-gray-400">{description}</p>
      )}
      {children && (
        <div className="mt-6 flex items-center gap-3">{children}</div>
      )}
    </div>
  );
}
