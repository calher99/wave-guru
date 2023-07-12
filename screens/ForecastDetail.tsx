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
      <View style={styles.info}>
        <View style={styles.tideGraphContainer}></View>
        <View style={styles.infoTable}>
          {forecastData.tides && (
            <View style={styles.tideInfo}>
              <View style={styles.tidePoint}>
                {forecastData.tides?.height1 > 0 ? (
                  <Text>High</Text>
                ) : (
                  <Text>Low</Text>
                )}
                <Text>
                  {forecastData.tides?.tide1Date.split("T")[1].substring(0, 5)}
                </Text>
                <Text>{forecastData.tides?.height1.toFixed(2)}m</Text>
              </View>
              <View style={styles.tidePoint}>
                {forecastData.tides?.height2 > 0 ? (
                  <Text>High</Text>
                ) : (
                  <Text>Low</Text>
                )}
                <Text>
                  {forecastData.tides?.tide2Date.split("T")[1].substring(0, 5)}
                </Text>
                <Text>{forecastData.tides?.height2.toFixed(2)}m</Text>
              </View>
              <View style={styles.tidePoint}>
                {forecastData.tides?.height3 > 0 ? (
                  <Text>High</Text>
                ) : (
                  <Text>Low</Text>
                )}
                <Text>
                  {forecastData.tides?.tide3Date.split("T")[1].substring(0, 5)}
                </Text>
                <Text>{forecastData.tides?.height3.toFixed(2)}m</Text>
              </View>
              <View style={styles.tidePoint}>
                {forecastData.tides?.height4 > 0 ? (
                  <Text>High</Text>
                ) : (
                  <Text>Low</Text>
                )}
                <Text>
                  {forecastData.tides?.tide4Date.split("T")[1].substring(0, 5)}
                </Text>
                <Text>{forecastData.tides?.height4.toFixed(2)}m</Text>
              </View>
            </View>
          )}
          <View>
            <Text>Sunrise</Text>
            <Text>Sunset</Text>
            <Text>Water Temp</Text>
            <Text>Exterior Temp</Text>
          </View>
        </View>
      </View>
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
  info: {},
  tideGraphContainer: {
    height: 100,
    backgroundColor: "black",
  },
  infoTable: {
    flexDirection: "row",
    gap: 20,
  },
  tideInfo: {},
  tidePoint: {
    flexDirection: "row",
    gap: 13,
  },
});
