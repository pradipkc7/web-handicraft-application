import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "@/lib/contexts/AuthContexts";

export const metadata: Metadata = {
  title: "Nepal Handicraft",
  description: "Authentic handmade crafts from Nepal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        {/* ✅ FIX: AuthProvider added */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
