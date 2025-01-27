import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

type Props = TextInputProps & {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: any) => void;
  otherStyles?: any;
};

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-4 ${otherStyles}`}>
      <Text className="text-base text-black mb-2 font-psemibold">{title}</Text>
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black focus:border-yellow-400 flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-base "
          value={value}
          onChangeText={handleChangeText}
          {...props}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
