import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { getOwnerTeams } from "../services/teamsService";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import CustomButton from "../component/CustomButton";
import { router } from "expo-router";

const MyTeamScreen = () => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await getOwnerTeams();

        if (data) {
          setData(data);
          console.log(data);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateMatch = () => {
    console.log("Create Match");
    router.push("/(match)/create");
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="p-4 h-full justify-between">
      <View className="flex-row items-center ">
        <View style={styles.container}>
          <Image
            style={styles.image}
            source="https://picsum.photos/seed/696/3000/2000"
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </View>
        <View className="flex-1 p;-4">
          <Text className="font-bold text-black text-2xl">{data?.name}</Text>
        </View>
      </View>
      <View>
        <CustomButton title="Create Match" handlePress={handleCreateMatch} />
      </View>
    </SafeAreaView>
  );
};

export default MyTeamScreen;

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
