import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios, { AxiosError } from "axios";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

interface UserData {
  token: string;
}

interface AuthState {
  token: string | null;
  authenticated: boolean | null;
}

interface AuthContextInterface {
  authState: AuthState;
  isLoading: boolean;
  error: string | null;
  onLoad: () => Promise<void>;
  onRegister: (email: string, password: string) => Promise<UserData | void>;
  onLogin: (email: string, password: string) => Promise<UserData | void>;
  onLogout: () => Promise<void>;
}

const TOKEN_KEY = "surfForecastUser";
export const API_URL = "http://localhost:4090/api";

const AuthContext = createContext<AuthContextInterface>({
  authState: { token: null, authenticated: null },
  isLoading: false,
  error: null,
  onLoad: async () => {},
  onRegister: async () => {},
  onLogin: async () => {},
  onLogout: async () => {},
});

export const useAuth = (): AuthContextInterface => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await axios.post(`${API_URL}/users/signup`, {
        email: email,
        password: password,
      });
      setAuthState({
        token: responseData.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseData.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, responseData.data.token);

      return responseData.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
        // return { errorMessage: error.response.data.message };
      } else {
        setError("An error occurred during registration");
        // return { errorMessage: "An error ocurred" };
      }
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await axios.post(`${API_URL}/users/signin`, {
        email: email,
        password: password,
      });
      setAuthState({
        token: responseData.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseData.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, responseData.data.token);

      return responseData.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
        // return { errorMessage: error.response.data.message };
      } else {
        setError("An error occurred during registration");
        // return { errorMessage: "An error ocurred" };
      }
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(false);

    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });

    return;
  };

  const loadApp = async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setAuthState({
        token: token,
        authenticated: true,
      });
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onLoad: loadApp,
    authState,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
