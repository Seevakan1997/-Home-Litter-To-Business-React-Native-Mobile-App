import React from 'react'
import {View, Text,StyleSheet} from 'react-native'
import { auth,db } from '../../firebase'
import { signOut } from '@firebase/auth'
import { doc,updateDoc } from 'firebase/firestore'
import { Button } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'

export default function MyAccountScreen({navigation}){
    const handleSignout =async ()=>{
        await updateDoc(doc(db,'users',auth.currentUser.uid),{
            isOnline:false
        })
        await signOut(auth);
    }
    return(
        <View style ={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <Text>My Account</Text>
            <Button
                        title='LogOut'
                        onPress={()=>{navigation.navigate('SignInWelcomeScreen'),handleSignout}}
                    />
        </View>
    )
}