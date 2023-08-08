import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import React from "react";

import { useAuth } from "../../context/AuthContext";

import { useEffect, useState } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import Constants from "expo-constants";

WebBrowser.maybeCompleteAuthSession();

const AuthGoogle = () => {
  const { onGoogle, isLoading, error } = useAuth();
  const { androidClientId, iosClientId, clientId } = (Constants.manifest
    ?.extra || {}) as {
    androidClientId: string;
    iosClientId: string;
    clientId: string;
  };

  // console.log("IOS", iosClientId);
  // console.log(clientId);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: iosClientId,
    androidClientId: androidClientId,
    expoClientId: clientId,
  });

  const handleSignInWithGoogle = async () => {
    if (response?.type === "success" && response?.authentication) {
      await onGoogle(response.authentication.accessToken);
    }
  };

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const test = async () => {
    await onGoogle("response.authentication.accessToken");
  };
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        pressed ? styles.buttonPressed : styles.button, //Style is only applied when pressed
      ]}
      // onPress={() => promptAsync()}
      onPress={() => test()}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/images/GOOG.png")}
        />
        <Text style={styles.text}>Google</Text>
      </View>
    </Pressable>
  );
};

export default AuthGoogle;

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
