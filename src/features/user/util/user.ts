export const getOtherUser = (id: string, userA: string, userB: string): string => {
  if (userA === id && userB) return userB;
  if (userB === id && userA) return userA;
  return "";
};
