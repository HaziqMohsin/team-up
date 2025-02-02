import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../../../component/CustomButton";
import { router } from "expo-router";
import { listTeams } from "../../../services/teamsService";
import { supabase } from "../../../lib/supabase";
import useAuthStore from "../../../store/authStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { SafeAreaView } from "react-native-safe-area-context";

const Team = () => {
  const { session } = useAuthStore();
  const [teamList, setTeamList] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const routeToCreateTeam = () => {
    router.push("/(team)/create");
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data, error }: any = await supabase.from("teams").select(`
            id,
    name,
    location,
    logo_url,
    profiles:created_by (
      id,
      username
    )
  `);

        if (error) {
          setError(error.message);
          return;
        }

        if (data) {
          setTeamList(data);
        }
      } catch (err) {
        setError("Failed to fetch teams");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handlePressTeam = (id: string, createdId: string) => {
    console.log(createdId);
    if (createdId === session?.user?.id) {
      router.push("/(team)/myteam");
    } else {
      console.log(`route to ${id} team`);
    }
  };

  return (
    <SafeAreaView className="flex-1 h-full">
      <View className="w-full p-4">
        <CustomButton title="Create Team" handlePress={routeToCreateTeam} />
      </View>
      <View className="">
        <FlatList
          data={teamList}
          keyExtractor={(item: any, i: number) => item.id}
          renderItem={({ item }: any) => (
            <Pressable
              className="flex-1 m-4"
              android_ripple={{ color: "#9b9b9b" }}
              onPress={() => handlePressTeam(item.id, item.profiles.id)}
            >
              <View className="h-[150px] rounded-lg p-4 bg-slate-400 justify-between">
                <View>
                  <Text className="text-black font-bold text-xl">
                    {item.name}
                  </Text>
                </View>
                <View className="gap-1">
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons
                      name="location-pin"
                      size={18}
                      color="black"
                    />
                    <Text>{item.location}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <FontAwesome6 name="user-tie" size={18} color="black" />
                    <Text>{item.profiles.username}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
          numColumns={2}
          scrollEnabled={false}
          ListEmptyComponent={<Text>No teams found</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Team;
