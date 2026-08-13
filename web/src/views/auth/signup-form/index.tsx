import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Input from "@/components/input";
import PasswordInput from "@/components/password-input";
import { useRegister } from "@/services/mutations/auth/use-register";
import { AUTH_EMAIL_PATTERN, AUTH_PASSWORD_MIN_LENGTH } from "../constants";
import { getAuthErrorKey } from "../utils";
import type { SignupFormProps, SignupFormValues } from "./types";

export default function SignupForm({ onSwitch }: SignupFormProps) {
  const { t } = useTranslation();
  const signup = useRegister();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignupFormValues>({ mode: "onSubmit", reValidateMode: "onBlur" });

  const onSubmit = handleSubmit(({ name, email, password }) => {
    signup.mutate(
      { name, email, password },
      {
        onSuccess: (user) => console.log(user),
        onError: (error) => toast.error(t(getAuthErrorKey(error))),
      },
    );
  });

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-3.25">
      <Input
        label={t("auth.fields.name")}
        type="text"
        autoComplete="name"
        placeholder={t("auth.placeholders.name")}
        error={errors.name?.message}
        {...register("name", {
          required: t("auth.validation.required"),
        })}
      />
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
        autoComplete="new-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password", {
          required: t("auth.validation.required"),
          minLength: {
            value: AUTH_PASSWORD_MIN_LENGTH,
            message: t("auth.validation.passwordMin", {
              min: AUTH_PASSWORD_MIN_LENGTH,
            }),
          },
        })}
      />
      <PasswordInput
        label={t("auth.fields.confirmPassword")}
        autoComplete="new-password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: t("auth.validation.required"),
          validate: (value) =>
            value === getValues("password") ||
            t("auth.validation.passwordMismatch"),
        })}
      />
      <button
        type="submit"
        disabled={signup.isPending}
        className="w-full text-cta font-medium text-white bg-brand border-none rounded-input py-3.25 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {signup.isPending ? t("common.loading") : t("auth.signup.btn")}
      </button>
      <button
        type="button"
        onClick={onSwitch}
        className="w-full text-fine text-brand bg-transparent border-none underline"
      >
        {t("auth.signup.switch")}
      </button>
    </form>
  );
}
