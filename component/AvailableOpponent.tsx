import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { getAvailableOpponent } from "../services/matchService";
import CustomButton from "./CustomButton";

const AvailableOpponent = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { match_request } = await getAvailableOpponent();

        if (match_request) {
          setData(match_request);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    getAvailableOpponent();
  };
  return (
    <View className="p-4">
      <Text className="text-lg font-bold">Available Opponent</Text>
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View className="flex  justify-between items-center p-4 bg-white rounded-lg shadow-lg mb-4">
            <Text className="text-lg">{item.team_home}</Text>
            <Text className="text-lg">{item.place}</Text>
            <Text className="text-lg">{item.location}</Text>
            <Text className="text-lg">{item.type}</Text>
            <Text className="text-lg">{item.date}</Text>
            <Text className="text-lg">{item.time}</Text>
            <Text className="text-lg">{item.teams.name}</Text>
            <Text className="text-lg">{item.profiles.username}</Text>
            <Text className="text-lg">{item.created_by}</Text>
          </View>
        )}
      />
      {/* <CustomButton title="Get Available Opponent" handlePress={handleClick} /> */}
    </View>
  );
};

export default AvailableOpponent;

const styles = StyleSheet.create({});
