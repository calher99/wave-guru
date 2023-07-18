import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import FavouritesScreen from "./screens/FavouritesScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SearchScreen from "./screens/SearchScreen";
import MapScreen from "./screens/MapScreen";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

function AuthenticatedTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="FavouritesStack"
        component={FavouritesStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MapStack"
        component={MapStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          headerTitle: () => (
            <Image
              source={require("./assets/images/windguru-icon-192x192.png")}
              style={{ width: 40, height: 40 }}
            />
          ),
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function FavouritesStack() {
  const { onLogout } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: "black",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require("./assets/images/windguru-icon-192x192.png")}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
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
          headerTitle: () => (
            <Image
              source={require("./assets/images/windguru-icon-192x192.png")}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ForecastDetail"
        component={ForecastDetail}
        options={{
          headerTitle: () => (
            <Image
              source={require("./assets/images/windguru-icon-192x192.png")}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function SearchStack() {
  const { onLogout } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: "black",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require("./assets/images/windguru-icon-192x192.png")}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
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
      <Stack.Screen
        name="ForecastDetail"
        component={ForecastDetail}
        options={{
          headerTitle: () => (
            <Image
              source={require("./assets/images/windguru-icon-192x192.png")}
              style={{ width: 40, height: 40 }}
            />
          ),
          headerTitle: () => (
            <Image
              source={require("./assets/images/windguru-icon-192x192.png")}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function MapStack() {
  const { onLogout } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: "black",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
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
          headerTitle: () => (
            <Image
              source={require("./assets/images/windguru-icon-192x192.png")}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ForecastDetail"
        component={ForecastDetail}
        options={{
          headerTitle: () => (
            <Image
              source={require("./assets/images/windguru-icon-192x192.png")}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  const { onLogout } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: "black",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Search"
        component={SettingsScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require("./assets/images/windguru-icon-192x192.png")}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { authState } = useAuth();
  return (
    <NavigationContainer>
      {/* {!authState.authenticated && <AuthStack />}
      {authState.authenticated && <AuthenticatedTabs />} */}
      <AuthenticatedTabs />
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
      <StatusBar style="dark" hidden={false} />
      <AuthProvider>
        <Root />
      </AuthProvider>
    </>
  );
}
