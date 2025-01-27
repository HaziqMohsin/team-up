import { View, Text, Pressable } from "react-native";
import React from "react";
import { supabase } from "../../lib/supabase";
import CustomButton from "../../component/CustomButton";
import { router } from "expo-router";

const Home = () => {
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("errer", error);
    router.replace("/sign-in");
    console.log("hello");
  };
  return (
    <View className="flex-1 justify-center items-center h-full">
      <Text>Home</Text>
      <View>
        <CustomButton title="Sign out" handlePress={handleSignout} />
      </View>
    </View>
  );
};

export default Home;
