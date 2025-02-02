import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const MatchLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Match" }} />
      <Stack.Screen name="create" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default MatchLayout;

const styles = StyleSheet.create({});
