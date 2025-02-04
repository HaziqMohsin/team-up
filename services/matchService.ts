import { supabase } from "../lib/supabase";

type TCreateMatch = {
  place: string;
  location: string;
  dateFormat: Date;
  timeFormat: Date;
  teamHome: string;
  type: string;
};

export const createMatchRequest = async ({
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

  console.log(error);

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
      `*, teams:team_home (id, name, logo_url, location), profiles:created_by (id, username)`
    )
    .neq("created_by", user?.id)
    .eq("status", "open");

  return { match_request, error };
};

export const getDetailsOpponent = async (id: string) => {
  let { data: details_opponent, error } = await supabase
    .from("match_request")
    .select(
      `*, teams:team_home (id, name, logo_url, location), profiles:created_by (id, username)`
    )
    .eq("id", id)
    .single();

  return { details_opponent, error };
};

export const createMatch = async (matchRequestId: string, teamId: string) => {
  let { data: match_request, error } = await supabase
    .from("match_request")
    .select("*")
    .eq("id", matchRequestId)
    .single();

  if (error) {
    console.log(error);
    throw error;
  } else {
    let { error: errorUpdateStatus } = await supabase
      .from("match_request")
      .update({ status: "accepted" })
      .eq("id", matchRequestId);

    if (errorUpdateStatus) {
      console.log(errorUpdateStatus);
      throw errorUpdateStatus;
    }
  }

  const { team_home, place, status, location, date, time, type } =
    match_request;

  let { data: match, error: matchError } = await supabase
    .from("matches")
    .insert({
      team_home,
      team_away: teamId,
      location: `${place}, ${location}`,
      date,
      time,
      type,
    })
    .select()
    .single();

  console.log("match", match);

  if (matchError) {
    console.log(matchError);
    throw matchError;
  }

  return { match, matchError };
};
