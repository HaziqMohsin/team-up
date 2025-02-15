import { supabase } from "../lib/supabase";

export const getUserProfile = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) return { matches: null, error: userError };
  if (!user?.id) return { matches: null, error: "User not authenticated" };

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
