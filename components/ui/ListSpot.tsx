import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import CountryFlag from "react-native-country-flag";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";

const ListSpot = ({ place }: { place: Place }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        pressed ? styles.buttonPressed : null, //Style is only applied when pressed
      ]}
      onPress={() => {
        navigation.navigate("ForecastMain");
        // navigation.navigate("Test", {
        //   forecastData: item,
        //   day: day,
        //   dayDate: dayDate,
        // });
        // console.log("pressed");
      }}
    >
      <View style={styles.container}>
        <CountryFlag isoCode={place.countryCode} size={15}></CountryFlag>
        <Text style={styles.spotName}>{place.name}</Text>
      </View>
    </Pressable>
  );
};

export default ListSpot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1, // Add this line
    borderBottomColor: Colors.backgroundDark, // And this line

    // alignItems: "flex-start",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  spotName: {
    fontSize: 17,
  },
});
