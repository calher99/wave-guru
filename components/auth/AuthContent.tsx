import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

interface AuthContentProps {
  isLogin?: boolean;
  onAuthenticate: (data: { email: string; password: string }) => void;
}

function AuthContent({ isLogin, onAuthenticate }: AuthContentProps) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Login");
    }
  }

  function submitHandler(credentials: {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
  }) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/windguru-icon-192x192.png")}
      />
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.oAuth}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            pressed ? styles.buttonPressed : styles.button, //Style is only applied when pressed
          ]}
          onPress={() => console.log("Google")}
        >
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../../assets/images/GOOG.png")}
            />
            <Text style={styles.text}>Google</Text>
          </View>
        </Pressable>
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
      </View>
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  buttons: {
    marginTop: 8,
  },
  logo: {
    width: 40,
    height: 40,
  },
  oAuth: {
    marginTop: 8,
    flexDirection: "row",
    gap: 8,
  },
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
