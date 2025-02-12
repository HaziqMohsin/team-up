import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";
import CustomButton from "../component/CustomButton";
import Account from "../component/Account";
import { Session } from "@supabase/supabase-js";

const ProfileScreen = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    router.replace("(auth)/sign-in");
  };
  return (
    <SafeAreaView>
      <View>
        {session && session.user && (
          <Account key={session.user.id} session={session} />
        )}
      </View>
      <View className="p-4">
        <CustomButton title="Sign Out" handlePress={handleSignout} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
