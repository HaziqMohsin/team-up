import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { Controller, Control } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  control: Control<any>;
  name: string;
  options: Option[];
  defaultValue?: string;
}

const CustomSelection = ({
  control,
  name,
  options,
  defaultValue,
}: CustomSelectProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        const selectedOption = options.find((opt) => opt.value === value);

        return (
          <View className="mb-4">
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black focus:border-yellow-400 flex flex-row items-center"
            >
              <Text className="text-base text-gray-800">
                {selectedOption?.label || "Select an option..."}
              </Text>
            </TouchableOpacity>

            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}
            >
              <View className="flex-1 justify-center bg-black/50">
                <View className="mx-4 bg-white rounded-lg p-4">
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          onChange(item.value);
                          setModalVisible(false);
                        }}
                        className={`p-3 ${
                          value === item.value ? "bg-blue-50" : ""
                        }`}
                      >
                        <Text className="text-base text-gray-800">
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                      <View className="h-px bg-gray-200" />
                    )}
                  />
                </View>
              </View>
            </Modal>
          </View>
        );
      }}
    />
  );
};

export default CustomSelection;
