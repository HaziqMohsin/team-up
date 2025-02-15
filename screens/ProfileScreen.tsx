import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";
import CustomButton from "../component/CustomButton";
import Account from "../component/Account";
import { Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { getUserProfile } from "../services/profileService";
import { Link } from "expo-router";
import { Image } from "expo-image";

const ProfileScreen = () => {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const {
    data: profileResult,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      id: "",
      username: "",
      full_name: "",
      avatar_url: "",
      website: "",
      // Add other fields matching your profile table
    },
  });

  useEffect(() => {
    if (profileResult) {
      reset(profileResult);
    }
  }, [profileResult, reset]);

  if (isLoading) return <Text>Loading profile...</Text>;

  if (isError || profileResult?.error) {
    const errorMessage = queryError?.message || profileResult?.error?.message;
    return <Text>Error loading profile: {errorMessage}</Text>;
  }

  // Your form submission handler
  const onSubmit = (data: any) => {
    // Handle form submission
  };

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    router.replace("(auth)/sign-in");
  };
  return (
    <SafeAreaView>
      <View className="justify-between h-full">
        <View className="justify-center items-center mt-7">
          <View style={styles.container} className="">
            <Image
              style={styles.image}
              source={profileResult?.avatar_url}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </View>
          <View className="p-3">
            <Text className="font-bold text-2xl">
              {profileResult?.username}
            </Text>
          </View>
          <View className="">
            <Text className="text-lg">{profileResult?.full_name}</Text>
          </View>
          <View className="">
            <Text className="text-lg">{profileResult?.date_of_birth}</Text>
          </View>
          <View className="">
            <Text className="text-lg">{profileResult?.date_of_birth}</Text>
          </View>
          <View className="p-4">
            <Link href="/(profile)/edit">
              <Text className="underline">Edit Profile</Text>
            </Link>
          </View>
        </View>

        <View className="p-4">
          <CustomButton title="Sign Out" handlePress={handleSignout} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  image: {
    flex: 1,
    height: 100,
    width: 100,
    backgroundColor: "#0553",
    borderRadius: 100,
  },
});
