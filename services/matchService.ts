import { supabase } from "../lib/supabase";
import { getTeam } from "./teamsService";

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

  // amik teamhome owner

  // amik teamwaway owner
  // insert ke participants

  if (matchError) {
    console.log(matchError);
    throw matchError;
  }

  const teamHome = await getTeam(team_home);
  const teamAway = await getTeam(teamId);

  let { data: participant, error: participantsError } = await supabase
    .from("match_participants")
    .insert([
      {
        player_id: teamHome?.team.created_by,
        team_id: teamHome?.team.id,
        match_id: match?.id,
        joined_at: new Date(),
      },
      {
        player_id: teamAway?.team.created_by,
        team_id: teamAway?.team.id,
        match_id: match?.id,
        joined_at: new Date(),
      },
    ])
    .select();

  return { match, matchError };
};

export const getAvailableMatch = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) return { matches: null, error: userError };
  if (!user?.id) return { matches: null, error: "User not authenticated" };

  let { data: matches, error } = await supabase.from("matches").select(
    `*, 
        team_home:team_home(id, name, logo_url), 
        team_away:team_away(id, name, logo_url),
        match_participants!left(player_id)`
  );

  if (error) return { matches: null, error };

  // **Filter matches where user is NOT in match_participants**
  const filteredMatches = matches?.filter(
    (match) =>
      !match.match_participants.some(
        (participant: any) => participant.player_id === user.id
      )
  );

  return { matches: filteredMatches, error: null };
};

// export const getAvailableMatch = async () => {
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   if (userError) return { matches: null, error: userError };
//   if (!user?.id) return { matches: null, error: "User not authenticated" };

//   let { data: matches, error } = await supabase
//     .from("matches")
//     .select(
//       `*,
//         team_home:team_home(id, name, logo_url),
//         team_away:team_away(id, name, logo_url)`
//     )
//     .not(
//       "id",
//       "in",
//       supabase
//         .from("match_participants")
//         .select("match_id")
//         .eq("player_id", user.id)
//     );

//   console.log("matches", matches);

//   return { matches, error };
// };

export const getMatchById = async (id: string) => {
  let { data: matches_detals, error } = await supabase
    .from("matches")
    .select(
      `*, team_home:team_home(id, name, logo_url), team_away:team_away(id, name, logo_url)`
    )
    .eq("id", id)
    .single();

  return { matches_detals, error };
};

export const getMatchParticipants = async (id: string) => {
  let { data: participants, error } = await supabase
    .from("match_participants")
    .select(`*, player:player_id(id, username)`)
    .eq("match_id", id);

  return { participants, error };
};

export const joinMatch = async (body: any) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("match_participants")
    .insert([
      {
        team_id: body.team_id,
        match_id: body.match_id,
        player_id: user?.id,
        joined_at: body.joined_at,
      },
    ])
    .select();

  return { data, error };
};

// export const getUserMatch = async () => {
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   let {data, error} = await supabase
//     .from("match_participants")
//     .select(`*, player:player_id(id, username)`)
//     .eq("player_id", user?.id);

//   return {data, error}
// };

export const getUserMatch = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  let { data, error } = await supabase
    .from("match_participants")
    .select(
      `
       *,
        match:match_id(
          *,
          team_home:team_home(
            id,
            name,
            logo_url
          ),
          team_away:team_away(
            id,
            name,
            logo_url
          )
        )
      `
    )
    .eq("player_id", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
  // Typically with React Query, you'd return the actual data
  // or throw an error if something goes wrong
};
