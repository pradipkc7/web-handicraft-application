"use client";

import { useLanguage } from "@/lib/contexts/LanguageContext";
import { Language } from "@/lib/i18n/translations";

export default function LanguageSettings() {
  const { language, setLanguage, t } = useLanguage();

  const options: { value: Language; labelKey: "language.english" | "language.nepali" }[] = [
    { value: "en", labelKey: "language.english" },
    { value: "ne", labelKey: "language.nepali" },
  ];

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            {t("language.title")}
          </h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            {t("language.subtitle")}
          </p>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setLanguage(option.value)}
              className={`flex h-12 w-full items-center justify-between rounded-lg border px-4 text-sm font-medium transition ${
                language === option.value
                  ? "border-amber-600 bg-amber-50 text-amber-800 dark:border-amber-500 dark:bg-amber-900/20 dark:text-amber-400"
                  : "border-stone-300 text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              }`}
            >
              {t(option.labelKey)}
              {language === option.value && <span>✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
