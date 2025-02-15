import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserMatch, getAvailableMatch } from "../services/matchService";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { parse, format } from "date-fns";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const UpcomingMatch = () => {
  const {
    data: matches,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["userMatch"],
    queryFn: getUserMatch,
  });

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const handleRouteMatch = () => {
    router.push("/(match)");
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      <Text className="text-xl font-bold">Upcoming Match</Text>
      <FlatList
        data={matches}
        renderItem={({ item }: any) => {
          const parsedDate = parse(item.match.date, "yyyy-MM-dd", new Date());
          const parsedTime = parse(item.match.time, "HH:mm:ss", new Date());
          const formattedDate = format(parsedDate, "EEE, d MMM yyyy");
          const formattedTime = format(parsedTime, "h:mm a");
          const combinedString = `${formattedDate}, ${formattedTime}`;
          return (
            <View className="bg-white p-4 my-2 rounded-lg">
              <View className="flex-row w-full justify-center items-center relative">
                <View className="flex-row items-center justify-end flex-1 mx-4">
                  <View className="mr-2">
                    <Text
                      className={`${
                        item.team_id === item.match.team_home.id
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      {item.match.team_home.name}
                    </Text>
                  </View>
                  <View style={styles.container} className="">
                    <Image
                      style={styles.image}
                      source={item.match.team_home.logo_url}
                      placeholder={{ blurhash }}
                      contentFit="cover"
                      transition={1000}
                    />
                  </View>
                </View>

                <View
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: [{ translateX: -5 }],
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "700" }}>V</Text>
                </View>

                <View className="flex-row items-center justify-start flex-1 mx-4">
                  <View style={styles.container} className="">
                    <Image
                      style={styles.image}
                      source={item.match.team_away.logo_url}
                      placeholder={{ blurhash }}
                      contentFit="cover"
                      transition={1000}
                    />
                  </View>
                  <View className="ml-2">
                    <Text
                      className={`${
                        item.team_id === item.match.team_away.id
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      {item.match.team_away.name}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-center gap-2 justify-center mt-4">
                <MaterialCommunityIcons
                  name="soccer-field"
                  size={24}
                  color="black"
                />
                <Text>{item.match.location}</Text>
              </View>
              <View className="flex-row items-center justify-center gap-2">
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={24}
                  color="black"
                />
                <Text>{combinedString}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, i) => i.toString()}
        ListEmptyComponent={() => (
          <View className="items-center justify-center mt-4">
            <Text className="text-gray-500 text-lg mb-2">
              No upcoming matches
            </Text>
            {/* <CustomButton
              title="Find a match"
              handlePress={handleRouteMatch}
              containerStyle="px-2 min-h-[40px]"
            /> */}
          </View>
        )}
      />
    </View>
  );
};

export default UpcomingMatch;

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: 45,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  image: {
    flex: 1,
    height: 45,
    width: 45,
    backgroundColor: "#0553",
    borderRadius: 100,
  },
});
