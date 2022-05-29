import  React,{useState} from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '../global/Styles';
import { useRoute } from '@react-navigation/native';

export default function ShowMapScreen({navigation }) {

    
        const route = useRoute();
        const {productsLatitude,productsLongitude}= route.params;
        
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
      latitude: productsLatitude,
      longitude: productsLongitude,
      latitudeDelta: 0.15,
      longitudeDelta: 0.11,
    }}
       >

      
           <Marker 
               
                coordinate={{
                latitude:productsLatitude,
                longitude:productsLongitude
                }}
                pinColor="red"
                
            />
           
            
       </MapView>
       <View style ={styles.view17}>
    
        <Button
              title = "Go Back"
              buttonStyle = {styles.button1}
              titleStyle ={styles.title1}
              onPress = {()=>{navigation. goBack('AllProducts')}}
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
