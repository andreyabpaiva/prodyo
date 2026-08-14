import type { InputProps } from "@/components/input/types";

export type PasswordInputProps = Omit<InputProps, "type" | "adornment">;
