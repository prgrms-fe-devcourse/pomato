import supabase from "@utils/supabase";

export const onFromActiveUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  await supabase.from("active_users").upsert({ id: user.id });
};

export const offFromActiveUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  await supabase.from("active_users").delete().eq("id", user.id);
};
