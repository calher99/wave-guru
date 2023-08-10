import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Constants from "expo-constants";
import { useAuth } from "./AuthContext";
import { Place } from "../types/place";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface UserContextInterface {
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  speed: string;
  setSpeed: React.Dispatch<React.SetStateAction<string>>;
  temperature: string;
  setTemperature: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  error: string | null;
  favourites: Place[];
  onAdd: (
    value: string,
    data: number,
    lat: number,
    lon: number,
    countryCode: string
  ) => void;
  onDelete: (id: string) => void;
  onGetPlaces: () => void;
}

const UserContext = createContext<UserContextInterface>({
  height: "m",
  setHeight: () => {},
  speed: "kmph",
  setSpeed: () => {},
  temperature: "celsius",
  setTemperature: () => {},
  isLoading: false,
  error: null,
  favourites: [],
  onAdd: async () => {},
  onDelete: async () => {},
  onGetPlaces: async () => {},
});

export const useUser = (): UserContextInterface => {
  return useContext(UserContext);
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const { backendUrl } = Constants.manifest?.extra || {};
  const { authState } = useAuth();

  const [height, setHeight] = useState<string>("m");
  const [speed, setSpeed] = useState<string>("kmph");
  const [temperature, setTemperature] = useState<string>("celsius");
  const [places, setPlaces] = useState<Place[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addPlace = async (
    value: string,
    data: number,
    lat: number,
    lon: number,
    countryCode: string
  ) => {
    try {
      const responseData = await axios.post(
        `${backendUrl}/places/add`,
        {
          value: value,
          data: data,
          lat: lat,
          lon: lon,
          countryCode: countryCode,
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPlaces((prev) => {
        const newPlace = {
          id: responseData.data.place.id,
          value: responseData.data.place.value,
          data: responseData.data.place.data,
          lat: responseData.data.place.lat,
          lon: responseData.data.place.lon,
          countryCode: responseData.data.place.countryCode,
        };
        return [...prev, newPlace];
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
        // return { errorMessage: error.response.data.message };
      } else {
        setError("An error occurred during registration");
        // return { errorMessage: "An error ocurred" };
      }
    }
  };

  const deletePlace = () => {};

  const getPlaces = async () => {
    try {
      const responseData = await axios.get(`${backendUrl}/places//getPlaces`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(
        ":::::::PLACES RETRIVED:::::::::::",
        responseData.data.places
      );
      const placeArray = responseData.data.places.map((place: Place) => {
        return {
          value: place.value,
          id: place.id,
          data: place.data,
          lon: place.lon,
          lat: place.lat,
          countryCode: place.countryCode,
        };
      });
      setPlaces(placeArray);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error inside getPlaces", error.response.data.message);
        setError(error.response.data.message);
        // return { errorMessage: error.response.data.message };
      } else {
        setError("An error occurred during registration");
        // return { errorMessage: "An error ocurred" };
      }
    }
  };

  useEffect(() => {
    getPlaces();
  }, [authState.token]);

  const value = {
    height,
    setHeight,
    speed,
    setSpeed,
    temperature,
    setTemperature,
    isLoading,
    error,
    favourites: places,
    onAdd: addPlace,
    onDelete: deletePlace,
    onGetPlaces: getPlaces,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
