import { Search } from "lucide-react";
import { useLoaderData } from "react-router";

import Input from "@components/Input";
import type { ProfilesTable } from "@features/user/types/user.type";
import UserHeader from "@features/user/ui/UserHeader";
import UserList from "@features/user/ui/UserList";

export default function Mate() {
  const users = useLoaderData<ProfilesTable["Row"][]>();
  return (
    <div className="flex flex-col gap-[12px] p-[16px]">
      <UserHeader />
      <Input
        Icon={{ Component: Search, align: "right" }}
        placeholder="찾을 메이트의 이름을 검색해주세요..."
      />
      <UserList users={users} />
    </div>
  );
}
