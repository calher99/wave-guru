import { ReactNode, createContext, useContext, useState } from "react";

interface UserContextInterface {
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  speed: string;
  setSpeed: React.Dispatch<React.SetStateAction<string>>;
  temperature: string;
  setTemperature: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  error: string | null;
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
});

export const useUser = (): UserContextInterface => {
  return useContext(UserContext);
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [height, setHeight] = useState<string>("m");
  const [speed, setSpeed] = useState<string>("kmph");
  const [temperature, setTemperature] = useState<string>("celsius");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const value = {
    height,
    setHeight,
    speed,
    setSpeed,
    temperature,
    setTemperature,
    isLoading,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
