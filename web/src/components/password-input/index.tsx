import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import Input from "@/components/input";
import { PASSWORD_TOGGLE_ICON_SIZE } from "./constants";
import type { PasswordInputProps } from "./types";

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ disabled = false, ...rest }, ref) {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const Icon = visible ? EyeOff : Eye;

    return (
      <Input
        {...rest}
        ref={ref}
        disabled={disabled}
        type={visible ? "text" : "password"}
        adornment={
          <button
            type="button"
            disabled={disabled}
            onClick={() => setVisible((current) => !current)}
            aria-label={t(
              visible ? "common.hidePassword" : "common.showPassword",
            )}
            aria-pressed={visible}
            className="text-stone hover:text-espresso disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Icon size={PASSWORD_TOGGLE_ICON_SIZE} />
          </button>
        }
      />
    );
  },
);

export default PasswordInput;
