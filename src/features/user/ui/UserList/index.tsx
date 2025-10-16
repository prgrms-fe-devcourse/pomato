import UserCard from "@features/user/ui/UserCard";

export default function UserList() {
  return (
    <ul className="flex flex-1 flex-col gap-[4px]">
      <UserCard name="Sarah Kim" />
      <UserCard name="Sarah Kim" />
      <UserCard name="Sarah Kim" />
      <UserCard name="Sarah Kim" />
    </ul>
  );
}
