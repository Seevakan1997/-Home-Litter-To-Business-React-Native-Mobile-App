import  React,{useState} from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '../global/Styles';

export default function MapScreen({navigation,route }) {

    const [pin,setPin]= useState({latitude: 7.95,
        longitude: 80.670837})
    const [Latitude, setLatitude] = useState();
    const [Longitude, setLongitude] = useState();

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
                    console.log("Drag Start",e.nativeEvent.coordinate);
                    setLatitude(e.nativeEvent.coordinate.latitude)
                    setLongitude(e.nativeEvent.coordinate.longitude);
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
       <View style ={styles.view17}>
    
        <Button
              title = "Add Location"
              buttonStyle = {styles.button1}
              titleStyle ={styles.title1}
              onPress = {()=>{navigation. navigate('MyProductsScreen',{
                Latitude:Latitude,
                Longitude:Longitude
              })}}
        />
       </View>
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
  text1:{fontSize:22,
    color:colors.button,
    fontWeight:'bold'
  },
  button1: {backgroundColor:colors.button,
    alignContent:"center",
    justifyContent:"center",
    borderRadius:12,
    borderWidth:1, 
    borderColor:colors.button,
    height:50,
    paddingHorizontal:20,
    width:'100%',
    
                      
  },
  view17:{marginVertical:5,
    marginBottom:60,
   
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
