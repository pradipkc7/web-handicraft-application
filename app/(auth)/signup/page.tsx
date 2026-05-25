import SignupFormZod from "../_components/SignupFormZod";
import Image from "next/image";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-zinc-100">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[1.25fr_0.75fr]">
        <div className="relative min-h-[420px] md:min-h-screen">
          {/* <img
            // src="https://2025.vietnam.travel/wp-content/uploads/2025/05/16.5.thailan1.jpg"
            alt="Handicraft workspace"
            className="absolute inset-0 h-full w-full object-cover"
          /> */}

          <img
            src="/assets/images/signup.png"
            alt="Handicraft workspace"
            className="absolute inset-0 h-full w-full object-cover"
          ></img>

          <div className="absolute inset-0 bg-black/35" />
          <div className="relative flex h-full items-end p-8 text-white lg:p-12">
            <div className="max-w-xl space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
                HandiCraft Studio
              </p>
              <h2 className="text-4xl font-semibold leading-tight">
                The journey to your perfect fit starts here.
              </h2>
              <p className="max-w-xl text-sm leading-7 text-zinc-200">
                Join a community of artisans dedicated to the art of slow
                fashion and precision tailoring.
              </p>
              <blockquote className="border-l-4 border-amber-300 pl-5 text-sm italic text-zinc-100">
                “Crafting is more than a hobby; it's a conversation with the
                material.”
              </blockquote>
            </div>
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center px-6 py-12">
          <div className="w-full max-w-xl rounded-[32px] border border-zinc-200 bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="mb-10 space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-900">
                Create Your Account
              </p>
              <h1 className="text-3xl font-semibold text-zinc-900">
                Begin your bespoke journey with HandiCraft.
              </h1>
              <p className="text-sm text-zinc-600">
                Start your account and craft a tailored experience for your
                handmade brand.
              </p>
            </div>

            <SignupFormZod />

            <div className="mt-8 text-center text-sm text-zinc-500">
              Already a member?{" "}
              <a
                href="/login"
                className="font-semibold text-amber-900 hover:underline"
              >
                Login
              </a>
            </div>

            <p className="mt-6 text-center text-[11px] uppercase tracking-[0.35em] text-zinc-400">
              By joining, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
