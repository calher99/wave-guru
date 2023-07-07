import { useEffect } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAuth } from "../context/AuthContext";

interface Credentials {
  email: string;
  password: string;
}

const SignupScreen: React.FC = () => {
  const { onRegister, isLoading, error } = useAuth();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred", error);
    }
  }, [error]);

  const signUpHandler = async ({ email, password }: Credentials) => {
    await onRegister(email, password);
  };

  if (isLoading) {
    return <LoadingOverlay message="Signing Up" />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
};

export default SignupScreen;
