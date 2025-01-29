import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import CustomButton from "../../../component/CustomButton";
import { router } from "expo-router";

const Team = () => {
  const routeToCreateTeam = () => {
    router.push("/(team)/create");
  };
  return (
    <SafeAreaView className="p-4">
      <View className="justify-center items-center h-full p-4">
        <View className="w-full">
          <CustomButton title="Create Team" handlePress={routeToCreateTeam} />
        </View>
        <View>
          <Text>Team</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Team;
