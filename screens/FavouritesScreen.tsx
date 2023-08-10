import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CountryFlag from "react-native-country-flag";
import ListSpot from "../components/ui/ListSpot";
import { BaseSuggestion, Place } from "../types/place";

const FAVOURITES: Place[] = [
  {
    data: 207059,
    lat: 43.391,
    lon: -4.372,
    g: "ho",
    id_user: 12,
    type: "ho",
    value: "Spain - San Vicente de la Barquera",
    countryCode: "ES",
  },
  {
    data: 38441,
    lat: 38.93,
    lon: -9.42,
    value: "Portugal - Ribeira d' ilhas",
    countryCode: "PT",
    g: "ho",
    id_user: 12,
    type: "ho",
  },
];

const FavouritesScreen = () => {
  return (
    <View>
      <FlatList
        data={FAVOURITES}
        renderItem={({ item }) => <ListSpot place={item} type="favourites" />}
        keyExtractor={(item) => item.data.toString()}
      />
    </View>
  );
};

export default FavouritesScreen;
