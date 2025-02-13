import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { getMatchById, getMatchParticipants } from "../services/matchService";
import { Image } from "expo-image";
import CustomButton from "../component/CustomButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { joinMatch } from "../services/matchService";

const ViewMatchIdScreen = () => {
  const { id } = useLocalSearchParams<{
    id?: string;
  }>();

  const [data, setData] = useState<any | null>(null);
  const [participantData, setParticipantData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { matches_detals, error } = await getMatchById(id as string);
        const { participants, error: participantsError } =
          await getMatchParticipants(id as string);

        if (matches_detals) {
          setData(matches_detals);
          //   console.log(matches_detals);
        }

        if (participants) {
          setParticipantData(participants);
          //   console.log(participants);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const handleRequestJoin = async (teamId: string) => {
    // handle request join to join the match with team_id

    try {
      const { data, error } = await joinMatch({
        match_id: id,
        team_id: teamId,
        joined_at: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View></View>
      <View className="p-4 flex-row gap-2">
        <View className="flex-1 items-center justify-between h-full">
          <View>
            <View style={styles.container} className="mb-4">
              <Image
                style={styles.image}
                source={data?.team_home.logo_url}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold">{data?.team_home.name}</Text>
            </View>
            <View className="mt-4">
              <View className="items-center">
                <Text className="font-bold text-lg underline">Players</Text>
              </View>
              {participantData
                ?.filter((v: any) => v.team_id === data?.team_home.id)
                .map((v: any, i: number) => {
                  return (
                    <View key={i}>
                      <Text>{v.player.username}</Text>
                    </View>
                  );
                })}
            </View>
          </View>
          <View>
            <CustomButton
              handlePress={() => handleRequestJoin(data?.team_home.id)}
              title="Join"
              containerStyle={" p-4"}
            />
          </View>
        </View>
        <View className="flex-1 items-center">
          <MaterialCommunityIcons
            name="calendar-clock"
            size={24}
            color="black"
          />
          <Text>
            {data?.date} {data?.time}
          </Text>
          <MaterialCommunityIcons name="soccer-field" size={24} color="black" />
          <Text>{data?.location}</Text>
        </View>
        <View className="flex-1 items-center justify-between h-full">
          <View className="justify-center">
            <View style={styles.container} className="mb-4">
              <Image
                style={styles.image}
                source={data?.team_away.logo_url}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold">{data?.team_away.name}</Text>
            </View>
            <View className="mt-4">
              <View className="items-center">
                <Text className="font-bold text-lg underline">Players</Text>
              </View>
              {participantData
                ?.filter((v: any) => v.team_id === data?.team_away.id)
                .map((v: any, i: number) => {
                  return (
                    <View key={i}>
                      <Text>{v.player.username}</Text>
                    </View>
                  );
                })}
            </View>
          </View>
          <View>
            <CustomButton
              handlePress={() => handleRequestJoin(data?.team_away.id)}
              title="Join"
              containerStyle={" p-4"}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewMatchIdScreen;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  image: {
    flex: 1,
    height: 100,
    width: 100,
    backgroundColor: "#0553",
    borderRadius: 100,
  },
});
