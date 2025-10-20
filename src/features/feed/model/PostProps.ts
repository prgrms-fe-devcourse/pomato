export type Comment = {
  id: string;
  author: { name: string; avatar?: string };
  text: string;
  createdAt: Date;
};

export type Post = {
  id: string;
  author: { name: string; avatar?: string; id: string };
  text: string;
  imageUrl?: string;
  createdAt: Date;
  likes: number;
  liked?: boolean;
  comments: Comment[];
};

// 더미데이터
export const dummyPosts: Post[] = [
  {
    id: "p1",
    author: { name: "Sarah Kim", avatar: "https://picsum.photos/seed/sarah/60", id: "@tester01" },
    text: "Just finished working on this amazing glassmorphism UI kit! 🎨✨",
    imageUrl:
      "https://img.freepik.com/free-vector/flat-post-its-boards-infographics_23-2148649295.jpg",
    createdAt: new Date(Date.now() - 36 * 60 * 1000),
    likes: 3,
    liked: false,
    comments: [
      {
        id: "c1",
        author: { name: "홍길동", avatar: "https://picsum.photos/seed/a/60" },
        text: "대단해요! 꾸준함이 제일 어려운데 👏",
        createdAt: new Date(Date.now() - 60 * 1000),
      },
      {
        id: "c2",
        author: { name: "김철수", avatar: "https://picsum.photos/seed/b/60" },
        text: "저도 오늘 3세션 했어요! 함께 화이팅!",
        createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: "p2",
    author: { name: "Alex Chen", avatar: "https://picsum.photos/seed/alex/60", id: "@tester02" },
    text: "Can you review the latest design updates?",
    imageUrl: "https://picsum.photos/seed/design/1000/600",
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
    likes: 1,
    liked: true,
    comments: [],
  },
  {
    id: "p3",
    author: { name: "System", id: "@tester03" },
    text: "Your weekly summary report is ready.",
    createdAt: new Date(Date.now() - 92 * 60 * 60 * 1000),
    likes: 0,
    liked: false,
    comments: [],
  },
];
