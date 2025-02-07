import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../component/CustomButton";
import { router } from "expo-router";
import { Link } from "expo-router";
import AvailableOpponent from "../../../component/AvailableOpponent";
import AvailableMatch from "../../../component/AvailableMatch";

const Match = () => {
  const handleCreateMatch = () => {
    console.log("Create Match");
    router.push("/(match)/create");
  };
  return (
    <SafeAreaView className="flex-1 h-full">
      <AvailableOpponent />
      <AvailableMatch />
      <View className="px-4">
        {/* <Link href="/(match)/create"> */}
        {/* <CustomButton title="Create Match" handlePress={handleCreateMatch} /> */}
        {/* </Link> */}
      </View>

      {/* <Link href="/(match)/create">Create match</Link> */}
    </SafeAreaView>
  );
};

export default Match;

const styles = StyleSheet.create({});
