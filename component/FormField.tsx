import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from "react-native";
import React from "react";

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
  return (
    <View className={`space-y-4 ${otherStyles}`}>
      <Text className="text-base text-gray-100">{title}</Text>
      <View className="w-full h-16 px-4 border-2 border-primary-400 rounded-2xl ">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
