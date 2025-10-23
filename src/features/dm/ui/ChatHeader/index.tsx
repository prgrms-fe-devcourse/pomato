import { ChevronLeft, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Avatar from "@components/Avatar";
import { getProfile } from "@features/auth/api/profile";
import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";
import type { ProfilesTable } from "@features/user/types/user.type";
import supabase from "@utils/supabase";

type ChatHeaderType = {
  conversationId: string;
  userId: string;
};

export default function ChatHeader({ conversationId, userId }: ChatHeaderType) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfilesTable["Row"] | null>();
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const activeUsers = useActiveUsersStore((state) => state.activeUsers);

  const type = activeUsers.some((user) => user.id === partnerId) ? "online" : "offline";

  useEffect(() => {
    const fetchPartner = async () => {
      const { data: conversation, error } = await supabase
        .from("dm_conversations")
        .select("user_a, user_b")
        .eq("id", conversationId)
        .single();

      if (error || !conversation) {
        console.error("대화방을 찾을 수 없습니다:", error);
        return;
      }

      const otherId = conversation.user_a === userId ? conversation.user_b : conversation.user_a;

      setPartnerId(otherId);

      const data = await getProfile(otherId);
      if (!data) console.error("대화상대방을 찾을 수 없습니다");
      setProfile(data);
    };

    void fetchPartner();
  }, [conversationId, userId]);

  return (
    <div className="border-wh/15 flex h-[64px] items-center justify-between border-b-1 px-[16px]">
      <div className="flex gap-[12px]">
        <button onClick={() => void navigate(-1)} className="cursor-pointer">
          <ChevronLeft width={24} height={24} />
        </button>
        <Avatar size="s" src={profile?.avatar_url ?? undefined} status={type} />
        <div className="flex flex-col justify-center">
          <span className="label-text-medium-semibold">{profile?.display_name}</span>
          <span className="label-text-xs text-wh/75">
            {type === "online" ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <button>
        <MoreVertical width={24} height={24} />
      </button>
    </div>
  );
}
