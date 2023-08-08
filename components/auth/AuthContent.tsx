import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";

import { useNavigation } from "@react-navigation/native";

import AuthGoogle from "./AuthGoogle";
import AuthFacebook from "./AuthFacebook";

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
        <AuthGoogle />
        <AuthFacebook />
      </View>
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>

      {/* <Image
        style={styles.imageWaves}
        source={require("../../assets/images/wave.png")}
      /> */}
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

  imageWaves: {
    width: 120,
    height: 60,
  },
});
