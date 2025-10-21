import { getAllUsersWithoutSelf } from "@features/user/api/user";

export const mateLoader = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await getAllUsersWithoutSelf();
};
