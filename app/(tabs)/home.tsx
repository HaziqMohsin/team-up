import { View, Text, Pressable } from "react-native";
import React from "react";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import UpcomingMatch from "../../component/UpcomingMatch";

const Home = () => {
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("errer", error);
    router.replace("/sign-in");
    console.log("hello");
  };
  return (
    <SafeAreaView className="p-4">
      <View className="h-full gap-2">
        <View>
          <Text className="text-xl font-bold"></Text>
        </View>
        <UpcomingMatch />
      </View>
    </SafeAreaView>
  );
};

export default Home;
