import { useTranslation } from "react-i18next";
import type { LoginFormProps } from "./types";

export default function LoginForm({ onSwitch }: LoginFormProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3.25">
      <div>
        <label className="block text-caption font-medium text-stone mb-1.5">
          {t("auth.fields.email")}
        </label>
        <input
          type="email"
          placeholder="andrey@prodyo.app"
          className="w-full border border-fog rounded-input py-2.75 px-3.5 text-sm text-espresso bg-paper focus:outline-none focus:border-ash"
        />
      </div>
      <div>
        <label className="block text-caption font-medium text-stone mb-1.5">
          {t("auth.fields.password")}
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full border border-fog rounded-input py-2.75 px-3.5 text-sm text-espresso bg-paper focus:outline-none focus:border-ash"
        />
      </div>
      <button className="w-full text-cta font-medium text-white bg-brand border-none rounded-input py-3.25 mt-1">
        {t("auth.login.btn")}
      </button>
      <button
        onClick={onSwitch}
        className="w-full text-fine text-brand bg-transparent border-none underline"
      >
        {t("auth.login.switch")}
      </button>
    </div>
  );
}
