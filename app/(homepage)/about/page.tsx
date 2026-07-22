export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-700">
            Our Story
          </p>
          <h1 className="text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
            Crafted by hand, rooted in tradition
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-stone-600">
            Nepal Handicraft connects skilled artisans from across Nepal
            directly with people who value authentic, handmade craftsmanship.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              Where it began
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-600">
              For generations, Nepali artisans have carved statues, painted
              thangkas, and shaped jewelry using techniques passed down
              through families. Nepal Handicraft started as a way to bring
              these traditional crafts to a wider audience, while making sure
              the people who make them are paid fairly for their skill and
              time.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Our mission</h2>
            <p className="mt-4 text-sm leading-6 text-stone-600">
              We work directly with artisans in Patan, Boudha, and beyond —
              no middlemen, no mass production. Every piece on this site is
              handmade, and every purchase supports a real craftsperson and
              their community.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="mb-10 text-center text-2xl font-bold text-stone-900">
            What we stand for
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                ✦
              </div>
              <h3 className="text-sm font-semibold text-stone-900">
                Authenticity
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Every item is genuinely handmade — no factory shortcuts, no
                imitations.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                ✦
              </div>
              <h3 className="text-sm font-semibold text-stone-900">
                Fair trade
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Artisans are paid fairly and directly for the work they
                create.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                ✦
              </div>
              <h3 className="text-sm font-semibold text-stone-900">
                Craftsmanship
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Techniques refined over generations, made with care and
                attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-stone-900">
          Explore the collection
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-600">
          Browse handcrafted statues, thangka paintings, jewelry, and more —
          made by artisans across Nepal.
        </p>
        <a
          href="/products"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
        >
          Shop All Products
        </a>
      </section>
    </div>
  );
}
