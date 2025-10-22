import type {
  PostRow,
  CommentRow,
  ProfileRow,
  Post,
  Comment,
  Author,
} from "@features/feed/types/feed.types";

export const isPostRow = (v: unknown): v is PostRow => {
  if (typeof v !== "object" || v === null) return false;

  const o = v as Record<string, unknown>;
  return (
    typeof o.id === "string" && typeof o.user_id === "string" && typeof o.created_at === "string"
  );
};

export const isCommentRow = (v: unknown): v is CommentRow => {
  if (typeof v !== "object" || v === null) return false;

  const o = v as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.post_id === "string" &&
    typeof o.user_id === "string" &&
    typeof o.created_at === "string"
    // 필요하면 content 검증도 추가
    // && (o.content === undefined || o.content === null || typeof o.content === "string")
  );
};

export const isProfileRow = (v: unknown): v is ProfileRow => {
  if (typeof v !== "object" || v === null) return false;

  const o = v as Record<string, unknown>;
  return typeof o.user_id === "string";
  // 필요 시 추가 검증:
  // && (o.username === undefined || typeof o.username === "string")
  // && (o.display_name === undefined || typeof o.display_name === "string")
  // && (o.avatar_url === undefined || o.avatar_url === null || typeof o.avatar_url === "string")
};

export function groupBy<T, K extends string | number>(
  list: readonly T[],
  getKey: (item: T) => K,
): Record<K, T[]> {
  const m = new Map<K, T[]>();
  for (const item of list) {
    const key = getKey(item);
    const bucket = m.get(key);
    if (bucket) bucket.push(item);
    else m.set(key, [item]);
  }
  return Object.fromEntries(m) as Record<K, T[]>;
}

export function mapProfilesByUserId(rows: readonly ProfileRow[]): Map<string, ProfileRow> {
  const m = new Map<string, ProfileRow>();
  for (const r of rows) m.set(r.user_id, r);
  return m;
}

export function pickAuthorFromProfile(userId: string, profile?: ProfileRow): Author {
  return {
    id: userId,
    user_id: profile?.user_id || userId,
    username: profile?.username || "",
    display_name: profile?.display_name || "",
    avatar_url: profile?.avatar_url ?? null,
  };
}

export function rowToComment(row: CommentRow, profile?: ProfileRow): Comment {
  return {
    id: row.id,
    post_id: row.post_id,
    content: row.content,
    created_at: row.created_at,
    author: pickAuthorFromProfile(row.user_id, profile),
  };
}

export function rowToPost(
  row: PostRow,
  comments: readonly CommentRow[],
  postAuthorProfile?: ProfileRow,
  commentProfilesByUserId?: Map<string, ProfileRow>,
  likes: number = 0,
  liked: boolean = false,
): Post {
  const mappedComments: Comment[] = comments.map((c) =>
    rowToComment(c, commentProfilesByUserId?.get(c.user_id)),
  );

  return {
    id: row.id,
    content: row.content,
    image_url: row.image_url,
    created_at: row.created_at,
    likes_count: row.likes_count,
    comments_count: row.comments_count,
    author: pickAuthorFromProfile(row.user_id, postAuthorProfile),
    likes,
    liked,
    comments: mappedComments,
  };
}
