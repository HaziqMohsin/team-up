import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const TeamLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Teams" }} />
      <Stack.Screen name="create" options={{ title: "Create Team" }} />
      {/* If you have more screens, add them here */}
    </Stack>
  );
};

export default TeamLayout;

const styles = StyleSheet.create({});
