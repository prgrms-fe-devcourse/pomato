import { Users } from "lucide-react";

import EmptyState from "@components/Empty";
import type { ProfilesTable } from "@features/user/types/user.type";
import UserCard from "@features/user/ui/UserCard";

export type UserListProps = {
  users: ProfilesTable["Row"][];
};

export default function UserList({ users }: UserListProps) {
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

  return (
    <ul className="flex flex-1 flex-col gap-[4px]">
      {users.map((user) => {
        return (
          <UserCard
            key={user.user_id}
            name={user.display_name}
            avatar={user.avatar_url}
            bio={user.bio}
            userId={user.user_id}
          />
        );
      })}
    </ul>
  );
}
