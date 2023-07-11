import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ForecastDayData } from "../../types/forecast";
import { Colors } from "../../constants/styles";
import ForecastHour from "./ForecastHour";

const ForecastDay = ({ item }: { item: ForecastDayData }) => {
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
  let indexToExtract = [6, 12, 18];
  if (item.data.length === 24) {
    indexToExtract = [7, 4, 6];
  } else if (item.data.length === 24) {
    indexToExtract = [6, 8, 10];
  } else {
    indexToExtract = [2, 4, 6];
  }
  // console.log(item);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.date}>
        <Text style={styles.day}>{day}</Text>
        <Text>{dayDate}</Text>
      </View>
      <View>
        <ForecastHour dataHour={item.data[indexToExtract[0]]} />
        <ForecastHour dataHour={item.data[indexToExtract[1]]} />
        <ForecastHour dataHour={item.data[indexToExtract[2]]} />
      </View>
    </View>
  );
};

export default ForecastDay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  date: {
    flex: 1,
    flexDirection: "row",
    padding: 2,
    backgroundColor: Colors.grey,
    alignItems: "center",
  },
  day: {
    fontFamily: "System",
    fontWeight: "700",
    padding: 3,
  },
});
