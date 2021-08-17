import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

//reducer function that is called only by React directly every time we dispatch an action

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error":
      return {
        ...state,
        errorMessage: "",
      };
    case "signout": 
      return {token: null, errorMessage: ''}
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signup")
  }
}

//define action functions (called with dispatch) intented to modify our state
const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error" });
};

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      console.log(response.data)
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };

  const signout = dispatch => async() => {
    await AsyncStorage.removeItem('token')
    dispatch({type:'signout'})
    navigate('loginFlows')
  }

//export customized Provider and Context

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, clearErrorMessage, tryLocalSignin, signout },
  { token: null, errorMessage: "" }
);
