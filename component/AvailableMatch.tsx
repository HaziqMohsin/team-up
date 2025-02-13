import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { getAvailableMatch } from "../services/matchService";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { parse, format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

const AvailableMatch = () => {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const {
    data: availableMatch,
    isLoading: isAvailableMatchLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["availableMatch"],
    queryFn: getAvailableMatch,
  });

  console.log("AvailableMatch", availableMatch);

  const handlePress = (id: string) => {
    router.push(`${id}`);
  };
  return (
    <View className="p-4">
      <Text className="text-xl font-bold">Available Match</Text>
      <FlatList
        data={availableMatch as any}
        renderItem={({ item }) => {
          const parsedDate = parse(item.date, "yyyy-MM-dd", new Date());
          const parsedTime = parse(item.time, "HH:mm:ss", new Date());
          const formattedDate = format(parsedDate, "EEE, d MMM yyyy");
          const formattedTime = format(parsedTime, "h:mm a");
          const combinedString = `${formattedDate}, ${formattedTime}`;
          return (
            <Pressable onPress={() => handlePress(item.id)}>
              <View className="bg-white p-4 my-2 rounded-lg">
                <View className="flex-row w-full justify-center items-center relative">
                  <View className="flex-row items-center justify-end flex-1 mx-4">
                    <View className="mr-2">
                      <Text>{item.team_home.name}</Text>
                    </View>
                    <View style={styles.container} className="">
                      <Image
                        style={styles.image}
                        source={item.team_home.logo_url}
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
                        source={item.team_home.logo_url}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                      />
                    </View>
                    <View className="ml-2">
                      <Text>{item.team_away.name}</Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row items-center gap-2 justify-center mt-4">
                  <MaterialCommunityIcons
                    name="soccer-field"
                    size={24}
                    color="black"
                  />
                  <Text>{item.location}</Text>
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
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default AvailableMatch;

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
