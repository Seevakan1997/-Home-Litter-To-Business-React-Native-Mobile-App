import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {colors} from '../global/Styles';
import MessageForm from "./MessageForm";
import { collection,where,onSnapshot, query,addDoc, serverTimestamp } from 'firebase/firestore';
import { db,auth } from "../../firebase";

const Message = ()=>{
    const route = useRoute();
     const {selectUserId,selectUserName}= route.params;
    
    
    const [chat,setChat]= useState("")
    const [text,setText] = useState("")

    const user1 = auth.currentUser.uid
    console.log(text)
    const handleSubmit = async () =>{
        

        const user2 = selectUserId
        
        const id = user1 > user2 ? '${user1+user2}' : '${user2+user1}'
        
        await addDoc(collection(db, 'messages', id , 'chat'),{
            text,
            from:user1,
            to:user2,
            createdAt:serverTimestamp()
        });
        setText("");
        
    }
    
    return(
        <View>
        <View style={{alignItems:'center',marginTop:30}} >
            
            <Text style={{alignItems:'center',fontSize:50,color:colors.button}}>{selectUserName}</Text>
            <View style={{paddingTop:550}}>
            <MessageForm handleSubmit={handleSubmit} text={text} setText={setText}/>
            </View>
        </View>
        </View>
    )
}

export default Message;