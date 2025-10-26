import { Info, CheckCircle, AlertTriangle, XCircle, type LucideIcon } from "lucide-react";

export type ToastIntent = "info" | "success" | "warning" | "error";

export const iconMap = {
  info: {
    Icon: Info,
    colorClass: "text-blue-400",
  },
  success: {
    Icon: CheckCircle,
    colorClass: "text-green-400",
  },
  warning: {
    Icon: AlertTriangle,
    colorClass: "text-yellow-400",
  },
  error: {
    Icon: XCircle,
    colorClass: "text-red-400",
  },
} satisfies Record<ToastIntent, { Icon: LucideIcon; colorClass: string }>;
