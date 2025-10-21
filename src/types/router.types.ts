/**
 * 라우트 상수
 *
 * @example
 * ```tsx
 * <Link to={ROUTES.MATE}>Mate</Link>
 * ```
 */
export const ROUTES = {
  ROOT: "/",
  MATE: "/mate",
  FEED: "/feed",
  CHART: "/chart",
  DM: "/dm",
  DM_CHAT: "/dm/:id",
  NOTIFICATION: "/notification",
  SETTING: "/setting",
  LOGIN: "/login",
  SIGNUP: "/signup",
  NOT_FOUND: "*",
} as const;

/**
 * 라우트 Key, Value 유니온 타입 정의
 */
export type Route = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * 동적 라우트 헬퍼 함수
 *
 * @example
 * ```tsx
 * <Link to={route.dmChat(userId)}>Chat</Link>
 * ```
 */
export const route = {
  ...ROUTES,
  dmChat: (id: string) => `/dm/${id}` as const,
};

/**
 * 동적 경로 포함한 타입 정의
 */
export type AppRoute = Route | ReturnType<typeof route.dmChat>;
