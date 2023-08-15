import { View, Text } from "react-native";
import React from "react";
import { ForecastDayData } from "../../types/forecast";

const ForecastHorizontalDay = ({
  forecastData,
}: {
  forecastData: ForecastDayData;
}) => {
  const itemsToPrint = forecastData.data.filter(
    (dataPoint) =>
      dataPoint.hour === 7 || dataPoint.hour === 13 || dataPoint.hour === 19
  );
  console.log(itemsToPrint);
  return (
    <View>
      <Text>ForecastHorizontal</Text>
    </View>
  );
};

export default ForecastHorizontalDay;
