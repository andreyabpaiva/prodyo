import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Input from "@/components/input";
import PasswordInput from "@/components/password-input";
import { useLogin } from "@/services/mutations/auth/use-login";
import { AUTH_EMAIL_PATTERN } from "../constants";
import { getAuthErrorKey } from "../utils";
import type { LoginFormProps, LoginFormValues } from "./types";

export default function LoginForm({ onSwitch }: LoginFormProps) {
  const { t } = useTranslation();
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ mode: "onSubmit", reValidateMode: "onBlur" });

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, {
      onSuccess: (user) => console.log(user),
      onError: (error) => toast.error(t(getAuthErrorKey(error))),
    });
  });

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-3.25">
      <Input
        label={t("auth.fields.email")}
        type="email"
        autoComplete="email"
        placeholder={t("auth.placeholders.email")}
        error={errors.email?.message}
        {...register("email", {
          required: t("auth.validation.required"),
          pattern: {
            value: AUTH_EMAIL_PATTERN,
            message: t("auth.validation.invalidEmail"),
          },
        })}
      />
      <PasswordInput
        label={t("auth.fields.password")}
        autoComplete="current-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password", {
          required: t("auth.validation.required"),
        })}
      />
      <button
        type="submit"
        disabled={login.isPending}
        className="w-full text-cta font-medium text-white bg-brand border-none rounded-input py-3.25 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {login.isPending ? t("common.loading") : t("auth.login.btn")}
      </button>
      <button
        type="button"
        onClick={onSwitch}
        className="w-full text-fine text-brand bg-transparent border-none underline"
      >
        {t("auth.login.switch")}
      </button>
    </form>
  );
}
