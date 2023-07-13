import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { ForecastDayData } from "../types/forecast";
import { Colors } from "../constants/styles";

import ForecastHour from "../components/ForecastData/ForecastHour";
import TideGraph from "../components/graphs/TideGraph";

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
        <View style={styles.tideGraphContainer}>
          <TideGraph tideData={forecastData.tides} />
        </View>
        <View style={styles.infoTable}>
          <View style={styles.tideInfo}>
            {forecastData.tides?.map((tidePoint) => (
              <View style={styles.tidePoint} key={tidePoint.height}>
                {tidePoint.height > 0 ? <Text>High</Text> : <Text>Low</Text>}
                <Text style={styles.subText}>
                  {tidePoint.tideDate.split("T")[1].substring(0, 5)}
                </Text>
                <Text style={styles.subText}>
                  {tidePoint.height.toFixed(2)}m
                </Text>
              </View>
            ))}
          </View>
          <View>
            <View style={styles.tidePoint}>
              <Text>Sunrise</Text>
              <Text style={styles.subText}>6</Text>
            </View>
            <View style={styles.tidePoint}>
              <Text>Sunset</Text>
              <Text style={styles.subText}>22</Text>
            </View>
            <View style={styles.tidePoint}>
              <Text>Water Temp</Text>
              <Text style={styles.subText}>{forecastData.data[3].WATEMP}</Text>
            </View>
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
    height: 130,
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
  subText: {
    color: "grey",
  },
});
