import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CountryFlag from "react-native-country-flag";
import ListSpot from "../components/ui/ListSpot";

const FAVOURITES: Place[] = [
  {
    id: 207059,
    lat: 43.391,
    lon: -4.372,
    name: "Spain - San Vicente de la Barquera",
    country: "ESP",
    countryCode: "ES",
  },
  {
    id: 38441,
    lat: 38.93,
    lon: -9.42,
    name: "Portugal - Ribeira d' ilhas",
    country: "Portugal",
    countryCode: "PT",
  },
];

const FavouritesScreen = () => {
  return (
    <View>
      <FlatList
        data={FAVOURITES}
        renderItem={({ item }) => <ListSpot place={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default FavouritesScreen;
