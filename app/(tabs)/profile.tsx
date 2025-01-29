import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import CustomButton from "../../component/CustomButton";

const Profile = () => {
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("errer", error);
    router.replace("/sign-in");
    console.log("hello");
  };
  return (
    <SafeAreaView className="p-4">
      <View className="justify-center items-center h-full gap-2">
        <View>
          <Text>Profile</Text>
        </View>
        <View className="w-full">
          <CustomButton
            title="Sign out"
            handlePress={handleSignout}
            containerStyle={"w-full"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
