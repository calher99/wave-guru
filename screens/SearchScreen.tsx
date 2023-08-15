import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { DropDownSearch } from "../components/ui/DropDownSearch";
import { useUser } from "../context/UserContext";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import NearbySpots from "../components/ui/NearbySpots";

const SearchScreen = () => {
  const { isLoading } = useUser();
  if (isLoading) {
    return <LoadingOverlay message="Adding favourite" />;
  }
  return (
    <View style={styles.container}>
      {/* <Text style={styles.sectionTitle}>Remote list</Text> */}
      <DropDownSearch />
      <Text> --- Or --- </Text>
      <NearbySpots />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 15,
    alignItems: "center",
  },
});
