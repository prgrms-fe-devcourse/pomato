import { Bell, Heart, MessageSquare, Settings, Users, type LucideIcon } from "lucide-react";

export type NavItem = {
  path: string;
  Icon: LucideIcon;
  label: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { path: "/mate", Icon: Users, label: "메이트" },
  { path: "/feed", Icon: Heart, label: "피드" },
  // { path: "/chart", Icon: ChartColumn, label: "차트" },
  { path: "/dm", Icon: MessageSquare, label: "DM" },
  { path: "/notification", Icon: Bell, label: "내 소식" },
  { path: "/setting", Icon: Settings, label: "설정" },
] as const;
