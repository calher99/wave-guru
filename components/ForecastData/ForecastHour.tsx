import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ForecastHourData } from "../../types/forecast";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

const ForecastHour = ({ dataHour }: { dataHour: ForecastHourData }) => {
  // Subtracting 133 degrees from dataHour.SWDIR1 value
  const adjustedDegree = dataHour.SWELLDIR + 133;

  return (
    <View style={styles.rootContainer}>
      <View style={styles.hourContainer}>
        <Text style={styles.hour}>{`${dataHour.hour}pm`}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.data}>{dataHour.SWELLHGT}</Text>
        <Text style={styles.subData}>m</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.data}>{dataHour.SWELLPER}</Text>
        <Text style={styles.subData}>s</Text>
      </View>
      <View style={styles.swellDirectionContainer}>
        <View style={styles.swellIconContainer}>
          <FontAwesome
            name="location-arrow"
            size={20}
            color="black"
            style={{
              padding: 4,
              transform: [{ rotate: `${adjustedDegree}deg` }],
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
        <Text>{dataHour.SWELLDIR}</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.windContainer}>
          <View style={styles.wind}>
            <Text style={styles.bigData}>{dataHour.WINDSPD}</Text>
          </View>
          <View style={styles.windGust}>
            <Text style={styles.subData}>{dataHour.GUST}</Text>
            <Text style={styles.smallData}>knots</Text>
          </View>
        </View>
      </View>
      <View style={styles.windDirectionContainer}>
        <Foundation
          name="arrow-down"
          size={24}
          color="white"
          style={{
            padding: 4,
            transform: [{ rotate: `${dataHour.WINDDIR}deg` }],
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <Text style={styles.windDirText}>{dataHour.WINDDIR}</Text>
      </View>
    </View>
  );
};

export default ForecastHour;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: "row",
  },
  subContainer: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 4,
    paddingRight: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  hourContainer: {
    padding: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hour: {
    fontSize: 11,
    transform: [{ rotate: "-90deg" }],
    textAlign: "center",
  },
  data: {
    fontSize: 15,
    fontFamily: "System",
    fontWeight: "700",
  },
  subData: {
    fontSize: 12,
  },
  swellDirectionContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  swellIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  windContainer: {
    flexDirection: "row",
    gap: 2,
  },
  bigData: {
    fontSize: 17,
    fontFamily: "System",
    fontWeight: "700",
  },
  smallData: {
    fontSize: 9,
  },
  wind: {
    alignItems: "center",
    justifyContent: "center",
  },
  windGust: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  windDirectionContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#3F9B0B",
  },
  windDirText: {
    fontSize: 12,
    color: "white",
  },
});
