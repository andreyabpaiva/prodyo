import { useTranslation } from "react-i18next";
import Input from "@/components/input";
import type { LoginFormProps } from "./types";

export default function LoginForm({ onSwitch }: LoginFormProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3.25">
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
