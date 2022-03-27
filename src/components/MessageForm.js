import React from "react";
import { View,TextInput,StyleSheet,KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, parameters } from "../global/Styles";

const MessageForm = ({handleSubmit,text,setText})=>{
  
    return (
        <SafeAreaView>
        
        
            <View style={styles.textInput}>
                <TextInput  multiline={true} placeholder='Type a message...' value={text} onChangeText={(text)=> setText(text)}/>
                
                <View style={{paddingLeft:90}}>
                <Button
                    title='Send'
                    buttonStyle={styles.styledButton}
                    titleStyle={styles.buttonTitle}
                    onPress={handleSubmit}
                    />
                 </View>
            </View>
          
        </SafeAreaView>
        
    )
    
}

const styles = StyleSheet.create({
    styledButton:{
        backgroundColor:colors.grey5,
        alignContent:'center',
        justifyContent:'center',
        borderRadius:10,
        height:40,
        paddingHorizontal:20,
        width:'70%'
    },
    textInput:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:30,
        backgroundColor:colors.grey5
    },
    buttonTitle:{
        color:'#12AD2B',
        fontSize:15,
        fontWeight:'bold',
        alignItems:'center',
        
    }
})

export default MessageForm