import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Forecast3data, Forecast84data } from "../types/forecast"; // Import from wherever your types file is

const ForecastMain: React.FunctionComponent = () => {
  const dayObjects = {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseWind: AxiosResponse<Forecast3data> = await axios.get(
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

        let initdate = new Date(
          parseInt(responseWind.config.params.initstr.substring(0, 4)),
          parseInt(responseWind.config.params.initstr.substring(4, 6)) - 1,
          parseInt(responseWind.config.params.initstr.substring(6, 8)),
          parseInt(responseWind.config.params.initstr.substring(8, 10))
        );

        // Iterate over the hours array
        for (let i = 0; i < responseWind.data.fcst.hours.length; i++) {
          // Calculate the date for the current timestamp
          let currentDate = new Date(
            initdate.getTime() +
              responseWind.data.fcst.hours[i] * 60 * 60 * 1000
          );

          // Format the date to a string (YYYY-MM-DD)
          let dateStr = currentDate.toISOString().split("T")[0];

          // If the day object for this date doesn't exist yet, create it
          if (!(dateStr in dayObjects)) {
            dayObjects[dateStr] = {};
          }

          // Add the hour and corresponding data to the day object
          dayObjects[dateStr][currentDate.getHours()] = {
            HOUR: currentDate.getHours(),
            WINDDIR: responseWind.data.fcst.WINDDIR[i],
            WINDSPD: responseWind.data.fcst.WINDSPD[i],
            GUST: responseWind.data.fcst.GUST[i],
          };
        }

        const responseWaves: AxiosResponse<Forecast84data> = await axios.get(
          "https://www.windguru.net/int/iapi.php",
          {
            params: {
              q: "forecast",
              id_model: 84,
              rundef: "2023070706x0x240x0x240-2023070700x243x384x249x384",
              initstr: "2023070706",
              id_spot: 38441,
              WGCACHEABLE: 21600,
              cachefix: "38.93x-9.42x38",
            },
          }
        );

        // Iterate over the hours array for responseWaves
        for (let i = 0; i < responseWaves.data.fcst.hours.length; i++) {
          // Calculate the date for the current timestamp
          let currentDate = new Date(
            initdate.getTime() +
              responseWaves.data.fcst.hours[i] * 60 * 60 * 1000
          );

          // Format the date to a string (YYYY-MM-DD)
          let dateStr = currentDate.toISOString().split("T")[0];

          // If the day object for this date doesn't exist yet, create it
          if (!(dateStr in dayObjects)) {
            dayObjects[dateStr] = {};
          }

          // Add the hour and corresponding data to the day object
          if (currentDate.getHours() in dayObjects[dateStr]) {
            dayObjects[dateStr][currentDate.getHours()]["SWDIR1"] =
              responseWaves.data.fcst.SWDIR1[i];
            dayObjects[dateStr][currentDate.getHours()]["SWELL1"] =
              responseWaves.data.fcst.SWELL1[i];
          } else {
            dayObjects[dateStr][currentDate.getHours()] = {
              SWDIR1: responseWaves.data.fcst.SWDIR1[i],
              SWELL1: responseWaves.data.fcst.SWELL1[i],
            };
          }
        }
        console.log(dayObjects);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
