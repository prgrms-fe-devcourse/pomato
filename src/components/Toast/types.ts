import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import type { toastVariants } from "./variants";

export type ToastVariantProps = VariantProps<typeof toastVariants>;

export type Intent = NonNullable<ToastProps["intent"]>;

export type ToastOwnProps = {
  message?: string;
  description?: string;
  dismissible?: boolean;
  onClose?: () => void;
  duration?: number;
};

export type ToastProps = PropsWithChildren<
  ComponentPropsWithoutRef<"div"> & ToastVariantProps & ToastOwnProps
>;
