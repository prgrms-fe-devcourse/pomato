/**
 * 애플리케이션 라우트 경로 상수
 *
 * 모든 라우트 경로를 중앙에서 관리하여 타입 안전성과 유지보수성을 제공합니다.
 * 경로 변경 시 이 객체만 수정하면 전체 애플리케이션에 자동 반영됩니다.
 *
 * @example
 * ```tsx
 * // Link 컴포넌트에서 사용
 * <Link to={ROUTES.MATE}>Mate</Link>
 * <Link to={ROUTES.FEED}>Feed</Link>
 *
 * // navigate 함수에서 사용
 * navigate(ROUTES.LOGIN);
 *
 * // Router 설정에서 사용
 * {
 *   path: ROUTES.MATE,
 *   Component: Mate,
 * }
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
 * ROUTES 객체의 모든 경로 값을 유니온 타입으로 추출한 타입
 *
 * @typedef {"/" | "/mate" | "/feed" | "/chart" | "/dm" | "/dm/:id" | "/notification" | "/setting" | "/login" | "/signup" | "*"} Route
 *
 * @example
 * ```tsx
 * // 함수 파라미터 타입으로 사용
 * function handleNavigate(path: Route) {
 *   navigate(path);
 * }
 *
 * // Props 타입으로 사용
 * interface RedirectProps {
 *   to: Route;
 * }
 * ```
 */
export type Route = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * 정적 및 동적 라우트를 모두 포함하는 헬퍼 객체
 *
 * 정적 경로는 ROUTES 상수를 그대로 사용하고,
 * 동적 파라미터가 필요한 경로는 함수로 제공합니다.
 *
 * @example
 * ```tsx
 * // 정적 경로 사용
 * <Link to={route.MATE}>Mate</Link>
 * navigate(route.FEED);
 *
 * // 동적 경로 사용
 * <Link to={route.dmChat(userId)}>Chat</Link>
 * navigate(route.dmChat('user123'));
 * ```
 */
export const route = {
  ...ROUTES,
  dmChat: (id: string): `/dm/${string}` => `/dm/${id}`,
};

/**
 * 정적 경로와 동적 경로를 모두 포함하는 완전한 라우트 타입
 *
 * Route 타입에 동적 경로(`/dm/${string}`)까지 포함한 타입입니다.
 *
 * @typedef {Route | `/dm/${string}`} AppRoute
 *
 * @example
 * ```tsx
 * // 정적, 동적 경로 모두 허용하는 함수
 * function goToPage(path: AppRoute) {
 *   navigate(path);
 * }
 *
 * goToPage(ROUTES.MATE);        // ✅
 * goToPage(route.dmChat('123')); // ✅
 * goToPage('/invalid');          // ❌ 타입 에러
 * ```
 */
export type AppRoute = Route | ReturnType<typeof route.dmChat>;
