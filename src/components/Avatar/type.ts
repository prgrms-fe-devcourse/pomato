import type { ComponentPropsWithoutRef } from "react";

export interface AvatarProps extends ComponentPropsWithoutRef<"div"> {
  status?: string;
  editStyle?: string;
  statusStyle?: string;
}
