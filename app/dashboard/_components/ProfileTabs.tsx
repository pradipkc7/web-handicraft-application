"use client";

import { useState } from "react";

import UpdateForm from "./UpdateForm";
import UpdatePasswordForm from "./PasswordResetForm";
import OrdersList from "./OrdersList";
import LanguageSettings from "./LanguageSettings";
import AppearanceSettings from "./AppearanceSettings";
import { useLanguage } from "@/lib/contexts/LanguageContext";

type ProfileUser = Parameters<typeof UpdateForm>[0]["user"];

type TabKey = "edit" | "orders" | "password" | "language" | "appearance";

export default function ProfileTabs({ user }: { user: ProfileUser }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>("edit");

  const tabs: { key: TabKey; labelKey: Parameters<typeof t>[0] }[] = [
    { key: "edit", labelKey: "profile.tab.edit" },
    { key: "orders", labelKey: "profile.tab.orders" },
    { key: "password", labelKey: "profile.tab.password" },
    { key: "language", labelKey: "profile.tab.language" },
    { key: "appearance", labelKey: "profile.tab.appearance" },
  ];

  return (
    <div>
      {/* TAB NAV */}
      <div
        role="tablist"
        aria-label="Profile sections"
        className="mb-8 flex flex-wrap justify-center gap-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              activeTab === tab.key
                ? "bg-amber-700 text-white"
                : "border border-stone-300 text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
            }`}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "edit" && <UpdateForm user={user} />}
      {activeTab === "orders" && <OrdersList />}
      {activeTab === "password" && <UpdatePasswordForm />}
      {activeTab === "language" && <LanguageSettings />}
      {activeTab === "appearance" && <AppearanceSettings />}
    </div>
  );
}
