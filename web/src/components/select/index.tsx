import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";
import type { SelectProps } from "./types";

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, disabled = false, children, ...rest },
  ref,
) {
  const selectId = useId();
  const errorId = `${selectId}-error`;
  const errorAttributes = error
    ? { "aria-invalid": true, "aria-describedby": errorId }
    : null;

  return (
    <div>
      <label
        htmlFor={selectId}
        className="block text-caption font-medium text-stone mb-1.5"
      >
        {label}
      </label>
      <select
        {...rest}
        id={selectId}
        ref={ref}
        disabled={disabled}
        {...errorAttributes}
        className={cn(
          "w-full border border-fog rounded-input py-2.75 pl-3.5 pr-9 text-sm text-espresso bg-paper focus:outline-none focus:border-brand",
          disabled && "opacity-70 cursor-not-allowed bg-fog/30",
          error && "border-bug focus:border-bug",
        )}
      >
        {children}
      </select>
      {error && (
        <p id={errorId} className="text-caption text-bug mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

export default Select;
