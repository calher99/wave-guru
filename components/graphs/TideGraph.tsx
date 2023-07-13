import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { TidePoint } from "../../types/forecast";

const screenWidth = Dimensions.get("window").width;

const TideGraph = ({ tideData }: { tideData: TidePoint[] }) => {
  // Initialize an array of hours for the entire day and an empty array for the tide heights
  // function interpolateTide(tideData: TidePoint[]) {
  //   let results = {};
  //   const timesToInterpolate = [3, 6, 9, 12, 15, 18, 21]; // requested times
  //   tideData.forEach((data, index, array) => {
  //     if (index === array.length - 1) return;
  //     let currentTime = new Date(data.tideDate);
  //     let nextTime = new Date(array[index + 1].tideDate);
  //     let currentHeight = data.height;
  //     let nextHeight = array[index + 1].height;
  //     timesToInterpolate.forEach((time) => {
  //       if (time > currentTime.getHours() && time <= nextTime.getHours()) {
  //         // linear interpolation formula:
  //         // y = y0 + (x - x0) * (y1 - y0) / (x1 - x0)
  //         let interpolatedHeight =
  //           currentHeight +
  //           ((time - currentTime.getHours()) * (nextHeight - currentHeight)) /
  //             (nextTime.getHours() - currentTime.getHours());
  //         results[time] = interpolatedHeight;
  //       }
  //     });
  //   });
  //   return results;
  // }

  // let interpolatedTides = interpolateTide(tideData);
  // console.log(interpolatedTides);

  // Chart configuration

  const dataPoints = tideData.map((dataPoint) => dataPoint.height);
  const hours = tideData.map((dataPoint) =>
    dataPoint.tideDate.split("T")[1].substring(0, 5)
  );

  console.log(dataPoints);
  console.log(hours);
  return (
    <LineChart
      data={{
        labels: hours,
        datasets: [
          {
            data: dataPoints,
          },
        ],
      }}
      width={screenWidth}
      height={130}
      chartConfig={{
        backgroundColor: "#000000", // black
        backgroundGradientFrom: "#000000", // black
        backgroundGradientTo: "#0000FF", // blue
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // white with variable opacity
        labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`, // grey with variable opacity
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#0000FF", // blue
        },
      }}
      bezier
    />
  );
};

export default TideGraph;
