import ForgotPasswordFormZod from "../_components/ForgotPasswordFormZod";
import Image from "next/image";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-zinc-100">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-105 md:min-h-screen">
          <Image
            src="https://images.unsplash.com/photo-1522065893269-6fd20f6d7438?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Handicraft workspace"
            fill
            priority
            sizes="(min-width: 768px) 60vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />
          <div className="relative flex h-full items-end p-8 text-white lg:p-12">
            <div className="max-w-sm space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
                HandiCraft Studio
              </p>
              <h2 className="text-4xl font-semibold">Forgot your password?</h2>
              <p className="text-sm leading-6 text-zinc-200">
                No worries — we&apos;ll send a verification code to your
                email so you can get back into your workspace.
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center px-6 py-12">
          <div className="w-full max-w-xl rounded-4xl border border-zinc-200 bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="mb-10 space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-900">
                Reset Password
              </p>
              <h1 className="text-3xl font-semibold text-zinc-900">
                Recover access to your account
              </h1>
              <p className="text-sm text-zinc-600">
                Enter your email and we&apos;ll send you a code to reset your
                password.
              </p>
            </div>

            <ForgotPasswordFormZod />

            <div className="mt-8 text-center text-sm text-zinc-500">
              Remembered your password?{" "}
              <a
                href="/login"
                className="font-semibold text-amber-900 hover:underline"
              >
                Back to login
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
