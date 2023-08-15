import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ForecastDayData } from "../../types/forecast";
import ForecasHorizontalChart from "./ForecasHorizontalChart";
import { Colors } from "../../constants/styles";

const ForecastHorizontalDay = ({
  forecastData,
}: {
  forecastData: ForecastDayData;
}) => {
  let dateObject = new Date(forecastData.date); // Create a date object from the string
  // Get the name of the weekday
  let weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = weekday[dateObject.getDay()]; // This will give you the day of the week
  let dayDate = dateObject.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  });
  const itemsToPrint = forecastData.data.filter(
    (dataPoint) =>
      dataPoint.hour === 7 || dataPoint.hour === 13 || dataPoint.hour === 19
  );

  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day}</Text>
      <Text>{dayDate}</Text>
      <ForecasHorizontalChart dataPoints={itemsToPrint} />
    </View>
  );
};

export default ForecastHorizontalDay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 45,
    borderRightWidth: 1,
    borderRightColor: Colors.backgroundDark,
    alignItems: "center",
  },
  day: {
    fontWeight: "bold",
  },
});
