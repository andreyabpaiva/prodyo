import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";
import type { TextareaProps } from "./types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, rows = 4, disabled = false, ...rest }, ref) {
    const textareaId = useId();
    const errorId = `${textareaId}-error`;
    const errorAttributes = error
      ? { "aria-invalid": true, "aria-describedby": errorId }
      : null;

    return (
      <div>
        <label
          htmlFor={textareaId}
          className="block text-caption font-medium text-stone mb-1.5"
        >
          {label}
        </label>
        <textarea
          {...rest}
          id={textareaId}
          ref={ref}
          rows={rows}
          disabled={disabled}
          {...errorAttributes}
          className={cn(
            "w-full border border-fog rounded-input py-2.75 px-3.5 text-sm text-espresso bg-paper focus:outline-none focus:border-brand",
            disabled && "opacity-70 cursor-not-allowed bg-fog/30",
            error && "border-bug focus:border-bug",
          )}
        />
        {error && (
          <p id={errorId} className="text-caption text-bug mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

export default Textarea;
