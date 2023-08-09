import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

interface SettingsProps {
  text: string;
  selectedOption?: string;
  onHandlePress: () => void;
}

const SettingType = ({
  text,
  onHandlePress,
  selectedOption,
}: SettingsProps) => {
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
      {selectedOption && (
        <View>
          <Text style={styles.selectedText}>{selectedOption}</Text>
        </View>
      )}
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
    paddingBottom: 2,
    paddingTop: 2,
    gap: 2,
    paddingLeft: 10,
  },
  settingText: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  selectedText: {
    color: Colors.backgroundDarker,
  },
});
