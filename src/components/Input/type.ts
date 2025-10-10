import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  type?: "text" | "password" | "number" | "email";
  error?: boolean;
  id?: string;
  Icon?: LucideIcon;
  containerStyle?: string;
  innerStyle?: string;
  iconStyle?: string;
}
