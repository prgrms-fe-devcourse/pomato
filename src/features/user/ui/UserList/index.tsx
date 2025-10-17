import { Users } from "lucide-react";

import EmptyState from "@components/Empty";
import UserCard from "@features/user/ui/UserCard";

export default function UserList() {
  const isEmpty = false;
  if (isEmpty)
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
      <UserCard name="Sarah Kim" />
      <UserCard name="Sarah Kim" />
      <UserCard name="Sarah Kim" />
      <UserCard name="Sarah Kim" />
    </ul>
  );
}
