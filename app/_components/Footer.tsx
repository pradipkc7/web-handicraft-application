// app/_components/Footer.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-950 text-stone-300 dark:border-stone-800">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Nepal Handicraft
            </h3>
            <p className="text-sm leading-6 text-stone-400">
              {t("footer.brandTagline")}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("footer.shop")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="hover:text-white">
                  {t("footer.allProducts")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Thangka"
                  className="hover:text-white"
                >
                  Thangka Paintings
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Statues"
                  className="hover:text-white"
                >
                  Statues
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Jewelry"
                  className="hover:text-white"
                >
                  Jewelry
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("footer.company")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  {t("footer.blog")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  {t("footer.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("footer.contact")}
            </h4>
            <div className="space-y-3 text-sm">
              <p>Kathmandu, Nepal</p>
              <p>handicraft@gmail.com</p>
              <p>+977 9842849617</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-800 pt-6">
          <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Nepal Handicraft. {t("footer.rights")}
            </p>

            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white">
                {t("footer.privacy")}
              </Link>
              <Link href="/terms" className="hover:text-white">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
