import { StyleSheet, Text, View } from 'react-native';
import React,{useEffect,useState} from 'react';
import ChatUsers from '../screens/chat/ChatUsers';
import { colors } from '../global/Styles';
import CustomChatItems from '../components/CustomChatItems';
import {db,auth} from '../../firebase';
import { collection,where,onSnapshot, query } from 'firebase/firestore';
import User from '../components/User';

export default function ChatScreen() {
    const [users,setUsers] = useState([])

    useEffect(()=>{
        
        const usersRef= collection(db,'users')

        // create query object
        const q = query(usersRef, where("owner_uid","not-in",[auth.currentUser.uid]));

        // execute query
        const unsub = onSnapshot(q,(querySnapshot)=>{
            let users =[];
            querySnapshot.forEach((doc)=>{
                users.push(doc.data())
            });
            setUsers(users);
        });
    
        return ()=> unsub();

    },[]);
    console.log(users);
    return (
        <View style ={{flex:1,marginTop:20}}>
            <View style={{backgroundColor:colors.button,marginVertical:10}}>
                <Text style={styles.headerText}>Chats</Text>
            </View>
            
            <View >
                {users && users.map(user =><User key={user.uid} user={user}/>)}
                
            </View>
            {/* <CustomChatItems/> */}
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