import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { getOwnerTeams } from "../services/teamsService";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomButton from "../component/CustomButton";
import FormField from "../component/FormField";
import DateTimePicker from "@react-native-community/datetimepicker";
import useAuthStore from "../store/authStore";
import { createMatch } from "../services/matchService";
import { router } from "expo-router";
import CustomSelection from "../component/CustomSelection";

type FormData = {
  place: string;
  location: string;
  date: any;
  time: any;
  teamHome: string;
  type: string;
};

const CreateMatchScreen = () => {
  const { session } = useAuthStore();
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const matchType = [
    { label: "5v5", value: "futsal" },
    { label: "11v11", value: "football" },
  ];

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      date: new Date(),
      time: new Date(),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await getOwnerTeams();

        if (data) {
          setData(data);
          console.log(data);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    handleCreateMatch(data);
  };

  const handleCreateMatch = async ({
    place,
    location,
    date,
    time,
    type,
  }: FormData) => {
    try {
      setIsLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const dateFormat = date.toISOString().split("T")[0];

      const timeFormat = time
        .toISOString()
        .split("T")[1]
        .split(":")
        .slice(0, 2)
        .join(":");
      let teamHome = data?.id;

      const res = await createMatch({
        place,
        location,
        dateFormat,
        timeFormat,
        teamHome,
        type,
      });

      if (res.data) {
        console.log("Created Match");
        router.replace("/(match)");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <SafeAreaView>
      <View className="p-4">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              title="Place"
              value={value}
              handleChangeText={onChange}
              otherStyles={"mt-7"}
              onBlur={onBlur}
            />
          )}
          name="place"
        />
        {errors.place && (
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
        {/* Date Picker */}
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <View className="mt-7">
              <Text className="text-base text-black mb-2 font-psemibold">
                Date
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black focus:border-yellow-400 flex flex-row items-center"
              >
                <Text>{value.toDateString()}</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <Modal
                  transparent
                  animationType="slide"
                  visible={showDatePicker}
                  onRequestClose={() => setShowDatePicker(false)}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.9)", // Ensures black overlay works properly
                    }}
                  >
                    <View>
                      <DateTimePicker
                        value={value}
                        mode="date"
                        display={Platform.OS === "ios" ? "inline" : "default"}
                        onChange={(event, selectedDate) => {
                          setShowDatePicker(false);
                          if (selectedDate) {
                            onChange(selectedDate);
                          }
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(false)}
                        className="mt-2 p-2 bg-blue-500 rounded-md"
                      >
                        <Text className="text-white text-center">Done</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              )}
            </View>
          )}
        />
        {/* Time Picker */}
        <Controller
          control={control}
          name="time"
          render={({ field: { onChange, value } }) => (
            <View className="mt-7">
              <Text className="text-base text-black mb-2 font-psemibold">
                Time
              </Text>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black focus:border-yellow-400 flex flex-row items-center"
              >
                <Text>{value.toLocaleTimeString()}</Text>
              </TouchableOpacity>

              {showTimePicker && (
                <Modal
                  transparent
                  animationType="slide"
                  visible={showTimePicker}
                  onRequestClose={() => setShowTimePicker(false)}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Fix for iOS background opacity
                    }}
                  >
                    <View className="bg-white p-4 rounded-lg w-4/5">
                      <DateTimePicker
                        value={value}
                        mode="time"
                        display={Platform.OS === "ios" ? "inline" : "default"}
                        onChange={(event, selectedTime) => {
                          setShowTimePicker(false);
                          if (selectedTime) {
                            onChange(selectedTime);
                          }
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => setShowTimePicker(false)}
                        className="mt-2 p-2 bg-blue-500 rounded-md"
                      >
                        <Text className="text-white text-center">Done</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              )}
            </View>
          )}
        />
        <View className="mt-7">
          <Text className="text-base text-black mb-2 font-psemibold">
            Match type
          </Text>
          <CustomSelection
            control={control}
            name="type"
            options={matchType}
            defaultValue="futsal"
          />
        </View>
      </View>
      <View className="mt-7 p-4">
        <CustomButton handlePress={handleSubmit(onSubmit)} title="Submit" />
      </View>
    </SafeAreaView>
  );
};

export default CreateMatchScreen;

const styles = StyleSheet.create({});
