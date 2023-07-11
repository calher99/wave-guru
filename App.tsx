import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ForecastMain from "./screens/ForecastMain";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/styles";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";
import ForecastDetail from "./screens/ForecastDetail";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { onLogout } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="ForecastMain"
        component={ForecastMain}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor as string}
              size={24}
              onPress={onLogout}
            />
          ),
        }}
      />
      <Stack.Screen name="ForecastDetail" component={ForecastDetail} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { authState } = useAuth();
  return (
    <NavigationContainer>
      {!authState.authenticated && <AuthStack />}
      {authState.authenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
function Root() {
  const { onLoad } = useAuth();
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    onLoad().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  return <Navigation />;
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <Root />
      </AuthProvider>
    </>
  );
}
