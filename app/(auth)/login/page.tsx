import LoginFormZod from "../_components/LoginFormZod";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-zinc-100">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[420px] md:min-h-screen">
          <img
            src="/assets/images/login.png"
            alt="Handicraft workspace"
            className="absolute inset-0 h-full w-full object-cover"
          ></img>

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
          <div className="w-full max-w-xl rounded-[32px] border border-zinc-200 bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
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

            <LoginFormZod />

            <div className="mt-8 text-center text-sm text-zinc-500">
              New to the craft?{" "}
              <a
                href="/signup"
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
