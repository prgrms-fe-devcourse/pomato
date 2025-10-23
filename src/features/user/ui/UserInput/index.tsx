import { Search } from "lucide-react";

import Input from "@components/Input";
import { useUserStore } from "@features/user/store/useUserStore";

export default function UserInput() {
  const userSearchKeyword = useUserStore((state) => state.userSearchKeyword);
  const setUserSearchKeyword = useUserStore((state) => state.setUserSearchKeyword);
  return (
    <div>
      <Input
        Icon={{ Component: Search, align: "right" }}
        placeholder="찾을 메이트의 이름을 검색해주세요..."
        value={userSearchKeyword}
        onChange={(e) => setUserSearchKeyword(e.target.value)}
      />
    </div>
  );
}
