import React, { useEffect } from "react";
import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-native";

interface Credentials {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const { onLogin, isLoading, error } = useAuth();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred", error);
    }
  }, [error]);

  const signInHandler = async ({ email, password }: Credentials) => {
    await onLogin(email, password);
  };

  if (isLoading) {
    return <LoadingOverlay message="Logging in" />;
  }

  return <AuthContent isLogin onAuthenticate={signInHandler} />;
};

export default LoginScreen;
