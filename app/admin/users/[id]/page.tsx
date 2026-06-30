import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { handleGetUserById } from "@/lib/actions/admin/user-action";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await handleGetUserById(id);
  if (!result.success || !result.data) notFound();

  const user = result.data;

  const infoRows: [string, string][] = [
    ["First name", user.firstName],
    ["Last name", user.lastName],
    ["Username", user.username],
    ["Email", user.email],
  ];

  const metaRows: [string, string][] = [
    ["Role", user.role],
    ["Gender", user.gender || "—"],
    ["Phone", user.phoneNumber || "—"],
    [
      "Created",
      user.createdAt ? new Date(user.createdAt).toLocaleString() : "—",
    ],
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
              Admin / Users
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
              User Profile
            </h1>
          </div>
          <Link
            href="/admin/users"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-4 text-xs font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900"
          >
            <svg
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </Link>
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-5">
            {user.imageUrl ? (
              <Image
                src={process.env.NEXT_PUBLIC_API_BASE_URL + user.imageUrl}
                alt="Profile"
                width={72}
                height={72}
                className="h-18 w-18 rounded-full object-cover ring-2 ring-gray-200"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-50 ring-2 ring-gray-200">
                <span className="text-lg font-semibold text-indigo-400">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                {user.firstName} {user.lastName}
              </h2>
              <p className="mt-0.5 truncate font-mono text-sm text-gray-400">
                {user.email}
              </p>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                    user.role === "admin"
                      ? "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200"
                      : "bg-gray-100 text-gray-500 ring-1 ring-gray-200"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>

            <Link
              href={`/admin/users/${user._id}/edit`}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-blue-50 px-4 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
            >
              <svg
                width="13"
                height="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </Link>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Personal Info
            </h3>
          </div>
          <dl className="divide-y divide-gray-100">
            {infoRows.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between px-6 py-3.5"
              >
                <dt className="text-xs font-medium text-gray-400">{label}</dt>
                <dd className="font-mono text-sm text-gray-800">
                  {value || "—"}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Account Details
            </h3>
          </div>
          <dl className="divide-y divide-gray-100">
            {metaRows.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between px-6 py-3.5"
              >
                <dt className="text-xs font-medium text-gray-400">{label}</dt>
                <dd className="text-sm text-gray-800">
                  {label === "Role" ? (
                    <span
                      className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                        value === "admin"
                          ? "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200"
                          : "bg-gray-100 text-gray-500 ring-1 ring-gray-200"
                      }`}
                    >
                      {value}
                    </span>
                  ) : (
                    value || "—"
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 flex justify-end pb-10">
          <Link
            href={`/admin/users/${user._id}/edit`}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-indigo-600 px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit user
          </Link>
        </div>
      </div>
    </div>
  );
}
