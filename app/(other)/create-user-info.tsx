import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import FormField from "../../component/FormField";
import CustomButton from "../../component/CustomButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as Calendar from "expo-calendar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import uuid from "react-native-uuid";

const CreateUserInfo = () => {
  type FormData2 = {
    username: string;
    fullname: string;
    dob: string;
    position: string[];
    preferredFoot: string;
    skillLevel: string;
  };

  type FormData = {
    firstName: string;
    lastName: string;
  };

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData2>();

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedFoot, setSelectedFoot] = useState();
  const [showFootMenu, setShowFootMenu] = useState(false);
  const [isSubmitLoading, setisSubmitLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const onSubmit: SubmitHandler<FormData2> = async (data) => {
    console.log(data);
    console.log("haii");
    setisSubmitLoading(true);
    createProfile(data);
  };
  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setValue("dob", currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    console.log("hhihi");
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleMenuFoot = () => {
    setShowFootMenu(true);
  };

  const createProfile = async ({
    username,
    fullname,
    dob,
    position,
    preferredFoot,
    skillLevel,
  }: FormData2) => {
    try {
      setisSubmitLoading(true);
      if (!session?.user) throw new Error("No user on the session!");
      const updates = {
        id: session?.user.id,
        username,
        full_name: fullname,
        date_of_birth: dob,
        updated_at: new Date(),
      };

      const createFootballDetails = {
        profile_id: session?.user.id,
        position,
        preferred_foot: "Leftrr",
        skill_level: "Beginner",
      };

      const { error: errorCreate } = await supabase
        .from("football-details")
        .insert(createFootballDetails);
      const { error } = await supabase.from("profiles").upsert(updates);

      if (error || errorCreate) {
        console.log("error", error);
        console.log("errorCreate", errorCreate);
        throw error;
      }

      router.replace("/home");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setisSubmitLoading(false);
    }
  };

  return (
    <View className="h-full bg-secondary-400 p-4">
      <View
        className="w-full justify-center items-center h-7
       px-4 my-6"
      >
        <Text className="font-bold text-xl underline">Enter your details</Text>
      </View>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              title="Username"
              value={value}
              handleChangeText={onChange}
              otherStyles={"mt-7"}
              onBlur={onBlur}
            />
          )}
          name="username"
        />
        {errors.username && (
          <Text className="text-red-500">This is required.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              title="Full Name"
              value={value}
              handleChangeText={onChange}
              otherStyles={"mt-7"}
              onBlur={onBlur}
            />
          )}
          name="fullname"
        />
        {errors.fullname && (
          <Text className="text-red-500">This is required.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="space-y-4 mt-7">
              <Text className="text-base text-black mb-2 font-psemibold">
                Date of Birth
              </Text>
              <TouchableOpacity
                onPress={showDatepicker}
                activeOpacity={1}
                className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black focus:border-yellow-400 flex flex-row items-center"
              >
                <Text>
                  {value ? new Date(value).toLocaleDateString() : "Select BOD"}
                </Text>
              </TouchableOpacity>
              {/* <Button title="Pick a date" onPress={showDatepicker} /> */}
              {show && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShow(false);
                    if (selectedDate) {
                      onChange(selectedDate.toISOString());
                    }
                  }}
                />
              )}
            </View>
          )}
          name="dob"
        />
        {errors.dob && <Text className="text-red-500">This is required.</Text>}
        <Controller
          control={control}
          name="position"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View className="space-y-4 mt-7">
              <Text className="text-base text-black mb-2 font-psemibold">
                Position(s)
              </Text>
              {["Goalkeeper", "Defender", "Midfielder", "Forward"].map(
                (position) => (
                  <TouchableOpacity
                    key={position}
                    onPress={() => {
                      // Toggle the position in the array
                      const newValue = value?.includes(position)
                        ? value.filter((item) => item !== position)
                        : [...(value || []), position];
                      onChange(newValue);
                    }}
                    activeOpacity={0.7}
                    className="flex flex-row items-center space-x-3 gap-2 mb-1"
                  >
                    <View
                      className={`w-6 h-6 rounded-full border-2 ${
                        value?.includes(position)
                          ? "bg-primary-400"
                          : "bg-gray-200"
                      }`}
                    />
                    <Text className="text-black">{position}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          )}
        />
        {errors.position && (
          <Text className="text-red-500">
            At least one position is required.
          </Text>
        )}

        {/* <Controller
          control={control}
          name="preferredFoot"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={(val) => {
                onChange(val); // Update the field value in React Hook Form
                setValue("preferredFoot", val); // Update manually (not mandatory but helpful)
              }}
              items={[
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
                { label: "Both", value: "both" },
              ]}
              placeholder={{ label: "Select Preferred Foot", value: null }}
              value={value} // Controlled value
            />
          )}
        />
        {errors.preferredFoot && (
          <Text className="text-red-500">
            At least one position is required.
          </Text>
        )} */}
        {/* <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            onChange={onChangeDate}
          />
        )} */}

        <View className="mt-7">
          <CustomButton handlePress={handleSubmit(onSubmit)} title="Submit" />
        </View>
      </View>
    </View>
  );
};

export default CreateUserInfo;

const styles = StyleSheet.create({});
