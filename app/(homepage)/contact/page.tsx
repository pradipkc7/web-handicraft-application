import ContactForm from "./_components/ContactForm";

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-700">
            Get in Touch
          </p>
          <h1 className="text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
            We&apos;d love to hear from you
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-stone-600">
            Questions about an order, a product, or working with us? Reach out
            and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              Contact information
            </h2>
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  📍
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    Location
                  </p>
                  <p className="text-sm text-stone-600">Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  ✉️
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">Email</p>
                  <p className="text-sm text-stone-600">handicraft@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  📞
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">Phone</p>
                  <p className="text-sm text-stone-600">+977 9842849617</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-bold text-stone-900">
              Send us a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
