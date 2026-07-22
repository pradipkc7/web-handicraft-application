"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/products", label: "Products" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
      <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-6">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-indigo-600 text-[9px] font-bold text-white">
          A
        </div>
        <span className="text-sm font-semibold tracking-tight text-gray-900">
          Admin
        </span>
      </div>

      <nav
        className="flex flex-1 flex-col gap-1 p-4"
        aria-label="Admin sections"
      >
        {NAV.map(({ href, label, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 transition-colors hover:text-gray-700"
        >
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to app
        </Link>
      </div>
    </aside>
  );
}
