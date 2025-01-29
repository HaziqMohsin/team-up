import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../component/FormField";
import CustomButton from "../../component/CustomButton";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleSignInWithEmail = async () => {
    console.log("sign in with email");
    setIsSubmiting(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    const isfirstTime = await checkIfFirstTimeUser(data?.user?.id);

    console.log("data", data);
    if (isfirstTime) {
      router.replace("/create-user-info");
    } else {
      router.replace("/home");
    }
    setIsSubmiting(false);

    if (error) {
      alert(error.message);
    }
  };

  const checkIfFirstTimeUser = async (id: string | undefined) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", id)
      .single();

    if (!data?.username) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <SafeAreaView className="bg-secondary-400 h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-2xl font-psemibold">Log in to Team Up</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles={"mt-7"}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles={"mt-7"}
          />
          <CustomButton
            title="Sign in"
            handlePress={handleSignInWithEmail}
            containerStyle={"mt-7"}
            textStyle={"font-pbold"}
            isLoading={isSubmiting}
          />
          <View className="justify-center items-center flex-row mt-7">
            <Text className="text-lg text-gray-800 font-pregular">
              Don't have account? {""}
            </Text>
            <Link href="sign-up">
              <Text className="text-lg text-primary-400 font-psemibold ml-2">
                Sign up
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
