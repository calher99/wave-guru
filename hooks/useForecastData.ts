import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Forecast3data,
  Forecast84data,
  ForecastDayData,
  TideAPIData,
  TideDetails,
  TidePoint,
} from "../types/forecast";
import uuid from "react-native-uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TIDE_DATA = "surfForecastTideData";

export const useForecastData = () => {
  const [data, setData] = useState<ForecastDayData[] | null>(null); // replace any with the correct type if you have one
  const [error, setError] = useState<Error | null>(null);
  let dayArray: Array<{
    date: string;
    id: any;
    data: any[];
    tides?: TideDetails;
  }> = [];

  const fetchTideData = async () => {
    const lat = 38.93;
    const lng = -9.42;

    const value = await AsyncStorage.getItem(TIDE_DATA);

    const today = new Date();
    const todayDateString = today.toISOString().split("T")[0]; // this will return the date in the format: '2023-07-12'

    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 10);
    const futureDateString = futureDate.toISOString().split("T")[0]; // this will return the date in the format: '2023-07-22'

    if (value !== null) {
      const cachedData = JSON.parse(value);

      if (cachedData.date === todayDateString) {
        console.log("cached data", cachedData.data);
        // If the cached data is from today, use it
        return cachedData.data;
      }
    }

    try {
      const responseTide: AxiosResponse<TideAPIData> = await axios.get(
        `https://api.stormglass.io/v2/tide/extremes/point`,
        {
          params: {
            lat: lat,
            lng: lng,
            start: todayDateString, // updated start date
            end: futureDateString, // updated end date
          },
          headers: {
            Authorization:
              "cbb42dee-1ffe-11ee-8d52-0242ac130002-cbb42e5c-1ffe-11ee-8d52-0242ac130002",
          },
        }
      );
      console.log("After API Tides", responseTide.data);
      // Save the data in the AsyncStorage along with the date
      const dataToCache = {
        date: todayDateString,
        data: responseTide.data,
      };
      await AsyncStorage.setItem(TIDE_DATA, JSON.stringify(dataToCache));

      return responseTide.data;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchForecastData = async () => {
    try {
      // Initialize an array to hold the final results
      const responseWind: AxiosResponse<Forecast3data> = await axios.get(
        "https://www.windguru.net/int/iapi.php",
        {
          params: {
            q: "forecast",
            id_model: 3,
            rundef: "2023071300x0x240x0x240-2023071300x243x384x243x384",
            initstr: "2023071300",
            id_spot: 38441,
            WGCACHEABLE: 21600,
            cachefix: "38.93x-9.42x38",
          },
        }
      );

      //Set initial Date
      // console.log("Date coming from API", responseWind.data);
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
          initdate.getTime() + responseWind.data.fcst.hours[i] * 60 * 60 * 1000
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
          WATEMP: responseWind.data.fcst.TMP[i],
          EXTTEMP: responseWind.data.fcst_land.TMP[i],
        });
      }

      const responseWaves: AxiosResponse<Forecast84data> = await axios.get(
        "https://www.windguru.net/int/iapi.php",
        {
          params: {
            q: "forecast",
            id_model: 84,
            rundef: "2023071300x0x240x0x240-2023071300x243x384x243x384",
            initstr: "2023071300",
            id_spot: 38441,
            WGCACHEABLE: 21600,
            cachefix: "38.93x-9.42x38",
          },
        }
      );

      // console.log("WAVES", responseWaves);
      // Iterate over the hours array for responseWaves
      for (let i = 0; i < responseWaves.data.fcst.hours.length; i++) {
        // Calculate the date for the current timestamp
        let currentDate = new Date(
          initdate.getTime() + responseWaves.data.fcst.hours[i] * 60 * 60 * 1000
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
          hourObject["SWELLDIR"] = responseWaves.data.fcst.DIRPW[i];
          hourObject["SWELLHGT"] = responseWaves.data.fcst.HTSGW[i];
          hourObject["SWELLPER"] = responseWaves.data.fcst.PERPW[i];
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
      const filteredData = dayArray.map((dayData) => ({
        ...dayData,
        data: dayData.data.filter(
          (hourData) =>
            hourData.hour !== 2 &&
            hourData.hour !== 3 &&
            hourData.hour !== 5 &&
            hourData.hour !== 23 &&
            hourData.hour !== 0
        ),
      }));
      // console.log(filteredData);
      // setData(filteredData); // set the state
      return filteredData; // added return statement
    } catch (error: any) {
      console.log(error);
      setError(error);
      return [];
    }
  };
  const processTideData = (
    tideData: TideAPIData
  ): { [key: string]: TideDetails } => {
    // Process the tideData and map it into an object where the keys are the date strings and the values are the tide details
    let processedData: { [key: string]: TidePoint[] } = {};

    tideData.data.forEach((tideEvent) => {
      const date = tideEvent.time.split("T")[0];

      // Create a new entry for this date if it doesn't exist yet

      if (!processedData[date]) {
        processedData[date] = [];
      }

      processedData[date].push({
        height: parseFloat(tideEvent.height),
        tideDate: tideEvent.time,
      });
    });
    console.log("porcessed Tide Data:", processedData);
    return processedData;
  };

  useEffect(() => {
    // Fetch tide data
    fetchTideData().then((tideData) => {
      const processedTideData = processTideData(tideData);
      // Fetch forecast data and merge it with tide data
      fetchForecastData().then((forecastData) => {
        // Merge tide data with forecast data
        forecastData.forEach((dayData) => {
          if (processedTideData[dayData.date]) {
            dayData.tides = processedTideData[dayData.date];
          }
        });

        // Update state
        setData(forecastData);
      });
    });
  }, []);

  return { data, error };
};
