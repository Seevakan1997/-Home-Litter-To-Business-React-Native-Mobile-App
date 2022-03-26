import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Message = ()=>{
    const route = useRoute();
     const {selectUserId,selectUserName}= route.params;
    //  console.log(selectUserName);
    return(
        <View style={{flex:1}}>
        <View>
            
            <Text style={{alignItems:'center',fontSize:50}}>{selectUserName}</Text>
        </View>
        </View>
    )
}
export default Message;