import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  console.log(state)
  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText='Sign In for Tracker'
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText='Sign In'
      />
      <NavLink text='Need an account? Sign up instead' routeName='Signup' />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100,
  },
});
