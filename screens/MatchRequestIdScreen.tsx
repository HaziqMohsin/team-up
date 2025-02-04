import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDetailsOpponent } from "../services/matchService";
import { getOwnerTeams } from "../services/teamsService";
import CustomButton from "../component/CustomButton";
import { Image } from "expo-image";
import { createMatch } from "../services/matchService";
import { router } from "expo-router";

const MatchRequestIdScreen = () => {
  const { user, id } = useLocalSearchParams<{
    user: string;
    id?: string;
  }>();

  const [data, setData] = useState<any | null>(null);
  const [dataTeam, setDataTeam] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { details_opponent } = await getDetailsOpponent(id as string);
        const teams = await getOwnerTeams();

        if (details_opponent) {
          setData(details_opponent);
        }

        if (teams) {
          setDataTeam(teams);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleConfirmChallenge = async () => {
    console.log("here");
    setIsLoading(true);
    try {
      const { match } = await createMatch(id as string, dataTeam?.id);
      if (match) {
        router.replace("/(match)");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="justify-between h-full">
      <View className="p-4">
        <Text>{data?.teams.name}</Text>
        <Text>{data?.teams.location}</Text>
        <Text>{data?.profiles.username}</Text>
      </View>
      <View className="justify-center items-center text-center p-4 ">
        <Text
          style={{ fontSize: 14, textAlign: "center" }}
          className="font-bold"
        >
          Only challenge if you're serious about playing!
        </Text>
        <View className="w-full mt-4">
          <CustomButton
            title="Confirm challenge"
            handlePress={handleConfirmChallenge}
            containerStyle="bg-green-500"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MatchRequestIdScreen;

const styles = StyleSheet.create({});
