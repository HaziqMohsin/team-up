import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Auth from "../component/Auth";
import Account from "../component/Account";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Session } from "@supabase/supabase-js";
import { StatusBar } from "expo-status-bar";
import { router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../component/CustomButton";
import { Link } from "expo-router";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (session && session.user) {
    return router.replace("/home");
  }

  if (!session) {
    return (
      <SafeAreaView className="bg-secondary-400 h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full  justify-center items-center min-h-[85vh] px-4 gap-8 ">
            <Text className="text-3xl font-pextrabold">Welcome to Team Up</Text>
            <CustomButton
              title="Custom button"
              handlePress={() => router.push("/sign-in")}
              containerStyle={"w-full mt-1"}
            />
          </View>
        </ScrollView>
        {/* <StatusBar backgroundColor="#00FF66" style="auto" /> */}
      </SafeAreaView>
    );
  }
}
