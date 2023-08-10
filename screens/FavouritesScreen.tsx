import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CountryFlag from "react-native-country-flag";
import ListSpot from "../components/ui/ListSpot";
import { BaseSuggestion, Place } from "../types/place";
import { useUser } from "../context/UserContext";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const FavouritesScreen = () => {
  const { favourites, isLoading } = useUser();
  if (isLoading) {
    return <LoadingOverlay message="Removing favourite" />;
  }
  return (
    <View>
      <FlatList
        data={favourites}
        renderItem={({ item }) => <ListSpot place={item} type="favourites" />}
        keyExtractor={(item) => item.data.toString()}
      />
    </View>
  );
};

export default FavouritesScreen;
