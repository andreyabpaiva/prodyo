import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";
import type { InputProps } from "./types";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, adornment, type = "text", disabled = false, ...rest },
  ref,
) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const errorAttributes = error
    ? { "aria-invalid": true, "aria-describedby": errorId }
    : null;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-caption font-medium text-stone mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...rest}
          id={inputId}
          ref={ref}
          type={type}
          disabled={disabled}
          {...errorAttributes}
          className={cn(
            "w-full border border-fog rounded-input py-2.75 px-3.5 text-sm text-espresso bg-paper focus:outline-none focus:border-ash",
            disabled && "opacity-70 cursor-not-allowed bg-fog/30",
            error && "border-bug focus:border-bug",
            adornment && "pr-11",
          )}
        />
        {adornment && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {adornment}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-caption text-bug mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
