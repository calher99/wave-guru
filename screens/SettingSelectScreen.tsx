import { View, Text, Pressable } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

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
    <View style={{ padding: 16 }}>
      {options.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => {
            console.log(option.value);
            setter && setter(option.value);
          }}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 8,
          }}
        >
          <Text>{option.label}</Text>
          {valueSelected === option.value && <Text>✓</Text>}
        </Pressable>
      ))}
    </View>
  );
};

export default SettingSelectScreen;
