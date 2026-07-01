import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthShell from "./auth-shell";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";
import type { AuthTab } from "./types";

export default function AuthView() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<AuthTab>(
    searchParams.get("tab") === "signup" ? "signup" : "login"
  );

  return (
    <AuthShell>
      <div className="w-full max-w-sm">
        <h2 className="font-lora text-pane font-semibold text-espresso mb-1">
          {t(`auth.${tab}.title`)}
        </h2>
        <p className="text-sm text-stone mb-6">{t(`auth.${tab}.sub`)}</p>
        <div className="flex bg-shell rounded-tab p-1 mb-5">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 text-sm font-medium rounded-item py-2.25 transition-all duration-200 ${
              tab === "login"
                ? "bg-paper text-espresso shadow-tab"
                : "bg-transparent text-stone"
            }`}
          >
            {t("auth.loginTab")}
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 text-sm font-medium rounded-item py-2.25 transition-all duration-200 ${
              tab === "signup"
                ? "bg-paper text-espresso shadow-tab"
                : "bg-transparent text-stone"
            }`}
          >
            {t("auth.signupTab")}
          </button>
        </div>
        {tab === "login" ? (
          <LoginForm onSwitch={() => setTab("signup")} />
        ) : (
          <SignupForm onSwitch={() => setTab("login")} />
        )}
      </div>
    </AuthShell>
  );
}
