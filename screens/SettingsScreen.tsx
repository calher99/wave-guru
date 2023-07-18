import { View, Text, StyleSheet } from "react-native";
import React from "react";

const SettingsScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Text>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
