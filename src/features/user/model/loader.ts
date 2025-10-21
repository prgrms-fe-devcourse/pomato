import { getAllUsersWithoutSelf } from "@features/user/api/user";

export const mateLoader = async () => {
  const users = await getAllUsersWithoutSelf();
  return users;
};
