import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Forecast3data,
  Forecast84data,
  ForecastDayData,
} from "../types/forecast";
import uuid from "react-native-uuid";

export const useForecastData = () => {
  const [data, setData] = useState<ForecastDayData[] | null>(null); // replace any with the correct type if you have one
  const [error, setError] = useState<Error | null>(null);
  let dayArray: Array<{ date: string; id: any; data: any[] }> = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize an array to hold the final results

        const responseWind: AxiosResponse<Forecast3data> = await axios.get(
          "https://www.windguru.net/int/iapi.php",
          {
            params: {
              q: "forecast",
              id_model: 3,
              rundef: "2023071100x0x240x0x240-2023071100x243x384x243x384",
              initstr: "2023071100",
              id_spot: 38441,
              WGCACHEABLE: 21600,
              cachefix: "38.93x-9.42x38",
            },
          }
        );

        //Set initial Date
        console.log("Date coming from API", responseWind.data);
        // const initdate = new Date(responseWind.data.fcst.initdate);

        let initdateString = responseWind.data.fcst.initdate; // "2023-07-10 00:00:00"
        let parts = initdateString.split(/[- :]/);
        let initdate = new Date(
          Date.UTC(
            parseInt(parts[0]),
            parseInt(parts[1]) - 1,
            parseInt(parts[2]),
            parseInt(parts[3]),
            parseInt(parts[4]),
            parseInt(parts[5])
          )
        );
        // console.log("Date transformed", initdate);
        // Iterate over the hours array
        for (let i = 0; i < responseWind.data.fcst.hours.length; i++) {
          // Calculate the date for the current timestamp
          let currentDate = new Date(
            initdate.getTime() +
              responseWind.data.fcst.hours[i] * 60 * 60 * 1000
          );

          // Format the date to a string (YYYY-MM-DD)
          let dateStr = currentDate.toISOString().split("T")[0];

          let foundDay = dayArray.find((e) => e.date === dateStr);
          // If the day object for this date doesn't exist yet, create it

          if (!foundDay) {
            foundDay = { date: dateStr, id: uuid.v4(), data: [] };
            dayArray.push(foundDay);
          }

          // Add the hour and corresponding data to the day object
          foundDay.data.push({
            id: uuid.v4(),
            hour: currentDate.getHours(),
            WINDDIR: responseWind.data.fcst.WINDDIR[i],
            WINDSPD: responseWind.data.fcst.WINDSPD[i],
            GUST: responseWind.data.fcst.GUST[i],
          });
        }

        const responseWaves: AxiosResponse<Forecast84data> = await axios.get(
          "https://www.windguru.net/int/iapi.php",
          {
            params: {
              q: "forecast",
              id_model: "84",
              rundef: "2023071100x0x240x0x240-2023071100x243x384x243x384",
              initstr: "2023071100",
              id_spot: "38441",
              WGCACHEABLE: "21600",
              cachefix: "38.93x-9.42x38",
            },
          }
        );

        // Iterate over the hours array for responseWaves
        // Iterate over the hours array for responseWaves
        for (let i = 0; i < responseWaves.data.fcst.hours.length; i++) {
          // Calculate the date for the current timestamp
          let currentDate = new Date(
            initdate.getTime() +
              responseWaves.data.fcst.hours[i] * 60 * 60 * 1000
          );

          // Format the date to a string (YYYY-MM-DD)
          let dateStr = currentDate.toISOString().split("T")[0];

          let foundDay = dayArray.find((e) => e.date === dateStr);

          // If the day object for this date doesn't exist yet, create it
          if (!foundDay) {
            foundDay = { date: dateStr, id: uuid.v4(), data: [] };
            dayArray.push(foundDay);
          }

          // Find the specific hour object in the data array and add the new data to it
          let hourObject = foundDay.data.find(
            (o) => o.hour === currentDate.getHours()
          );

          if (hourObject) {
            hourObject["SWDIR1"] = responseWaves.data.fcst.SWDIR1[i];
            hourObject["SWELL1"] = responseWaves.data.fcst.SWELL1[i];
          } else {
            foundDay.data.push({
              id: uuid.v4(),
              hour: currentDate.getHours(),
              SWDIR1: responseWaves.data.fcst.SWDIR1[i],
              SWELL1: responseWaves.data.fcst.SWELL1[i],
            });
          }
        }
        //Need to delete because I get an extra dataPoint for one day more so
        //it creates another data Day with just one hour of data
        if (dayArray.length > 0) {
          dayArray.pop();
        }
        // console.log(dayArray);
        setData(dayArray); // set the state
      } catch (error: any) {
        console.log(error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};
