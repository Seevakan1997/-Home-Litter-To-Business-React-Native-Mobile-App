import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View,Keyboard,FlatList,ScrollView,Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {colors} from '../global/Styles';
import MessageForm from "./MessageForm";
import {  addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, updateDoc,doc, where } from 'firebase/firestore';
import { db,auth } from "../../firebase";
import ChatGetMessages from "./ChatGetMessages";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Message = ({navigation})=>{
    const route = useRoute();
    const {selectUserId,selectUserName}= route.params;
    const [text,setText] = useState("")
    const [chats, setchats] = useState()

   const [usedetails, setusedetails] = useState()
    const user1 = auth.currentUser.uid
    const user2=selectUserId;
    // console.log(user2);
    // console.log(user1);
    
    useEffect(() => {

        try {

            // const user1 = auth.currentUser.uid
            // const user2 = selectUserId
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
    

   
    
      useEffect(() => {

    const ref = collection(db, "users")
    const qref=query(ref, where('owner_uid','==',user2))
    onSnapshot(qref, (snapshot) => {
        let users=[];
        snapshot.docs.map((doc)=>{
users.push(doc.data())
    })
        
    //   console.log(users)

      setusedetails(users)

    })
    // console.log(user)

   
           
          
         
      }, [user2])
    
  

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
      
      {usedetails &&     <View style={{alignItems:'center',backgroundColor:colors.button,paddingHorizontal:20,paddingVertical:20, flexDirection:'row',}} >
            {/* <Text style={{alignItems:'center',fontSize:50,color:colors.button}}>{selectUserName}</Text> */}
          

<Image source={{uri:usedetails[0].profile_pic}} style={{height:50, width:50, borderRadius:50,marginTop:10,marginLeft:10}} />
   <Text style={{fontSize:30,color:'white',marginTop:20,marginLeft:30}}>{usedetails[0].username}</Text>
   
     
            </View>}
            
            <ScrollView  >
            <View style={{paddingTop:10}}>
            
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
            
                 <View style={{paddingBottom:0,position:'absolute',top:600}}>
                <MessageForm handleSubmit={handleSubmit} text={text} setText={setText}/>
            </View>
        </View>
       
    )
}

export default Message;