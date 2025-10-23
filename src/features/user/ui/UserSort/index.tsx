import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";
import { useUserStore } from "@features/user/store/useUserStore";
import type { ProfilesTable } from "@features/user/types/user.type";
import UserCard from "@features/user/ui/UserCard";

export type UserSortProps = {
  users: ProfilesTable["Row"][];
};

export default function UserSort({ users }: UserSortProps) {
  const userSearchKeyword = useUserStore((state) => state.userSearchKeyword);
  const activeUsers = useActiveUsersStore((state) => state.activeUsers);

  const enrichedUsers = users.map((user) => ({
    ...user,
    isOnline: activeUsers.some((au) => au.id === user.user_id),
  }));

  const filteredUsers =
    userSearchKeyword.trim() === ""
      ? enrichedUsers
      : enrichedUsers.filter((user) =>
          user.display_name?.toLowerCase().includes(userSearchKeyword.toLowerCase()),
        );

  // eslint-disable-next-line unicorn/no-array-sort
  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a.isOnline === b.isOnline) return 0;
    return a.isOnline ? -1 : 1;
  });

  return (
    <ul className="pc-scroll flex flex-1 flex-col gap-[4px] overflow-y-auto">
      {sortedUsers.map((user) => {
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
