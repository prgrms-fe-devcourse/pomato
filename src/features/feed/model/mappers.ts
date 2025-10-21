import type { PostRow, CommentRow, ProfileRow } from "@features/feed/model/tables";
import type { Post, Comment, Author } from "@features/feed/types/post.type";

export const isPostRow = (v: unknown): v is PostRow =>
  !!v && typeof v === "object" && "id" in v && "user_id" in v && "created_at" in v;

export const isCommentRow = (v: unknown): v is CommentRow =>
  !!v &&
  typeof v === "object" &&
  "id" in v &&
  "post_id" in v &&
  "user_id" in v &&
  "created_at" in v;

export const isProfileRow = (v: unknown): v is ProfileRow =>
  !!v && typeof v === "object" && "user_id" in v;

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
    username: profile?.username || "",
    display_name: profile?.display_name || "",
    avatar: profile?.avatar_url || undefined,
  };
}

export function rowToComment(row: CommentRow, profile?: ProfileRow): Comment {
  return {
    id: row.id,
    post_id: row.post_id,
    author: pickAuthorFromProfile(row.user_id, profile),
    content: row.content ?? "",
    createdAt: new Date(row.created_at),
  };
}

export function rowToPost(
  row: PostRow,
  comments: readonly CommentRow[],
  postAuthorProfile?: ProfileRow,
  commentProfilesByUserId?: Map<string, ProfileRow>,
): Post {
  const mappedComments: Comment[] = comments.map((c) =>
    rowToComment(c, commentProfilesByUserId?.get(c.user_id)),
  );

  return {
    id: row.id,
    author: pickAuthorFromProfile(row.user_id, postAuthorProfile),
    content: row.content ?? "",
    image_url: row.image_url ?? undefined,
    createdAt: new Date(row.created_at),
    likes: 0,
    liked: false,
    comments: mappedComments,
  };
}
