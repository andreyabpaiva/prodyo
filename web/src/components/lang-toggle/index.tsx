import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/language";

export default function LangToggle() {
  const { t } = useTranslation();
  const { toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      className="text-caption font-medium text-stone bg-transparent border border-fog rounded-full px-3.5 py-1.5"
    >
      {t("common.lang")}
    </button>
  );
}
