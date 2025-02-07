import { supabase } from "../lib/supabase";

export const getProfile = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return { data, error };
};
