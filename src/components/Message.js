import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View,Keyboard,FlatList,ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {colors} from '../global/Styles';
import MessageForm from "./MessageForm";
import {  addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, updateDoc,doc } from 'firebase/firestore';
import { db,auth } from "../../firebase";
import ChatGetMessages from "./ChatGetMessages";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Message = ()=>{
    const route = useRoute();
    const {selectUserId,selectUserName}= route.params;
    const [text,setText] = useState("")
    const [chats, setchats] = useState([])
    const user1 = auth.currentUser.uid
    useEffect(() => {

        try {

            const user1 = auth.currentUser.uid
            const user2 = selectUserId
            const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;


            const mesref = collection(db, 'messages', id , 'chat');
           
            const q = query(mesref, orderBy('createdAt', 'desc'))
            onSnapshot(q, (querySnapshot) => {
                let chats = [];
                querySnapshot.docs.map((doc) => {
                    chats.push({ ...doc.data(), id: doc.id })
                })
                
                setchats(chats)
            })
         
        } catch (error) {
            let chats = [];
            setchats(chats);
        }
        // console.log(chats)
    }, [])
    
    
  

    const handleSubmit = async () =>{
        const user1 = auth.currentUser.uid

        const user2 = selectUserId
        
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
        
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
            </View>
            <ScrollView>
            <View>
                {<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {(chats && user1) &&
                            <FlatList
                                inverted={-1}
                                data={chats}
                                keyExtractor={(chats) => chats.id}
                                renderItem={({ item }) => <ChatGetMessages key={item.id} chats={item} user1={user1}/>}

                            />
                        }
                        </TouchableWithoutFeedback>}
                </View>
                </ScrollView>
            
            <View style={{paddingBottom:0,position:'absolute'}}>
                <MessageForm handleSubmit={handleSubmit} text={text} setText={setText}/>
            </View>
        </View>
    )
}

export default Message;