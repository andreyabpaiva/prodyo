import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "@/components/logo";
import LangToggle from "@/components/lang-toggle";

export default function LandingView() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <header className="flex items-center justify-between px-4 sm:px-8 lg:px-14 py-4.5 bg-paper border-b border-shell">
        <Logo size="lg" />
        <div className="flex items-center gap-2.5">
          <LangToggle />
          <button
            onClick={() => navigate("/auth")}
            className="hidden sm:block text-sm font-medium text-stone bg-transparent border border-ash rounded-input px-5.5 py-2"
          >
            {t("landing.signin")}
          </button>
          <button
            onClick={() => navigate("/auth?tab=signup")}
            className="text-sm font-medium text-white bg-brand border-none rounded-input px-5.5 py-2"
          >
            {t("landing.cta")}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 pt-10 sm:pt-14 pb-8 text-center">
        <div className="bg-brand-light text-brand text-caption font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 sm:mb-7">
          {t("landing.badge")}
        </div>
        <h1 className="font-lora text-4xl sm:text-5xl lg:text-hero font-semibold text-espresso mb-5 sm:mb-6 max-w-3xl">
          {t("landing.tagline")}
        </h1>
        <p className="text-base sm:text-lg text-stone leading-relaxed mb-8 sm:mb-11 max-w-lg">
          {t("landing.sub")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate("/auth?tab=signup")}
            className="text-cta font-medium text-white bg-brand border-none rounded-input py-3.25 w-full sm:w-48"
          >
            {t("landing.cta")}
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="text-cta font-medium text-brand bg-transparent border border-ash rounded-input py-3.25 w-full sm:w-48"
          >
            {t("landing.signin")}
          </button>
        </div>
      </main>

      <div className="px-4 sm:px-8 lg:px-14 pb-10 sm:pb-12 lg:pb-13 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
        <div className="bg-paper rounded-2xl p-7 border-2 border-feature-green">
          <h3 className="font-lora text-base font-semibold text-espresso mb-2">
            {t("landing.features.f1.title")}
          </h3>
          <p className="text-fine text-stone leading-relaxed">
            {t("landing.features.f1.desc")}
          </p>
        </div>
        <div className="bg-paper rounded-2xl p-7 border-2 border-feature-blue">
          <h3 className="font-lora text-base font-semibold text-espresso mb-2">
            {t("landing.features.f2.title")}
          </h3>
          <p className="text-fine text-stone leading-relaxed">
            {t("landing.features.f2.desc")}
          </p>
        </div>
        <div className="bg-paper rounded-2xl p-7 border-2 border-feature-orange mb-4 sm:mb-0">
          <h3 className="font-lora text-base font-semibold text-espresso mb-2">
            {t("landing.features.f3.title")}
          </h3>
          <p className="text-fine text-stone leading-relaxed">
            {t("landing.features.f3.desc")}
          </p>
        </div>
      </div>
    </div>
  );
}
