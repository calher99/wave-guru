import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { ForecastDayData } from "../types/forecast";
import { Colors } from "../constants/styles";

import ForecastHour from "../components/ForecastData/ForecastHour";

type ForecastRouteProp = RouteProp<
  { params: { forecastData: ForecastDayData; day: string; dayDate: string } },
  "params"
>;

const ForecastDetail = ({ route }: { route: ForecastRouteProp }) => {
  const { forecastData, day, dayDate } = route.params;

  return (
    <View style={styles.rootContainer}>
      <View style={styles.date}>
        <Text style={styles.day}>{day}</Text>
        <Text>{dayDate}</Text>
      </View>
      <FlatList
        data={forecastData.data}
        renderItem={({ item }) => <ForecastHour dataHour={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ForecastDetail;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // alignItems: "flex-start",
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
  buttonPressed: {
    opacity: 0.5,
  },
});
