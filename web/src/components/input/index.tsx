import { cn } from "@/lib/cn";
import type { InputProps } from "./types";

export default function Input({
  label,
  placeholder,
  type = "text",
  disabled = false,
}: InputProps) {
  return (
    <div>
      <label
        className="block text-caption font-medium text-stone mb-1.5"
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full border border-fog rounded-input py-2.75 px-3.5 text-sm text-espresso bg-paper focus:outline-none focus:border-ash",
          disabled && "opacity-70 cursor-not-allowed bg-fog/30",
        )}
      />
    </div>
  );
}
