import type { ProfilesTable } from "@features/user/types/user.type";
import supabase from "@utils/supabase";

export const getAllUsers = async (): Promise<ProfilesTable["Row"][]> => {
  const { data, error } = await supabase.from("profiles").select<"*", ProfilesTable["Row"]>("*");

  if (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }
  return data;
};

export const getAllUsersWithoutSelf = async (
  userId: string | undefined,
): Promise<ProfilesTable["Row"][]> => {
  const { data, error } = await supabase.from("profiles").select<"*", ProfilesTable["Row"]>("*");

  if (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }

  if (!userId) return data;
  return data.filter((value) => value.user_id !== userId);
};

export const getUserById = async (userId: string): Promise<ProfilesTable["Row"] | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select<"*", ProfilesTable["Row"]>("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching user:", (error as Error).message);
    return null;
  }

  return data;
};

export const getUserNameById = async (userId: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select<"display_name", ProfilesTable["Row"]>("display_name")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching user name:", (error as Error).message);
    return null;
  }

  return data?.display_name ?? null;
};
