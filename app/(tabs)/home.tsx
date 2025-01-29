import { View, Text, Pressable } from "react-native";
import React from "react";
import { supabase } from "../../lib/supabase";
import CustomButton from "../../component/CustomButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("errer", error);
    router.replace("/sign-in");
    console.log("hello");
  };
  return (
    <SafeAreaView className="p-4">
      <View className="h-full justify-center items-center gap-2">
        <View className="">
          <Text>Home</Text>
        </View>
        {/* <View className="w-full">
          <CustomButton
            title="Sign out"
            handlePress={handleSignout}
            containerStyle={"w-full"}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Home;
