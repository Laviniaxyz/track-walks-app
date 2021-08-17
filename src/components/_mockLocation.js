//test only file used to mock out user's location
import * as Location from 'expo-location'

//aprox 10 meters in longitude or latitude
const tenMetersWithDegrees = 0.0001


const getLocation = increment => {
    return {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            acuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 26.036499 + increment * tenMetersWithDegrees,
            latitude: 44.430473 + increment * tenMetersWithDegrees
        }
    }
}

let counter = 0
setInterval(() => {
    //once every second we are gonna emit en event directly into expo location library
    //we are faking out as though user location has changed in real life
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    })
    counter ++
}, 1000)
