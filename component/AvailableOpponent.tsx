import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { getAvailableOpponent } from "../services/matchService";
import { getOwnerTeams } from "../services/teamsService";
import CustomButton from "./CustomButton";
import { Image } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

const AvailableOpponent = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [dataTeams, setDataTeams] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { match_request } = await getAvailableOpponent();

        if (match_request) {
          setData(match_request);
          //   console.log(match_request);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { teams, error } = await getOwnerTeams();

        if (teams) {
          setDataTeams(teams);
          console.log(teams);
        }
        if (error) {
          setDataTeams([]);
        }
      } catch (error) {
        // console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = (id: string) => {
    console.log(id);
  };

  const handlePress = (matchRequestId: string) => {
    router.push(`/(match)/matchrequest/${matchRequestId}`);
  };

  if (dataTeams?.length === 0) {
    return null;
  }

  return (
    <View className="p-4">
      <Text className="text-xl font-bold">Available Opponent</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <Pressable
            onPress={() => handleClick(item.team_home)}
            className="mt-4 rounded-lg mr-4 h-[400px] w-[250px]"
          >
            <View className="flex p-6 bg-white rounded-lg mb-4 h-full justify-between">
              <View>
                <View style={styles.container} className="mb-4">
                  <Image
                    style={styles.image}
                    source={item.teams.logo_url}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                  />
                </View>
                <View>
                  <Text className="text-2xl font-pbold">{item.teams.name}</Text>
                </View>
              </View>

              {/* <Text className="text-lg">{item.team_home}</Text> */}
              <View className="gap-1">
                <View className="flex-row gap-2">
                  <MaterialCommunityIcons
                    name="soccer-field"
                    size={24}
                    color="black"
                  />
                  <Text className="text-lg">
                    {item.place}, {item.location}
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={24}
                    color="black"
                  />
                  <Text className="text-lg">
                    {item.date}, {item.time}
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <Feather name="type" size={24} color="black" />
                  <Text className="text-lg">{item.type}</Text>
                </View>

                {/* <Text className="text-lg">{item.profiles.username}</Text>
                <Text className="text-lg">{item.created_by}</Text> */}

                <View className="w-full mt-4">
                  <CustomButton
                    title="Challenge"
                    handlePress={() => handlePress(item.id)}
                    containerStyle={""}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
      {/* <CustomButton title="Get Available Opponent" handlePress={handleClick} /> */}
    </View>
  );
};

export default AvailableOpponent;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
    marginRight: 14,
  },
  image: {
    flex: 1,
    height: 100,
    width: 100,
    backgroundColor: "#0553",
    borderRadius: 100,
  },
});
