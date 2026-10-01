import { useTranslation } from "react-i18next";
import type { StatusOptionsProps } from "./types";

export default function StatusOptions({ values, labelKeys }: StatusOptionsProps) {
  const { t } = useTranslation();

  return (
    <>
      {values.map((value) => (
        <option key={value} value={value}>
          {t(labelKeys[value])}
        </option>
      ))}
    </>
  );
}
