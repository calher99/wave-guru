import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ForecastHourData } from "../../types/forecast";
import { FontAwesome } from "@expo/vector-icons";

const ForecastHour = ({ dataHour }: { dataHour: ForecastHourData }) => {
  console.log(dataHour);

  // Subtracting 133 degrees from dataHour.SWDIR1 value
  const adjustedDegree = dataHour.SWDIR1 + 133;

  return (
    <View style={styles.rootContainer}>
      <View style={styles.hourContainer}>
        <Text style={styles.hour}>{`${dataHour.hour}pm`}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.data}>{dataHour.SWELL1}</Text>
        <Text style={styles.subData}>m</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.data}>10</Text>
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
        <Text>{dataHour.SWDIR1}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text>{dataHour.WINDSPD}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text>{dataHour.WINDDIR}</Text>
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  swellIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
