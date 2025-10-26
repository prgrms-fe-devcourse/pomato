import { Users } from "lucide-react";
import { useNavigate } from "react-router";

import Button from "@components/Button";
import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";
import { usePanelStore } from "@stores/usePanelStore";
import { ROUTES } from "@type/router.types";

export default function ActiveUsersButton() {
  const { activeUsers } = useActiveUsersStore();
  const { open } = usePanelStore();
  const navigate = useNavigate();

  const handleActiveUsersButtonClick = () => {
    void navigate(ROUTES.MATE);
    open();
  };

  return (
    <Button
      onClick={handleActiveUsersButtonClick}
      type="button"
      intent="ghost"
      size="md"
      shape="circle"
      composition="iconText"
      className="px-4"
    >
      <Users /> {activeUsers.length - 1} 명이 함께 집중 중
    </Button>
  );
}
