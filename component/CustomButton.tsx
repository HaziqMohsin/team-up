import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { verifyInstallation } from "nativewind";

type Props = {
  title: string;
  handlePress: () => void;
  containerStyle?: any;
  textStyle?: any;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className={`bg-primary-400 rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text
        className={`text-secondary-400 font-psemibold text-lg ${textStyle}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
