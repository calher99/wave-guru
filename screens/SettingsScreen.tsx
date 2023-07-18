import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/styles";
import SettingType from "../components/ui/SettingType";

const SettingsScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.settingsBlock}>
        <View style={styles.settingsBlockText}>
          <Text>ACCOUNT</Text>
        </View>
        <SettingType
          text="Sign Out"
          onHandlePress={() => {
            console.log("sign Out");
          }}
        />
        <SettingType
          text="Delete Account"
          onHandlePress={() => {
            console.log("delete Account");
          }}
        />
      </View>
      <View style={styles.settingsBlock}>
        <View style={styles.settingsBlockText}>
          <Text>UNITS</Text>
        </View>
        <SettingType
          text="Speed"
          onHandlePress={() => {
            console.log("sign Out");
          }}
        />
        <SettingType
          text="Height"
          onHandlePress={() => {
            console.log("sign Out");
          }}
        />
        <SettingType
          text="Temperature"
          onHandlePress={() => {
            console.log("sign Out");
          }}
        />
      </View>
      <View style={styles.settingsBlock}>
        <View style={styles.settingsBlockText}>
          <Text>ABOUT</Text>
        </View>
        <SettingType
          text="Version"
          onHandlePress={() => {
            console.log("sign Out");
          }}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  settingsBlock: {},
  settingsBlockText: {
    height: 30,
    justifyContent: "center",
  },
  settingContainer: {
    flexDirection: "row",
    backgroundColor: "white",
  },
});
