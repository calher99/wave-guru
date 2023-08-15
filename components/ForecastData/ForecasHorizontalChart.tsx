import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ForecastHourData } from "../../types/forecast";
import { Colors } from "../../constants/styles";

const ForecasHorizontalChart = ({
  dataPoints,
}: {
  dataPoints: ForecastHourData[];
}) => {
  // Calculate the min and max SWELLHGT values from dataPoints
  const rawMinHeight = Math.min(...dataPoints.map((item) => item.SWELLHGT));
  const rawMaxHeight = Math.max(...dataPoints.map((item) => item.SWELLHGT));

  const minHeight = parseFloat(rawMinHeight.toFixed(1));
  const maxHeight = parseFloat(rawMaxHeight.toFixed(1));

  // Function to compute the height of each bar based on the SWELLHGT value
  const computeHeight = (swellHeight: number) => {
    if (swellHeight >= 3) {
      return 40;
    }
    // Proportional height calculation
    return (40 * swellHeight) / 3;
  };

  return (
    <View style={styles.container}>
      <View style={styles.barChartContainer}>
        {dataPoints.map((item) => (
          <View
            key={item.id}
            style={[styles.barChart, { height: computeHeight(item.SWELLHGT) }]}
          ></View>
        ))}
      </View>
      <View style={styles.heightInfo}>
        <Text style={styles.heightInfoText}>
          {minHeight}-{maxHeight}
        </Text>
      </View>
    </View>
  );
};

export default ForecasHorizontalChart;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  barChartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 1,
    height: 40,
  },
  barChart: {
    width: 10,
    backgroundColor: Colors.logo,
  },
  heightInfo: {
    backgroundColor: Colors.logo,
    width: 45,
    height: 45,
    paddingTop: 2,
    paddingBottom: 2,
    borderTopColor: "white",
    borderTopWidth: 1,
  },
  heightInfoText: {
    color: "white",
    fontSize: 12,
  },
});
