const PATH_TITLE_MAP: Record<string, string> = {
  "/mate": "메이트",
  "/feed": "피드",
  "/chart": "차트",
  "/dm": "DM",
  "/notification": "내 소식",
  "/setting": "설정",
  "/login": "로그인",
  "/signup": "회원가입",
};

export function getPanelTitle(pathname: string): string {
  if (pathname === "/" || pathname === "") return "POMATO";
  const segment = "/" + (pathname.split("/").find(Boolean) ?? "");
  return PATH_TITLE_MAP[segment] ?? "POMATO";
}
