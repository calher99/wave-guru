import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../constants/styles";

type SettingsRouteProp = RouteProp<
  { params: { selected: string; title: string } },
  "params"
>;

type Option = {
  value: string;
  label: string;
};

const optionsMap: Record<string, Option[]> = {
  speed: [
    { value: "kmph", label: "Km per hour" },
    { value: "knots", label: "Knots" },
    { value: "mph", label: "Miles per hour" },
  ],
  height: [
    { value: "m", label: "Meters" },
    { value: "ft", label: "Feet" },
  ],
  temperature: [
    { value: "celsius", label: "Celsius" },
    { value: "fahrenheit", label: "Fahrenheit" },
  ],
};

const SettingSelectScreen = ({ route }: { route: SettingsRouteProp }) => {
  const { title } = route.params;
  const { setHeight, setSpeed, setTemperature, temperature, height, speed } =
    useUser();

  const options = optionsMap[title] || [];

  let setter: React.Dispatch<React.SetStateAction<string>>;
  let valueSelected: string;
  if (title === "height") {
    setter = setHeight;
    valueSelected = height;
  } else if (title === "speed") {
    setter = setSpeed;
    valueSelected = speed;
  } else if (title === "temperature") {
    setter = setTemperature;
    valueSelected = temperature;
  }

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          android_ripple={{ color: "#ccc" }}
          key={option.value}
          onPress={() => {
            setter && setter(option.value);
          }}
        >
          <Text>{option.label}</Text>
          {valueSelected === option.value && (
            <Feather name="check-circle" size={18} color="green" />
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default SettingSelectScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundLight,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
