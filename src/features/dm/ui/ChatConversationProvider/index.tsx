import { useConversationChannel } from "@features/dm/hook/useConversationChannel";

type ChatRoomChannelProviderProps = {
  userId: string;
  children: React.ReactNode;
};

export default function ChatConversationProvider({
  userId,
  children,
}: ChatRoomChannelProviderProps) {
  useConversationChannel(userId);
  return <>{children}</>;
}
