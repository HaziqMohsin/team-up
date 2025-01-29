import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="create-user-info"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar hidden />
    </>
  );
};

export default AuthLayout;
