import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../component/FormField";
import CustomButton from "../../component/CustomButton";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleSignup = async () => {
    setIsSubmiting(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    console.log(session);

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setIsSubmiting(false);
  };

  return (
    <SafeAreaView className="bg-secondary-400 h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-2xl font-psemibold">Sign up to Team Up</Text>
          {/* <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles={"mt-7"}
            keyboardType="email-address"
          /> */}
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
            title="Sign up"
            handlePress={handleSignup}
            containerStyle={"mt-7"}
            textStyle={"font-pbold"}
            isLoading={isSubmiting}
          />
          <View className="justify-center items-center flex-row mt-7">
            <Text className="text-lg text-gray-800 font-pregular">
              Already have account? {""}
            </Text>
            <Link href="sign-in">
              <Text className="text-lg text-primary-400 font-psemibold ml-2">
                Sign in
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
