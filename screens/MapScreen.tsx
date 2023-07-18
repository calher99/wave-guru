import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  Pressable,
  Alert,
} from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { SPOT_DATA } from "../assets/data/spotData";
import { BaseSuggestion } from "../types/place";

interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const MapScreen: React.FC = () => {
  const [mapRegion, setMapRegion] = useState<MapRegion>({
    latitude: 38.9665,
    longitude: -9.4176,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [spotsWithinViewPort, setSpotsWithinViewPort] = useState<
    BaseSuggestion[]
  >([]);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const mapRef = useRef<MapView>(null);

  async function verifyPermissions() {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(location);
    setMapRegion((prev) => ({
      ...prev,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }));

    mapRef.current?.animateToRegion(
      {
        ...mapRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      500
    );
  }

  const handleRegionChange = (region: Region) => {
    setMapRegion(region);
  };

  useEffect(() => {
    let visibleSpots: BaseSuggestion[] = [];
    const lat_min = mapRegion.latitude - mapRegion.latitudeDelta / 2;
    const lat_max = mapRegion.latitude + mapRegion.latitudeDelta / 2;

    const lng_min = mapRegion.longitude - mapRegion.longitudeDelta / 2;
    const lng_max = mapRegion.longitude + mapRegion.longitudeDelta / 2;

    visibleSpots = SPOT_DATA.filter((spot) => {
      return (
        spot.lat >= lat_min &&
        spot.lat <= lat_max &&
        spot.lon >= lng_min &&
        spot.lon <= lng_max
      );
    });
    setSpotsWithinViewPort(visibleSpots);
  }, [mapRegion]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ alignSelf: "stretch", height: "100%" }}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        showsBuildings={false}
        rotateEnabled={false}
        region={mapRegion}
        onRegionChangeComplete={handleRegionChange}
      >
        {spotsWithinViewPort.map((spot) => (
          <Marker
            key={spot.data}
            coordinate={{ latitude: spot.lat, longitude: spot.lon }}
          >
            <MaterialIcons name="location-history" size={50} color="blue" />
            <View style={styles.containerIcon}>
              <Image
                style={styles.image}
                source={require("../assets/images/windguru-icon-192x192.png")}
              />
            </View>
            <Callout
              onPress={() => {
                console.log("navigate somewhere");
              }}
            >
              <Text style={styles.calloutText}>{spot.value}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <Pressable onPress={getLocationHandler}>
          <MaterialIcons name="my-location" size={40} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute", //use absolute position to show button on top of the map
    bottom: "8%", //for center align
    left: "85%",
  },
  containerIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#ECF0F1",
    position: "absolute",
    left: 10,
    top: 8,
  },
  image: { width: 30, height: 30 },
  calloutText: {
    width: 150,
    flexWrap: "wrap",
    textAlign: "center",
  },
});
