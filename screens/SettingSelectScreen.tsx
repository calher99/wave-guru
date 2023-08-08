import { View, Text, Pressable } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";

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
  const { selected, title } = route.params;
  const options = optionsMap[title] || [];

  return (
    <View style={{ padding: 16 }}>
      {options.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => console.log("Selected:", option.value)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 8,
          }}
        >
          <Text>{option.label}</Text>
          {selected === option.value && <Text>✓</Text>}
        </Pressable>
      ))}
    </View>
  );
};

export default SettingSelectScreen;
