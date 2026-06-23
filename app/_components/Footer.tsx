// app/_components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Nepal Handicraft
            </h3>
            <p className="text-sm leading-6 text-stone-400">
              Authentic handmade products crafted by skilled Nepali makers.
              Supporting local communities through traditional craftsmanship.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products/thangka" className="hover:text-white">
                  Thangka Paintings
                </Link>
              </li>
              <li>
                <Link href="/products/statues" className="hover:text-white">
                  Statues
                </Link>
              </li>
              <li>
                <Link href="/products/jewelry" className="hover:text-white">
                  Jewelry
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <p>Kathmandu, Nepal</p>
              <p>info@nepalhandicraft.com</p>
              <p>+977 98XXXXXXXX</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-800 pt-6">
          <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Nepal Handicraft. All rights
              reserved.
            </p>

            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
