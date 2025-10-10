import type { LucideIcon } from "lucide-react";

// 액션(실행) 버튼
export type Action = {
  label: string;
  onClick?: () => void;
  actionClassName?: string;
};

// Empty State 관리
export interface EmptyStateProps {
  title: string;
  description: string;
  Icon?: LucideIcon;
  iconStyle?: string;
  className?: string;
  action?: Action;
  ActionIcon?: LucideIcon;
}
