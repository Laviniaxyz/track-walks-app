import '../components/_mockLocation' 
import React, {useContext} from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import {Text} from 'react-native-elements'
import Map from '../components/Map'
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from '../hooks/useLocation';
import {withNavigationFocus} from 'react-navigation'

const TrackCreateScreen = ({isFocused}) => {
  console.log(isFocused)
  const {addLocation} = useContext(LocationContext)
  const [err] = useLocation(isFocused, (location) => addLocation(location))
  
  return (
    <SafeAreaView>
      <Text h2>Create a new track</Text>
      <Map/>
      {err? <Text>Please enable location services</Text>: null}
    </SafeAreaView>
  );
};

export default withNavigationFocus(TrackCreateScreen)

const styles = StyleSheet.create({});
