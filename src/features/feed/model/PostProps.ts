import type { Post } from "@features/feed/model/tables";

// 더미데이터
export const dummyPosts: Post[] = [
  {
    id: "p1",
    author: {
      username: "Sarah Kim",
      display_name: "Sarah Kim",
      avatar: "https://picsum.photos/seed/sarah/60",
      id: "@tester01",
    },
    content: "Just finished working on this amazing glassmorphism UI kit! 🎨✨",
    image_url:
      "https://img.freepik.com/free-vector/flat-post-its-boards-infographics_23-2148649295.jpg",
    createdAt: new Date(Date.now() - 36 * 60 * 1000),
    likes: 3,
    liked: false,
    comments: [
      {
        id: "c1",
        post_id: "post_id_1",
        author: {
          username: "홍길동",
          display_name: "홍길동",
          avatar: "https://picsum.photos/seed/a/60",
          id: "",
        },
        content: "대단해요! 꾸준함이 제일 어려운데 👏",
        createdAt: new Date(Date.now() - 60 * 1000),
      },
      {
        id: "c2",
        post_id: "post_id_2",
        author: {
          username: "김철수",
          display_name: "김철수",
          avatar: "https://picsum.photos/seed/b/60",
          id: "",
        },
        content: "저도 오늘 3세션 했어요! 함께 화이팅!",
        createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: "p2",
    author: {
      username: "Alex Chen",
      display_name: "Alex Chen",
      avatar: "https://picsum.photos/seed/alex/60",
      id: "@tester02",
    },
    content: "Can you review the latest design updates?",
    image_url: "https://picsum.photos/seed/design/1000/600",
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
    likes: 1,
    liked: true,
    comments: [],
  },
  {
    id: "p3",
    author: { username: "System", display_name: "System", id: "@tester03" },
    content: "Your weekly summary report is ready.",
    createdAt: new Date(Date.now() - 92 * 60 * 60 * 1000),
    likes: 0,
    liked: false,
    comments: [],
  },
];
