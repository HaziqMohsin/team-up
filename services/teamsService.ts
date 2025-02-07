import { supabase } from "../lib/supabase";

type TcreateTeam = {
  teamName: string;
  location: string;
};

export const createTeam = async ({ teamName, location }: TcreateTeam) => {
  const { data, error } = await supabase
    .from("teams")
    .insert({ name: teamName, location })
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const listTeams = async () => {
  const { data: teams, error } = await supabase.from("teams").select("*");

  if (error) {
    throw error;
  }

  return teams;
};

export const getOwnerTeams = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const { data: teams, error } = await supabase
    .from("teams")
    .select("*")
    .eq("created_by", user?.id)
    .single();

  if (userError) {
    throw userError;
  }

  return { teams, error };
};

export const getTeam = async (teamId: string) => {
  const { data: team, error } = await supabase
    .from("teams")
    .select("*")
    .eq("id", teamId)
    .single();

  return { team, error };
};
