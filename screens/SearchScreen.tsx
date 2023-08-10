import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { DropDownSearch } from "../components/ui/DropDownSearch";
import { useUser } from "../context/UserContext";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const SearchScreen = () => {
  const { isLoading } = useUser();
  if (isLoading) {
    return <LoadingOverlay message="Adding favourite" />;
  }
  return (
    <View>
      {/* <Text style={styles.sectionTitle}>Remote list</Text> */}
      <DropDownSearch />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 50,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 3,
  },
});
