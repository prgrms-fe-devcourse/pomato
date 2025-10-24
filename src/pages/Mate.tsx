import UserHeader from "@features/user/ui/UserHeader";
import UserInput from "@features/user/ui/UserInput";
import UserList from "@features/user/ui/UserList";

export default function Mate() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
      <UserHeader />
      <UserInput />
      <UserList />
    </div>
  );
}
