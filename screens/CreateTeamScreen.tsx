import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../component/CustomButton";
import FormField from "../component/FormField";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";

type FormData = {
  teamName: string;
  location: string;
};

const CreateTeamScreen = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isSubmitLoading, setisSubmitLoading] = useState(false);
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    createTeam(data);
  };

  const createTeam = async ({ teamName, location }: FormData) => {
    try {
      setisSubmitLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const create = {
        name: teamName,
        location,
      };

      const { data, error } = await supabase
        .from("teams")
        .insert(create)
        .select();

      if (error) {
        console.log("error", error);

        throw error;
      }

      router.replace("/(team)");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setisSubmitLoading(false);
    }
  };

  return (
    <SafeAreaView className="p-4">
      <View className="p-4">
        <View className="">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title="Team Name"
                value={value}
                handleChangeText={onChange}
                otherStyles={"mt-7"}
                onBlur={onBlur}
              />
            )}
            name="teamName"
          />
          {errors.teamName && (
            <Text className="text-red-500">This is required.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title="Location"
                value={value}
                handleChangeText={onChange}
                otherStyles={"mt-7"}
                onBlur={onBlur}
              />
            )}
            name="location"
          />
          {errors.location && (
            <Text className="text-red-500">This is required.</Text>
          )}
        </View>
        <View className="mt-7">
          <CustomButton handlePress={handleSubmit(onSubmit)} title="Submit" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateTeamScreen;

const styles = StyleSheet.create({});
