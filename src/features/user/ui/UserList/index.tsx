import { Users } from "lucide-react";
import { useEffect } from "react";

import EmptyState from "@components/Empty";
import { getAllUsersWithoutSelf } from "@features/user/api/user";
import { useUserStore } from "@features/user/store/useUserStore";
import UserSort from "@features/user/ui/UserSort";
import { useUserId } from "@stores/useAuthStore";

export default function UserList() {
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  const userId = useUserId();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsersWithoutSelf(userId);
      setUsers(data);
    };
    void fetchUsers();
  }, [setUsers, userId]);

  if (users.length === 0)
    return (
      <section className="border-wh/6 flex-1 overflow-hidden rounded-[12px] border-1">
        <EmptyState
          title="접속자가 없습니다"
          description="현재 온라인 상태인 사용자가 없습니다"
          Icon={Users}
        />
      </section>
    );

  return <UserSort users={users} />;
}
