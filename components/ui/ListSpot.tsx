import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import CountryFlag from "react-native-country-flag";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import { Place } from "../../types/place";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

import Constants from "expo-constants";

import { useUser } from "../../context/UserContext";

const ListSpot = ({ place, type }: { place: Place; type: string }) => {
  const { onAdd, onDelete } = useUser();
  const { backendUrl } = Constants.manifest?.extra || {};
  const navigation = useNavigation();

  const deleteFavouritehandler = () => {
    onDelete(place.id as string);
  };

  const selectFavouritehandler = async () => {
    console.log("add");
    onAdd(place.value, place.data, place.lat, place.lon, "ESP");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null, //Style is only applied when pressed
          ]}
          onPress={() => {
            navigation.navigate("ForecastMain");
          }}
        >
          {type === "favourites" && (
            <CountryFlag
              isoCode={place.countryCode as string}
              size={15}
            ></CountryFlag>
          )}
          <Text style={styles.spotName}>{place.value}</Text>
        </Pressable>
      </View>
      <View style={styles.containerRight}>
        {type === "search" && (
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => [
              pressed ? styles.buttonPressed : null, //Style is only applied when pressed
            ]}
            onPress={selectFavouritehandler}
          >
            <MaterialIcons
              name="favorite-border"
              size={24}
              color={Colors.backgroundDarker}
            />
          </Pressable>
        )}
        {type === "favourites" && (
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => [
              pressed ? styles.buttonPressed : null, //Style is only applied when pressed
            ]}
            onPress={deleteFavouritehandler}
          >
            <MaterialIcons
              name="delete"
              size={24}
              color={Colors.backgroundDarker}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default ListSpot;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 8,
    borderBottomWidth: 1, // Add this line
    borderBottomColor: Colors.backgroundDark, // And this line

    // alignItems: "flex-start",
  },
  containerLeft: {
    flex: 1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  spotName: {
    fontSize: 17,
    flex: 1,
  },
  containerRight: {},
});
