import { useTranslation } from "react-i18next";
import Logo from "@/components/logo";
import LangToggle from "@/components/lang-toggle";
import AnimatedCheck from "@/components/animated-check";
import type { AuthShellProps } from "./types";

export default function AuthShell({ children }: AuthShellProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-2/5 bg-brand flex-col justify-between p-12 shadow-panel-right relative z-10">
        <Logo size="lg" variant="white" />
        <div>
          <h2 className="font-lora text-4xl font-semibold text-white leading-tight mb-7">
            {t("landing.tagline")}
          </h2>
          <div className="flex flex-col gap-3.25">
            <div className="flex items-start gap-3">
              <AnimatedCheck index={0} />
              <span className="text-sm text-white/80 leading-relaxed">
                {t("landing.features.f1.title")}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <AnimatedCheck index={1} />
              <span className="text-sm text-white/80 leading-relaxed">
                {t("landing.features.f2.title")}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <AnimatedCheck index={2} />
              <span className="text-sm text-white/80 leading-relaxed">
                {t("landing.features.f3.title")}
              </span>
            </div>
          </div>
        </div>
        <span className="text-xs text-white/30">prodyo · beta</span>
      </div>
      <div className="flex-1 bg-canvas flex flex-col items-center justify-center px-6 lg:px-18 py-12 relative">
        <div className="absolute top-5 right-5">
          <LangToggle />
        </div>
        {children}
      </div>
    </div>
  );
}
