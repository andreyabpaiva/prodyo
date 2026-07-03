import { useTranslation } from "react-i18next";
import Input from "@/components/input";
import type { SignupFormProps } from "./types";

export default function SignupForm({ onSwitch }: SignupFormProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3.25">
      <Input
        label={t("auth.fields.name")}
        type="text"
        placeholder="Andrey Apaiva"
      />
      <Input
        label={t("auth.fields.email")}
        type="email"
        placeholder="andrey@prodyo.app"
      />
      <Input
        label={t("auth.fields.password")}
        type="password"
        placeholder="••••••••"
      />
      <Input
        label={t("auth.fields.confirmPassword")}
        type="password"
        placeholder="••••••••"
      />
      <button className="w-full text-cta font-medium text-white bg-brand border-none rounded-input py-3.25 mt-1">
        {t("auth.signup.btn")}
      </button>
      <button
        onClick={onSwitch}
        className="w-full text-fine text-brand bg-transparent border-none underline"
      >
        {t("auth.signup.switch")}
      </button>
    </div>
  );
}
