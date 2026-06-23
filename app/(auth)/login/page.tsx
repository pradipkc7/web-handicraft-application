import LoginFormZod from "../_components/LoginFormZod";
import { handleLoginUser } from "@/lib/actions/auth-action";
import Image from "next/image";

export default function LoginPage() {
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
          {/* <img
            src="/assets/images/login.png"
            alt="Handicraft workspace"
            className="absolute inset-0 h-full w-full object-cover"
          ></img> */}

          <div className="absolute inset-0 bg-black/40" />
          <div className="relative flex h-full items-end p-8 text-white lg:p-12">
            <div className="max-w-sm space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
                HandiCraft Studio
              </p>
              <h2 className="text-4xl font-semibold">Create with passion.</h2>
              <p className="text-sm leading-6 text-zinc-200">
                Build your craft identity and bring your handmade projects to
                life.
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center px-6 py-12">
          <div className="w-full max-w-xl rounded-4xl border border-zinc-200 bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="mb-10 space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-900">
                Welcome Back
              </p>
              <h1 className="text-3xl font-semibold text-zinc-900">
                Access your handcrafted workspace
              </h1>
              <p className="text-sm text-zinc-600">
                Enter your credentials to continue your craft journey.
              </p>
            </div>

            <LoginFormZod action={handleLoginUser} />

            <div className="mt-8 text-center text-sm text-zinc-500">
              New to the craft?{" "}
              <a
                href="/register"
                className="font-semibold text-amber-900 hover:underline"
              >
                Join the HandiCraft →
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
