import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

export interface InputProps extends ComponentProps<"input"> {
  type?: "text" | "password" | "number";
  error?: boolean;
  id?: string;
  Icon?: LucideIcon;
  containerStyle?: string;
  innerStyle?: string;
  iconStyle?: string;
}
