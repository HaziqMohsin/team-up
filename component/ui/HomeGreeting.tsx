import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import useAuthStore from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/profileService";

const HomeGreeting = () => {
  const { session, initializeAuth } = useAuthStore();

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  console.log(profile);
  console.log(session);

  return (
    <View className="p-4 ">
      <View className="bg-secondary-400 p-4 rounded-lg">
        <Text className="text-2xl">Hi {profile?.username},</Text>
        <Text className="text-xl">Ready for a match?</Text>
      </View>
    </View>
  );
};

export default HomeGreeting;

const styles = StyleSheet.create({});
