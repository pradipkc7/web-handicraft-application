"use client";

import { useTheme } from "@/lib/contexts/ThemeContext";
import { useLanguage } from "@/lib/contexts/LanguageContext";

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            {t("appearance.title")}
          </h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            {t("appearance.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex h-24 flex-col items-center justify-center gap-2 rounded-lg border text-sm font-medium transition ${
              theme === "light"
                ? "border-amber-600 bg-amber-50 text-amber-800"
                : "border-stone-300 text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
            }`}
          >
            <span className="text-2xl">☀️</span>
            {t("appearance.light")}
          </button>

          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex h-24 flex-col items-center justify-center gap-2 rounded-lg border text-sm font-medium transition ${
              theme === "dark"
                ? "border-amber-500 bg-amber-900/20 text-amber-400"
                : "border-stone-300 text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
            }`}
          >
            <span className="text-2xl">🌙</span>
            {t("appearance.dark")}
          </button>
        </div>
      </div>
    </div>
  );
}
