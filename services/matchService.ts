import { supabase } from "../lib/supabase";

type TCreateMatch = {
  place: string;
  location: string;
  dateFormat: Date;
  timeFormat: Date;
  teamHome: string;
  type: string;
};

export const createMatch = async ({
  place,
  location,
  dateFormat,
  timeFormat,
  teamHome,
  type,
}: TCreateMatch) => {
  const { data, error } = await supabase
    .from("match_request")
    .insert({
      place,
      location,
      date: dateFormat,
      time: timeFormat,
      team_home: teamHome,
      status: "open",
      type,
    })
    .select();

  return { data, error };
};

export const getAvailableOpponent = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  let { data: match_request, error } = await supabase
    .from("match_request")
    .select(
      `*, teams:team_home (id, name, logo_url), profiles:created_by (id, username)`
    )
    .neq("created_by", user?.id);

  return { match_request, error };
};
