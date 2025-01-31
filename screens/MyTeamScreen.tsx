import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { getOwnerTeams } from "../services/teamsService";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTeamScreen = () => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await getOwnerTeams();

        if (data) {
          setData(data);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>{data?.name}</Text>
      </View>
    </SafeAreaView>
  );
};

export default MyTeamScreen;

const styles = StyleSheet.create({});
