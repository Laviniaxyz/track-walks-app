//start up the process of requestion permissions to track user's location
//error handling
//watch user's chane in location
import {useState, useEffect} from 'react'
import {Accuracy, requestForegroundPermissionsAsync, watchPositionAsync} from 'expo-location'

export default (isFocused, callback) => {
  const [err, setErr] = useState(null)
  
  const startWatching = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      //watches user's location and sees it change over time
      //we ask update every second or every 10 meters
      const subscriber = await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      }, (location) => {
          //customized action. What happens when we get a new location?
        callback(location)
      })
      if (!granted) {
        throw new Error('Location permission not granted')
      }
    }
    catch(e) {
      setErr(e)
    }
  }

  useEffect(() => {
    if (isFocused) {
      startWatching()
    }
  }, [isFocused])

  return [err]
}