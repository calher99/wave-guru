import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

const NearbySpots = () => {
  return (
    <View>
      <Pressable style={styles.buttonContainer}>
        <Entypo name="location" size={18} color="black" />
        <Text style={styles.text}>Get Spots near you</Text>
      </Pressable>
    </View>
  );
};

export default NearbySpots;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 15,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    backgroundColor: Colors.backgroundLight,
  },
  text: {
    fontSize: 16,
  },
});
