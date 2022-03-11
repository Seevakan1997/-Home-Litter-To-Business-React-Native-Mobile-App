import React from 'react';
import {View, Text, StyleSheet,Alert} from 'react-native';
import * as Facebook from 'expo-facebook';
import * as firebase from '../../../firebase';

    export default async function logIn({navigation}) {
        
        try {
          await Facebook.initializeAsync({
            appId: '1891005674622948',
          });
          const { type, token, expirationDate, permissions, declinedPermissions } =
            await Facebook.logInWithReadPermissionsAsync({
                
              permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`  );
                navigation.push("RootClientTabs");
              } else {
                // type === 'cancel'
              }
            } catch ({ message }) {
              alert(`Facebook Login Error: ${message}`);
            }
          
        return(
            <View><Text>Facebook</Text></View>
        )
      }
      
    
