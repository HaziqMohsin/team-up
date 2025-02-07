import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";
import CustomButton from "../component/CustomButton";

const ProfileScreen = () => {
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    router.replace("(auth)/sign-in");
  };
  return (
    <SafeAreaView>
      <View>
        <Text>ProfileScreen</Text>
      </View>
      <View className="p-4">
        <CustomButton title="Sign Out" handlePress={handleSignout} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
