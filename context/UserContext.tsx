import { ReactNode, createContext, useContext, useState } from "react";

interface UserContextInterface {
  height: string;
  speed: string;
  temperature: string;
  isLoading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextInterface>({
  height: "m",
  speed: "kmph",
  temperature: "celsius",
  isLoading: false,
  error: null,
});

export const useUser = (): UserContextInterface => {
  return useContext(UserContext);
};

interface UserProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [height, setHeight] = useState<string>("");
  const [speed, setSpeed] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const value = {
    height,
    speed,
    temperature,
    isLoading,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
