import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Forecast3data, Forecast84data } from "../types/forecast";

export const useForecastData = () => {
  const [data, setData] = useState<any>(null); // replace any with the correct type if you have one
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const dayObjects = {};

      try {
        const responseWind: AxiosResponse<Forecast3data> = await axios.get(
          "https://www.windguru.net/int/iapi.php",
          {
            params: {
              q: "forecast",
              id_model: "3",
              rundef: "2023070912x0x240x0x240-2023070912x243x384x243x384",
              initstr: "2023070912",
              id_spot: "38441",
              WGCACHEABLE: "21600",
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
          //Calculate the date for the current timestamp
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

        //Iterate over the hours array
        const responseWaves: AxiosResponse<Forecast84data> = await axios.get(
          "https://www.windguru.net/int/iapi.php",
          {
            params: {
              q: "forecast",
              id_model: "84",
              rundef: "2023070912x0x240x0x240-2023070912x243x384x243x384",
              initstr: "2023070912",
              id_spot: "38441",
              WGCACHEABLE: "21600",
              cachefix: "38.93x-9.42x38",
            },
          }
        );
        // console.log(responseWaves.data.fcst.hours);
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

        setData(dayObjects); // set the state
      } catch (error: any) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};
