import UserListItem from "@features/UserList/index";

type UserStatusType = "online" | "offline";

const userData: {
  avatar?: string;
  type?: UserStatusType;
  name: string;
}[] = [
  {
    avatar: "https://picsum.photos/seed/user1/80",
    type: "online",
    name: "Sarah Kim",
  },
  {
    name: "David Park",
  },
  {
    avatar: "https://picsum.photos/seed/user3/80",
    name: "Emily Choi",
  },
  {
    avatar: "https://picsum.photos/seed/user4/80",
    type: "online",
    name: "Jin Lee",
  },
  {
    type: "online",
    name: "System",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-[rgb(46,46,46)] pb-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-center text-2xl font-bold text-white">PostComposer 테스트</h1>

        <br />
        {userData.map((n) => (
          <UserListItem avatar={n.avatar} type={n.type} name={n.name} />
        ))}
        <br />
      </div>
    </div>
  );
}

export default App;
