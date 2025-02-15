import { View, Text, Pressable } from "react-native";
import React from "react";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import UpcomingMatch from "../../component/UpcomingMatch";
import AvailableMatch from "../../component/AvailableMatch";
import HomeGreeting from "../../component/ui/HomeGreeting";

const Home = () => {
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("errer", error);
    router.replace("/sign-in");
    console.log("hello");
  };
  return (
    <SafeAreaView className="flex-1 h-full">
      <HomeGreeting />
      <UpcomingMatch />
      <AvailableMatch />
    </SafeAreaView>
  );
};

export default Home;
