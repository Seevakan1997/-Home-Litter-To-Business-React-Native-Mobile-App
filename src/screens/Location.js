import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button, TextInput } from 'react-native';
import * as Location from 'expo-location';

const Locate = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
//   const [region,setRegion]=useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
//     // latitudeDelta: 0.015,
//     // longitudeDelta: 0.0121,
//   }

// )

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude);
      setLocation(location.coords);
    })();
  }, []);
//--------------------
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.warn("latitude: ", latitude);
  console.warn("longitude: ", longitude);
  // console.log(text);
  // console.log(location);
//----------------------

// const getLoc =() =>{
//   //console.log("press",location.coords)
//   let latitude= location.coords.latitude
//   let longitude=location.coords.longitude
//   setRegion({
//             latitude: latitude,
//             longitude: longitude,
//             // latitudeDelta: 0.015,
//             // longitudeDelta: 0.0121,
//           })
// }


// const sendLoc =() =>{
  
//   let latitude= location.coords.latitude
//   let longitude=location.coords.longitude
// console.log("Use these variables to send current location(",latitude, ",",longitude,")")
// }


  return (
    <View style={styles.container}>
      
      
      <Text>

      </Text>
      <Text style={{color:'red'}} > {latitude}</Text>
      <Text > {longitude}</Text>
    </View>
    //<Text style={styles.paragraph}>{text}</Text>
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
 });
 

 export default Locate