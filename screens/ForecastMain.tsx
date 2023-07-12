import { FlatList, StyleSheet, View } from "react-native";

import { useForecastData } from "../hooks/useForecastData";
import ForecastDay from "../components/ForecastData/ForecastDay";

const ForecastMain: React.FunctionComponent = () => {
  const { data, error } = useForecastData();
  console.log("DATA IN THE MAIN", data);
  return (
    <View style={styles.rootContainer}>
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
