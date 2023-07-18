import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

interface SettingsProps {
  text: string;
  onHandlePress: () => void;
}

const SettingType = ({ text, onHandlePress }: SettingsProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.settingContainer,
        pressed ? styles.buttonPressed : null, //Style is only applied when pressed
      ]}
      android_ripple={{ color: "#ccc" }}
      onPress={onHandlePress}
    >
      <View style={styles.settingText}>
        <Text>{text}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </Pressable>
  );
};

export default SettingType;

const styles = StyleSheet.create({
  settingContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundLight,
  },
  settingText: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
