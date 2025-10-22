import { ChevronLeft, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Avatar from "@components/Avatar";
import { getProfile } from "@features/auth/api/profile";
import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";
import type { ProfilesTable } from "@features/user/types/user.type";

type ChatHeaderType = {
  partnerId: string;
};

export default function ChatHeader({ partnerId }: ChatHeaderType) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfilesTable["Row"]>();
  const activeUsers = useActiveUsersStore((state) => state.activeUsers);

  useEffect(() => {
    const fetchPartner = async () => {
      const data = await getProfile(partnerId);
      if (data === null) throw new Error("사용자를 찾을 수 없습니다");
      setProfile(data);
    };

    void fetchPartner();
  }, [partnerId]);

  return (
    <div className="border-wh/15 flex h-[64px] items-center justify-between border-b-1 px-[16px]">
      <div className="flex gap-[12px]">
        <button onClick={() => void navigate(-1)} className="cursor-pointer">
          <ChevronLeft width={24} height={24} />
        </button>
        <Avatar size="s" src={profile?.avatar_url ?? undefined} />
        <div className="flex flex-col justify-center">
          <span className="label-text-medium-semibold">{profile?.display_name}</span>
          <span className="label-text-xs text-wh/75">
            {activeUsers.some((user) => user.id === partnerId) ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <button>
        <MoreVertical width={24} height={24} />
      </button>
    </div>
  );
}
