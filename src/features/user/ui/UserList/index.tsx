import { Users } from "lucide-react";

import EmptyState from "@components/Empty";
import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";
import type { ProfilesTable } from "@features/user/types/user.type";
import UserCard from "@features/user/ui/UserCard";

export type UserListProps = {
  users: ProfilesTable["Row"][];
};

export default function UserList({ users }: UserListProps) {
  const activeUsers = useActiveUsersStore((state) => state.activeUsers);

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
