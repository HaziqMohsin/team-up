import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen name="edit" options={{ title: "Edit profile" }} />

      {/* If you have more screens, add them here */}
    </Stack>
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({});
