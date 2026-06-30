"use client";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContexts";

const TITLES: Record<string, string> = {
  admin: "Overview",
  users: "Users",
  blogs: "Blogs",
  create: "Create",
  edit: "Edit",
};

export default function Header() {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] ?? "admin";
  const title = TITLES[last] ?? last;

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
          {segments.join(" / ")}
        </p>
        <h1 className="text-lg font-semibold leading-none text-gray-900">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden text-sm text-gray-400 sm:inline">
          {user?.username || user?.email || "Unknown user"}
        </span>
        <button
          onClick={logout}
          className="inline-flex h-8 items-center rounded-md bg-red-700 px-3 text-xs font-medium text-white transition-colors hover:bg-red-700 hover:text-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
