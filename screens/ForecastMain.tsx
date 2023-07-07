import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ForecastData } from "../types/forecast"; // Import from wherever your types file is

const ForecastMain: React.FunctionComponent = () => {
  //Get data from API
  const fetchData = async () => {
    try {
      const response: AxiosResponse<ForecastData> = await axios.get(
        "https://www.windguru.net/int/iapi.php",
        {
          params: {
            q: "forecast",
            id_model: 3,
            rundef: "2023070706x0x240x0x240-2023070700x243x384x249x384",
            initstr: "2023070706",
            id_spot: 38441,
            WGCACHEABLE: 21600,
            cachefix: "38.93x-9.42x38",
          },
        }
      );

      console.log(response.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Process data

  //ForecastHorizontal
  //ForecastDayHorizontal

  //ForecastDay
  //ForecastHourx3 (6am Noon 6pm)
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
