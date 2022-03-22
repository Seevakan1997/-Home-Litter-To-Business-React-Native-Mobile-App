import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ChatUsers from '../screens/chat/ChatUsers';
import { colors } from '../global/Styles';
import CustomChatItems from '../components/CustomChatItems';

export default function ChatScreen() {
    return (
        <View style ={{flex:1,marginTop:20}}>
            <View style={{backgroundColor:colors.button,marginVertical:10}}>
                <Text style={styles.headerText}>Chats</Text>
            </View>
            <CustomChatItems/>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText:{
        textAlign:'center',
        alignItems:'center',
        color:colors.headerText,
        fontSize:30,
        fontWeight:'bold',
        
    },
});