import { FlatList, StyleSheet, View } from "react-native";

import { useForecastData } from "../hooks/useForecastData";
import ForecastDay from "../components/ForecastData/ForecastDay";
import ForecastHorizontalDay from "../components/ForecastData/ForecastHorizontalDay";
import { ForecastDayData } from "../types/forecast";

const ForecastMain: React.FunctionComponent = ({ route }) => {
  const place = route.params.placeParam;

  // let cacheFix2: string;

  // if (place.data === 48953) {
  //   cacheFix2 = "38.997x-9.624x9";
  // } else if (place.data === 207059) {
  //   cacheFix2 = "43.565x-4.374x7";
  // } else {
  //   cacheFix2 = "43.565x-4.374x7";
  // }

  // const { data, error } = useForecastData(place, cacheFix2);
  const { data, error } = useForecastData(place);

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ForecastHorizontalDay forecastData={item} />}
        keyExtractor={(dayData) => dayData.id}
        horizontal={true}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <ForecastDay item={item} />}
        keyExtractor={(dayData) => dayData.id}
      />
    </View>
  );
};

export default ForecastMain;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
