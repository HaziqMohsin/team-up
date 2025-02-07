import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MatchRequestIdScreen from "../../../../screens/MatchRequestIdScreen";
import { useLocalSearchParams } from "expo-router";

const MatchRequest = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  console.log(id);

  return <MatchRequestIdScreen />;
};

export default MatchRequest;

const styles = StyleSheet.create({});
