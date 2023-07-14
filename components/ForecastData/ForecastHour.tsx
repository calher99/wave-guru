import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ForecastHourData } from "../../types/forecast";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

const ForecastHour = ({ dataHour }: { dataHour: ForecastHourData }) => {
  // Subtracting 133 degrees from dataHour.SWDIR1 value
  const adjustedDegree = dataHour.SWELLDIR + 133;

  // Convert knots to km/h
  const windSpdKmh = Math.round(dataHour.WINDSPD * 1.852);
  const gustKmh = Math.round(dataHour.GUST * 1.852);

  const getWindSpeedColor = (windSpeed: number) => {
    if (windSpeed <= 10) {
      return Colors.strength0;
    } else if (windSpeed <= 15) {
      return Colors.strength10;
    } else if (windSpeed <= 20) {
      return Colors.strength15;
    } else if (windSpeed <= 25) {
      return Colors.strength20;
    } else if (windSpeed <= 30) {
      return Colors.strength25;
    } else if (windSpeed <= 35) {
      return Colors.strength30;
    } else if (windSpeed <= 40) {
      return Colors.strength35;
    } else if (windSpeed <= 45) {
      return Colors.strength40;
    } else if (windSpeed <= 50) {
      return Colors.strength45;
    } else if (windSpeed <= 55) {
      return Colors.strength50;
    } else if (windSpeed <= 60) {
      return Colors.strength55;
    } else {
      return Colors.strength60;
    }
  };

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
        <View style={styles.degrees}>
          <Text style={styles.subData}>{dataHour.SWELLDIR}</Text>
          <Text style={styles.subData}>º</Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.windContainer}>
          <View style={styles.wind}>
            <Text style={styles.bigData}>{windSpdKmh}</Text>
          </View>
          <View style={styles.windGust}>
            <Text style={styles.subData}>{gustKmh}</Text>
            <Text style={styles.smallData}>km/h</Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.windDirectionContainer,
          { backgroundColor: getWindSpeedColor(windSpdKmh) },
        ]}
      >
        <Foundation
          name="arrow-down"
          size={24}
          color="black"
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundDark,
  },
  hourContainer: {
    padding: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundDark,
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundDark,
  },
  swellIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  degrees: {
    flexDirection: "row",
  },
  windContainer: {
    flexDirection: "row",
    gap: 2,
  },
  bigData: {
    fontSize: 20,
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
    // backgroundColor: "#3F9B0B",
  },
  windDirText: {
    fontSize: 12,
    color: "black",
  },
});
