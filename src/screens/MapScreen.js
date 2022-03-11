import  React,{useState} from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function MapScreen({navigation}) {
    const [pin,setPin]= useState({latitude: 7.95,
        longitude: 80.670837})
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
      latitude: 7.95,
      longitude: 80.670837,
      latitudeDelta: 0.15,
      longitudeDelta: 0.11,
    }}
       >
           <Marker coordinate={pin}
                pinColor="red"
                draggable={true}
                onDragStart={(e)=>{
                    console.log("Drag Start",e.nativeEvent.coordinate)
                }}
                onDragEnd={(e)=>{
                  setPin({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude
                  })
                }}
                
            />
            <Circle
              center={pin}
              radius={1000}
            />
       </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
