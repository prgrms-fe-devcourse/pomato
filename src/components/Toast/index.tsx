import { X } from "lucide-react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { iconMap } from "./intent";
import type { Intent, ToastProps } from "./types";
import { useAutoDismiss } from "./useAutoDismiss";
import { toastVariants } from "./variants";

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    className,
    intent = "info",
    position = "bottom-right",
    message,
    description,
    dismissible = true,
    onClose,
    duration = 3000,
    children,
    ...rest
  },
  ref,
) {
  useAutoDismiss(onClose, duration);

  const safeIntent: Intent = (intent ?? "info") as Intent;
  const { Icon, colorClass } = iconMap[safeIntent];

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="polite"
      className={twMerge(
        toastVariants({ intent, position }),
        "-translate-y-0.5 transition-transform active:translate-y-0",
        className,
      )}
      {...rest}
    >
      <Icon className={twMerge("h-5.5 w-5.5 shrink-0", colorClass)} strokeWidth={1.5} />

      <div className="min-w-0 flex-1">
        {message && <p className="text-wh/90 truncate text-sm">{message}</p>}
        {description && <p className="text-wh/70 mt-0.5 line-clamp-2 text-xs">{description}</p>}
        {!message && !description && children}
      </div>

      {dismissible && (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="text-wh/70 hover:text-wh/95 hover:bg-wh/12 dark:hover:bg-bl/40 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-[10px] transition-colors focus:outline-none"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      )}
    </div>
  );
});
