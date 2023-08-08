import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import React from "react";

const AuthFacebook = () => {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        pressed ? styles.buttonPressed : styles.button, //Style is only applied when pressed
      ]}
      onPress={() => console.log("Facebook")}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/images/fb.png")}
        />
        <Text style={styles.text}>Facebook</Text>
      </View>
    </Pressable>
  );
};

export default AuthFacebook;

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 40,
    borderRadius: 8,
    borderColor: Colors.backgroundDark,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    width: 150,
    height: 40,
    borderRadius: 8,
    borderColor: Colors.backgroundDark,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 9,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 24,
  },
  text: {
    // color: "#FFFFFF",
    fontSize: 16,
    // fontFamily: 'Roboto', // use 'Roboto' if it's available, or another sans-serif font
  },
});
