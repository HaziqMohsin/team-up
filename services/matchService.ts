import { supabase } from "../lib/supabase";

type TCreateMatch = {
  place: string;
  location: string;
  dateFormat: Date;
  timeFormat: Date;
  teamHome: string;
};

export const createMatch = async ({
  place,
  location,
  dateFormat,
  timeFormat,
  teamHome,
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
    })
    .select();

  return { data, error };
};
