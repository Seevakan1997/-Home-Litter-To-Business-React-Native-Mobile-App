import React from 'react';
import {View, Text, StyleSheet, Dimentions} from 'react-native';
import {colors, parameters} from '../global/Styles';
import { Icon } from 'react-native-elements';

export default function Header({title,type,navigation}){


    return(
        <View style={styles.header}>
            <View style={styles.iconStyle}>
                <Icon
                    type='material-community'
                    name= {type}
                    color={colors.headerText}
                    size={30}
                    onPress={()=>{navigation.goBack()}}
                />
            </View>
            <View>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    header:{
        flexDirection:'row',
        backgroundColor:colors.button,
        height:parameters.headerHeight

    },
    headerText:{
        alignItems:'center',
        color:colors.headerText,
        fontSize:22,
        fontWeight:'bold',
        marginLeft:30,
        marginTop:15
    },
    iconStyle:{
        marginTop:15,
        marginLeft:10
    }
});