import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage} = useContext(AuthContext);
  console.log(state);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText='Sign Up for Tracker'
        errorMessage={state.errorMessage}
        onSubmit={({ email, password }) => signup({ email, password })}
        submitButtonText='Sign Up'
      />
      <NavLink
        text='Already have an account? Sign in instead'
        routeName='Signin'
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100,
  },
});
