import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserMatch, getAvailableMatch } from "../services/matchService";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";

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

  console.log(matches);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View>
      <Text>UpcomingMatch</Text>
      <FlatList
        data={matches}
        renderItem={({ item }: any) => (
          <View className="bg-white p-4 my-2 rounded-lg">
            <View className="flex-row w-full justify-center items-center relative">
              <View className="flex-row items-center justify-end flex-1 mx-4">
                <View className="mr-2">
                  <Text>{item.match.team_home.name}</Text>
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
                  <Text>{item.match.team_away.name}</Text>
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
              <Text>
                {item.match.date}, {item.match.time}{" "}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, i) => i.toString()}
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
