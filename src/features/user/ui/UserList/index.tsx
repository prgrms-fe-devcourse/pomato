import { Users } from "lucide-react";
import { useEffect } from "react";

import EmptyState from "@components/Empty";
import { getAllUsersWithoutSelf } from "@features/user/api/user";
import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";
import { useUserStore } from "@features/user/store/useUserStore";
import UserCard from "@features/user/ui/UserCard";
import { useUserId } from "@stores/useAuthStore";

export default function UserList() {
  const activeUsers = useActiveUsersStore((state) => state.activeUsers);
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

  const enrichedUsers = users.map((user) => ({
    ...user,
    isOnline: activeUsers.some((au) => au.id === user.user_id),
  }));
  return (
    <ul className="flex flex-1 flex-col gap-[4px]">
      {enrichedUsers.map((user) => {
        return (
          <UserCard
            key={user.user_id}
            name={user.display_name}
            avatar={user.avatar_url}
            bio={user.bio}
            userId={user.user_id}
            type={user.isOnline ? "online" : "offline"}
          />
        );
      })}
    </ul>
  );
}
