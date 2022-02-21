import React from 'react'

import {View, Text,StyleSheet} from 'react-native'
import Header from '../components/Header'
import { colors } from '../global/Styles'


export default function AllProducts(){

    return(
        <View style ={{flex:1,marginTop:20}}>
            <View style={{backgroundColor:colors.button,marginVertical:10}}>
                <Text style={styles.headerText}>All Products</Text>
            </View>
            
            <Text>All Products</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    headerText:{
        textAlign:'center',
        alignItems:'center',
        color:colors.headerText,
        fontSize:22,
        fontWeight:'bold',
        marginTop:10
    },
})