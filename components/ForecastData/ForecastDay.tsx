import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { ForecastDayData } from "../../types/forecast";
import { Colors } from "../../constants/styles";
import ForecastHour from "./ForecastHour";
import { useNavigation } from "@react-navigation/native";

const ForecastDay = ({ item }: { item: ForecastDayData }) => {
  const navigation = useNavigation();
  let dateObject = new Date(item.date); // Create a date object from the string
  // Get the name of the weekday
  let weekday = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  let day = weekday[dateObject.getDay()]; // This will give you the day of the week

  // Get the date in the format MM/DD
  let dayDate = dateObject.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  });
  const itemsToPrint = item.data.filter(
    (dataPoint) =>
      dataPoint.hour === 7 || dataPoint.hour === 13 || dataPoint.hour === 19
  );
  return (
    <View style={styles.rootContainer}>
      <View style={styles.date}>
        <Text style={styles.day}>{day}</Text>
        <Text>{dayDate}</Text>
      </View>
      <View>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            pressed ? styles.buttonPressed : null, //Style is only applied when pressed
          ]}
          onPress={() => {
            navigation.navigate("ForecastDetail", {
              forecastData: item,
              day: day,
              dayDate: dayDate,
            });
          }}
        >
          {itemsToPrint.map((dataHour) => (
            <ForecastHour dataHour={dataHour} key={dataHour.id} />
          ))}
        </Pressable>
      </View>
    </View>
  );
};

export default ForecastDay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // alignItems: "flex-start",
  },
  date: {
    flex: 1,
    flexDirection: "row",
    padding: 2,
    backgroundColor: Colors.backgroundDark,
    alignItems: "center",
  },
  day: {
    fontFamily: "System",
    fontWeight: "700",
    padding: 3,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
