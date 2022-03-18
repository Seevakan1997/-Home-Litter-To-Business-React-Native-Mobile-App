import { useRoute } from '@react-navigation/native';
import React from 'react'

import {View, Text, StyleSheet, Button, Image, ScrollView} from 'react-native';
import { colors } from '../global/Styles';


export default function ProductDetailsScreen({navigation}){
     const route = useRoute();
     const {productsId,productsImg,productsName,productsWeight,productsDesc}= route.params;
    
    
    return(
        <View style ={{flex:1}}>
        <View style={{paddingTop:30}} >
            <ScrollView>
                <Image style={styles.image} source={{uri:productsImg}}/>
                <View style={styles.actions}>
                <Text style={{fontSize:15,color:colors.button,fontWeight:'bold'}}>{productsName}</Text>
                </View>
                <Text style={styles.price}>~ {productsWeight}</Text>
                <Text style={styles.description}>{productsDesc}</Text>
            </ScrollView>
        </View>
        </View>
    )
}
const styles= StyleSheet.create({
    image:{
        
        width:'100%',
        height:300
    },
    actions:{
        marginVertical:10,
        alignItems:'center',
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20
    },
    description:{
        fontSize:15,
        textAlign:'center',
        marginHorizontal:20
    }
});