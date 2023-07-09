import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Forecast3data, Forecast84data } from "../types/forecast"; // Import from wherever your types file is
import { useForecastData } from "../hooks/useForecastData";

const ForecastMain: React.FunctionComponent = () => {
  const { data, error } = useForecastData();

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
    </View>
  );
};

export default ForecastMain;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
