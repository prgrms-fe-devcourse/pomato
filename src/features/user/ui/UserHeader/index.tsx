import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";

export default function UserHeader() {
  const { activeUsers } = useActiveUsersStore();
  return (
    <header className="flex flex-col gap-[8px]">
      <div className="flex items-center gap-[8px]">
        <span className="heading-text-xs">접속자</span>
        <span className="border-wh/20 bg-wh/20 flex h-[28px] items-center justify-center rounded-[8px] border-1 px-[8px]">
          {activeUsers.length}명
        </span>
      </div>
      <span className="label-text-xs text-gray-200">현재 접속중인 메이트를 확인해보세요</span>
    </header>
  );
}
